/*
 * @Descripttion:
 * @Author: 帅气的杜恒欧巴
 * @Date: 2020-11-25 12:57:32
 * @LastEditTime: 2020-12-14 14:17:45
 */
import { config } from '../joe.config.js';
export function $request(params) {
    return new Promise((resolve, reject) => {
        qq.request({
            url: config.domain + params.url + '?token=' + config.token,
            method: params.method,
            data: params.data,
            success(res) {
                resolve(res.data);
            },
            fail: res => {
                qq.showToast({ title: '接口异常！', icon: 'none' });
                reject(res);
            }
        });
    });
}
