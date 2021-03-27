import { $request } from '../../request/index';
import { config } from '../../joe.config.js';
Page({
    data: {
        /* 轮播图 */
        swiperList: [],
        /* 轮播图加载状态 */
        isLoadingSwiper: true,

        /* 公告 */
        notice: null,

        /* 热门文章 */
        hotList: [],
        /* 热门文章加载状态 */
        isLoadingHot: true,

        /* 全部文章 */
        postList: [],
        /* 全部文章数 */
        postTotal: 0,
        /* 全部文章分页 */
        postPage: 1,
        /* 全部文章分页尺寸 */
        postPageSize: 10,
        /* 文章列表加载状态 */
        isLoadingPost: true
    },

    onLoad() {
        /* 1. 获取轮播图列表 */
        this.getSwiperList();

        /* 2. 获取公告 */
        this.getNotice();

        /* 3. 获取热门文章 */
        this.getHotList();

        /* 4. 获取全部文章 */
        this.getPostList();
    },

    async getSwiperList() {
        this.setData({ isLoadingSwiper: true });
        const { status, data } = await $request({ url: '/api/getSwiperList' });
        qq.stopPullDownRefresh();
        if (status !== 200) return qq.showToast({ title: '接口异常！', icon: 'none' });
        this.setData({ swiperList: data, isLoadingSwiper: false });
    },

    async getNotice() {
        const { status, data } = await $request({ url: '/api/getNotcie' });
        qq.stopPullDownRefresh();
        if (status !== 200) return qq.showToast({ title: '接口异常！', icon: 'none' });
        this.setData({ notice: data });
    },

    async getHotList() {
        this.setData({ isLoadingHot: true });
        const { status, data } = await $request({ url: '/api/getHotList' });
        qq.stopPullDownRefresh();
        if (status !== 200) return qq.showToast({ title: '接口异常！', icon: 'none' });
        this.setData({ hotList: data, isLoadingHot: false });
    },

    async getPostList() {
        this.setData({ isLoadingPost: true });
        const { status, data } = await $request({
            url: '/api/getPostList',
            data: {
                page: this.data.postPage,
                pageSize: this.data.postPageSize
            }
        });
        qq.stopPullDownRefresh();
        if (status !== 200) return qq.showToast({ title: '接口异常！', icon: 'none' });
        this.setData({ postList: this.data.postList.concat(data.list), postTotal: data.total, isLoadingPost: false });
    },

    /* 上拉加载 */
    onReachBottom() {
        if (this.data.postList.length >= this.data.postTotal) return;
        this.setData({ postPage: this.data.postPage + 1 });
        this.getPostList();
    },

    /* 下拉加载 */
    onPullDownRefresh() {
        qq.vibrateShort();
        this.setData({
            swiperList: [],
            notice: null,
            hotList: [],
            postList: [],
            postPage: 1
        });
        this.getSwiperList();
        this.getNotice();
        this.getHotList();
        this.getPostList();
    },

    /* 点击跳转到搜索页 */
    handleSearchTap() {
        qq.switchTab({
            url: '/pages/search/search'
        });
    },

    /* 点击跳转到详情 */
    linkToPost(e) {
        qq.navigateTo({
            url: '/pages/post/post?cid=' + e.currentTarget.dataset.cid
        });
    },

    /* 分享 */
    onShareAppMessage() {
        qq.showShareMenu({ showShareItems: ['qq', 'qzone', 'wechatFriends', 'wechatMoment'] });
        return {
            title: '首页 - ' + config.shareTitle,
            path: '/pages/index/index'
        };
    }
});
