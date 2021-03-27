/*
 * @Descripttion:
 * @Author: 帅气的杜恒欧巴
 * @Date: 2020-12-01 16:36:35
 * @LastEditTime: 2020-12-18 10:52:06
 */
import { $request } from '../../request/index';
const hasSafeArea = getApp().globalData.hasSafeArea;
Page({
    data: {
        /* 文章详情 */
        postDetail: {},
        /* markdown */
        article: '',
        /* 文章cid */
        cid: '',
        /* 点赞数量 */
        agree: 0,
        /* 是否点赞 */
        isAgree: false,
        /* 是否正在请求 */
        isLoadingDetail: true,
        /* 是否是分享进来的页面 */
        isShare: 'no',
        /* 点赞节流函数 */
        isAgreeloading: false,
        /* 评论 */
        comment: {},
        /* 是否显示评论 */
        isShowComment: 'off',
        /* 是否显示评论框 */
        isShowReplyForm: false,
        /* 是否有安全距离 */
        hasSafeArea,
        /* 评论信息 */
        author: '',
        mail: '',
        text: '',
        parent: 0,
        /* 输入框提示 */
        placeholder: '请输入内容',
        /* 是否正在加载评论 */
        isLoadingComment: true
    },

    onLoad(options) {
        this.setData({ cid: options.cid, isShare: options.isShare || 'no' });
        /* 获取文章详情 */
        this.getPostDetail();
        /* 判断是否已经点赞过该篇文章 */
        let agreeList = qq.getStorageSync('agreeList') || [];
        this.setData({ isAgree: agreeList.includes(options.cid) });
        this.handlePostView();
        this.isShowComment();

        this.setData({
            author: qq.getStorageSync('author') || '',
            mail: qq.getStorageSync('mail') || ''
        });
    },

    /* 是否需要显示评论 */
    async isShowComment() {
        const { status, data } = await $request({ url: '/api/isShowComment' });
        if (status !== 200) return qq.showToast({ title: '接口异常！', icon: 'none' });
        this.setData({ isShowComment: data });
        this.getCommentByCid();
    },

    /* 获取评论 */
    async getCommentByCid() {
        this.setData({ isLoadingComment: true });
        const { status, data } = await $request({ url: '/api/getCommentByCid', data: { cid: this.data.cid } });
        if (status !== 200) return qq.showToast({ title: '接口异常！', icon: 'none' });
        data.list.forEach(item => {
            if (/\{!\{.*\}!\}/.test(item.text)) {
                item.isCanvas = true;
                item.text = item.text.replace(/{!{/, '').replace(/}!}/, '');
            } else {
                item.isCanvas = false;
            }
            if (item.replys) {
                item.replys.forEach(_item => {
                    if (/\{!\{.*\}!\}/.test(_item.text)) {
                        _item.isCanvas = true;
                        _item.text = _item.text.replace(/{!{/, '').replace(/}!}/, '');
                    } else {
                        _item.isCanvas = false;
                    }
                });
            }
        });
        this.setData({ comment: data, isLoadingComment: false });
    },

    /* 增加浏览量 */
    async handlePostView() {
        let viewList = qq.getStorageSync('viewList') || [];
        if (viewList.includes(this.data.cid)) return;
        viewList.push(this.data.cid);
        await $request({ url: '/api/handlePostView', data: { cid: this.data.cid } });
        qq.setStorage({ key: 'viewList', data: viewList });
    },

    /* 点赞 */
    async handleAgree() {
        if (this.data.isAgreeloading) return;
        qq.vibrateShort();
        this.setData({ isAgreeloading: true });
        const { status, data } = await $request({
            url: '/api/handlePostAgree',
            data: { cid: this.data.cid, type: this.data.isAgree ? 'disagree' : 'agree' }
        });
        if (status !== 200) return qq.showToast({ title: '接口异常！', icon: 'none' });
        qq.showToast({
            title: this.data.isAgree ? '已取消点赞！' : '点赞成功！',
            icon: this.data.isAgree ? 'none' : 'success'
        });
        let agreeList = qq.getStorageSync('agreeList') || [];
        if (this.data.isAgree) {
            let index = agreeList.findIndex(_ => _ === this.data.cid);
            agreeList.splice(index, 1);
        } else {
            agreeList.push(this.data.cid);
        }
        qq.setStorage({ key: 'agreeList', data: agreeList });
        this.setData({ agree: data.agree, isAgree: !this.data.isAgree, isAgreeloading: false });
    },

    /* 获取文章详情 */
    async getPostDetail() {
        this.setData({ isLoadingDetail: true });
        const { status, data } = await $request({
            url: '/api/getPostDetail',
            data: { cid: this.data.cid }
        });
        qq.stopPullDownRefresh();
        if (status !== 200 || data === null) return qq.showToast({ title: '接口异常！', icon: 'none' });
        this.setData({ postDetail: data, article: data.text, isLoadingDetail: false, agree: data.agree });
    },

    /* 下拉刷新 */
    onPullDownRefresh() {
        qq.vibrateShort();
        this.getPostDetail();
        this.getCommentByCid();
    },

    /* 预览图片 */
    previewImg() {
        qq.vibrateShort();
        qq.showToast({ title: '暂不支持预览！', icon: 'none' });
    },

    /* 分享 */
    onShareAppMessage() {
        qq.showShareMenu({ showShareItems: ['qq', 'qzone', 'wechatFriends', 'wechatMoment'] });
        return {
            title: this.data.postDetail.title,
            path: '/pages/post/post?isShare=yes&cid=' + this.data.cid
        };
    },

    /* 无用函数 */
    preventTouchMove() {},

    /* 点击显示评论 */
    openReplyForm() {
        qq.vibrateShort();
        this.setData({
            isShowReplyForm: true,
            text: '',
            parent: 0,
            placeholder: '请输入内容'
        });
    },

    /* 关闭评论 */
    closeReplyForm() {
        this.setData({ isShowReplyForm: false });
    },

    /* 双向绑定 */
    handleInputAuthor(e) {
        this.setData({ author: e.detail.value });
        return e.detail.value;
    },

    /* 双向绑定 */
    handleInputMail(e) {
        this.setData({ mail: e.detail.value });
        return e.detail.value;
    },

    /* 双向绑定 */
    handleInputText(e) {
        this.setData({ text: e.detail.value });
        return e.detail.value;
    },

    /* 点击显示评论 */
    handleParent(e) {
        qq.vibrateShort();
        this.setData({
            parent: e.currentTarget.dataset.parent,
            isShowReplyForm: true,
            placeholder: '回复@' + e.currentTarget.dataset.placeholder
        });
    },

    /* 发表评论 */
    async confirmComment(e) {
        if (this.data.author.trim() === '') return qq.showToast({ title: '请输入昵称！', icon: 'none' });
        if (this.data.mail.trim() === '') return qq.showToast({ title: '请输入邮箱！', icon: 'none' });
        if (!/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(this.data.mail)) return qq.showToast({ title: '请输入正确的邮箱！', icon: 'none' });
        if (this.data.text.trim() === '') return qq.showToast({ title: '请输入评论内容！', icon: 'none' });

        qq.setStorage({ key: 'author', data: this.data.author });
        qq.setStorage({ key: 'mail', data: this.data.mail });

        qq.showLoading({ title: '发表中...' });
        const { status, data } = await $request({
            url: '/api/publishComment',
            data: {
                cid: this.data.cid,
                author: this.data.author,
                mail: this.data.mail,
                text: this.data.text,
                parent: this.data.parent
            }
        });
        qq.hideLoading();
        if (status !== 200) return qq.showToast({ title: '接口异常！', icon: 'none' });
        if (data == 1) {
            qq.showToast({ title: '发表成功！', icon: 'success' });
            this.getCommentByCid();
            this.setData({
                isShowReplyForm: false,
                parent: 0,
                placeholder: '请输入评论内容',
                text: null
            });
            this.getCommentByCid();
        } else {
            qq.showToast({ title: '发表失败！', icon: 'none' });
        }
    }
});
