/*
 * @Descripttion:
 * @Author: 帅气的杜恒欧巴
 * @Date: 2020-12-01 15:24:12
 * @LastEditTime: 2020-12-17 13:03:56
 */
import { $request } from '../../request/index';
const hasSafeArea = getApp().globalData.hasSafeArea;
Page({
    data: {
        /* 搜索列表 */
        postList: [],
        /* 列表总数 */
        postTotal: null,
        /* 是否正在搜索 */
        isLoadingPost: true,

        /* 分页 */
        page: 1,
        pageSize: 10,

        /* 搜索词 */
        keyword: '',

        /* 激活的项 */
        activeTab: 0,
        activeLineLeft: '',
        lineWidth: '',

        /* 是否是分享进来的页面 */
        isShare: 'no',
        hasSafeArea
    },

    onLoad(options) {
        this.setData({ keyword: options.val || '', isShare: options.isShare || 'no' });
    },

    onReady() {
        this.setActiveLine();
    },

    /* 初始化tab栏 */
    setActiveLine() {
        qq.createSelectorQuery()
            .select('.active .text')
            .boundingClientRect(res => {
                this.setData({ lineWidth: parseInt(res.width), activeLineLeft: parseInt(res.left) });
                this.getSearchList();
            })
            .exec();
    },

    /* 获取搜索列表 */
    async getSearchList() {
        this.setData({ isLoadingPost: true });
        const { status, data } = await $request({
            url: '/api/getSearchList',
            data: {
                keyword: this.data.keyword,
                page: this.data.page,
                pageSize: this.data.pageSize,
                type: this.data.activeTab
            }
        });
        qq.stopPullDownRefresh();
        if (status !== 200) return qq.showToast({ title: '接口异常！', icon: 'none' });
        this.setData({
            postList: this.data.postList.concat(data.list || []),
            postTotal: data.total,
            isLoadingPost: false
        });
    },

    /* 点击修改tab */
    changeTab(e) {
        if (e.currentTarget.dataset.type == this.data.activeTab) return;
        if (this.data.isLoadingPost) return;
        qq.vibrateShort();
        this.setData({
            postList: [],
            postTotal: null,
            page: 1,
            activeTab: e.currentTarget.dataset.type
        });
        this.setActiveLine();
    },

    /* 上拉加载 */
    onReachBottom() {
        if (this.data.postList.length >= this.data.postTotal) return;
        this.setData({ page: this.data.page + 1 });
        this.getSearchList();
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
            postTotal: null,
            page: 1
        });
        this.getSearchList();
    },

    /* 分享 */
    onShareAppMessage() {
        qq.showShareMenu({ showShareItems: ['qq', 'qzone', 'wechatFriends', 'wechatMoment'] });
        return {
            title: this.data.keyword + '搜索结果',
            path: '/pages/search-res/search-res?isShare=yes&val=' + this.data.keyword
        };
    }
});
