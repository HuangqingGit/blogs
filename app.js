/*
 * @Descripttion:
 * @Author: 帅气的杜恒欧巴
 * @Date: 2020-11-25 09:42:14
 * @LastEditTime: 2020-12-17 14:52:43
 */
App({
    onLaunch() {
        qq.getSystemInfo({
            success: res => {
                if (/iPhone/.test(res.model)) {
                    if (res.screenHeight >= 812 && res.screenWidth >= 375) {
                        this.globalData.hasSafeArea = true;
                    } else {
                        this.globalData.hasSafeArea = false;
                    }
                }
            }
        });
    },

    globalData: {
        hasSafeArea: false
    }
});
