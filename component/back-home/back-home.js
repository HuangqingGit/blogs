/*
 * @Descripttion:
 * @Author: 帅气的杜恒欧巴
 * @Date: 2020-12-16 10:16:43
 * @LastEditTime: 2020-12-16 10:20:21
 */
Component({
    methods: {
        handleBackHome() {
            qq.reLaunch({
                url: '/pages/index/index'
            });
        }
    }
});
