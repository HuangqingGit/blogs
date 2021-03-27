/*
 * @Descripttion:
 * @Author: 帅气的杜恒欧巴
 * @Date: 2020-11-27 16:28:05
 * @LastEditTime: 2020-12-17 12:59:42
 */
import { $request } from '../../request/index';
import { config } from '../../joe.config.js';
const hasSafeArea = getApp().globalData.hasSafeArea;
Page({
    data: {
        searchVal: '',
        /* 标签搜索 */
        tagsList: [],
        /* 搜索历史 */
        searchHistory: [],
        /* tags加载状态 */
        isLoadingTags: true,
        hasSafeArea
    },

    onLoad() {
        this.getTags();
        /* 检测本地历史搜索 */
        const searchHistory = qq.getStorageSync('searchHistory');
        if (searchHistory) this.setData({ searchHistory });
    },

    /* 获取标签 */
    async getTags() {
        this.setData({ isLoadingTags: true });
        const { status, data } = await $request({ url: '/api/getTags' });
        if (status !== 200) return qq.showToast({ title: '接口异常！', icon: 'none' });
        this.setData({ tagsList: data || [], isLoadingTags: false });
    },

    changeSearchVal(e) {
        this.setData({ searchVal: e.detail.value });
    },

    /* 确认搜索 */
    confirmSearch(e) {
        if (e.detail.value === '') return qq.showToast({ title: '请输入搜索内容！', icon: 'none' });
        /* 将历史搜索存入到本地 */
        let searchHistory = this.data.searchHistory;
        if (!searchHistory.includes(e.detail.value)) {
            if (searchHistory.length >= 15) searchHistory.pop();
            searchHistory.unshift(e.detail.value);
            this.setData({ searchHistory });
            qq.setStorage({
                key: 'searchHistory',
                data: searchHistory
            });
        }
        this.linkToSearchRes(e.detail.value);
    },

    /* 清空搜索历史 */
    clearHistory() {
        qq.showModal({
            title: '提示',
            content: '确定要清空搜索历史吗？',
            success: res => {
                if (res.confirm) {
                    qq.clearStorage();
                    this.setData({ searchHistory: [] });
                }
            }
        });
    },

    /* 点击跳转 */
    searchRes(e) {
        this.linkToSearchRes(e.currentTarget.dataset.val);
    },

    linkToSearchRes(val) {
        qq.navigateTo({
            url: '/pages/search-res/search-res?val=' + val
        });
    },

    /* 分享 */
    onShareAppMessage() {
        qq.showShareMenu({ showShareItems: ['qq', 'qzone', 'wechatFriends', 'wechatMoment'] });
        return {
            title: '搜索 - ' + config.shareTitle,
            path: '/pages/search/search'
        };
    }
});
