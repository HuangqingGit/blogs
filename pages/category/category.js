/*
 * @Descripttion:
 * @Author: 帅气的杜恒欧巴
 * @Date: 2020-12-12 16:12:00
 * @LastEditTime: 2020-12-16 13:51:53
 */
import { $request } from '../../request/index';

Page({
    data: {
        /* 分类列表 */
        categoryList: [],
        /* 当前mid */
        mid: '',

        /* tab激活的线的线宽 */
        tabLineWidth: 0,
        /* tab激活的线的偏移量 */
        tabLineLeft: 0,

        /* 滚动的宽度 */
        scrollViewWidth: '',
        scrollLeft: 0,

        /* 分类文章列表 */
        postList: [],

        /* 分页 */
        page: 1,
        pageSize: 10,
        pageTotal: null,

        /* 是否正在请求列表 */
        isLoadingPost: true
    },

    onReady() {
        this.initTab();
    },

    /* 初始化tab栏 */
    async initTab() {
        const { status, data } = await $request({ url: '/api/getCategories' });
        if (status !== 200) return qq.showToast({ title: '接口异常！', icon: 'none' });
        if (Array.isArray(data) && data.length > 0) {
            this.setData({ categoryList: data, mid: data[0].mid });

            /* 数据加载完后先获取滚动的宽度 */
            qq.createSelectorQuery()
                .select('.j-scroll')
                .boundingClientRect(rect => this.setData({ scrollViewWidth: parseInt(rect.width) }))
                .exec();

            /* 接着获取激活的active的left值 */
            qq.createSelectorQuery()
                .select('.active')
                .boundingClientRect(res => res && this.setData({ tabLineWidth: parseInt(res.width), tabLineLeft: parseInt(res.left) }))
                .exec();
            this.getPostListByMid();
        }
    },

    /* 切换tab栏 */
    changeTab(e) {
        if (e.currentTarget.dataset.mid === this.data.mid) return;
        if (this.data.isLoadingPost) return;
        this.setData(
            {
                mid: e.currentTarget.dataset.mid,
                postList: [],
                page: 1,
                pageTotal: null,
                tabLineLeft: parseInt(e.target.offsetLeft),
                scrollLeft: parseInt(e.target.offsetLeft - this.data.scrollViewWidth / 2)
            },
            () => {
                qq.createSelectorQuery()
                    .select('.active')
                    .boundingClientRect(res => res && this.setData({ tabLineWidth: parseInt(res.width) }))
                    .exec();
                qq.vibrateShort();
                this.getPostListByMid();
            }
        );
    },

    /* 获取列表 */
    async getPostListByMid() {
        this.setData({ isLoadingPost: true });
        const { status, data } = await $request({ url: '/api/getPostListByMid', data: { mid: this.data.mid, page: this.data.page, pageSize: this.data.pageSize } });
        qq.stopPullDownRefresh();
        if (status !== 200) return qq.showToast({ title: '接口异常！', icon: 'none' });
        this.setData({ postList: this.data.postList.concat(data.list || []), pageTotal: data.total, isLoadingPost: false });
    },

    /* 上拉加载 */
    onReachBottom() {
        if (this.data.postList.length >= this.data.pageTotal) return;
        this.setData({ page: this.data.page + 1 });
        this.getPostListByMid();
    },

    /* 点击跳转到详情 */
    linkToPost(e) {
        qq.navigateTo({
            url: '/pages/post/post?cid=' + e.currentTarget.dataset.cid
        });
    },

    /* 下拉加载 */
    onPullDownRefresh() {
        qq.vibrateShort();
        this.setData({
            postList: [],
            page: 1,
            pageTotal: null
        });
        this.getPostListByMid();
    },

    /* 分享 */
    onShareAppMessage() {
        qq.showShareMenu({ showShareItems: ['qq', 'qzone', 'wechatFriends', 'wechatMoment'] });
        return {
            title: '分类 - ' + config.shareTitle,
            path: '/pages/category/category'
        };
    }
});
