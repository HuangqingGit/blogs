<!--
 * @Descripttion: 
 * @Author: 帅气的杜恒欧巴
 * @Date: 2020-12-01 15:24:12
 * @LastEditTime: 2020-12-17 13:08:50
-->

<view class="j-tabbar">
    <view class="item {{ activeTab == 0 ? 'active' : '' }}" data-type="0" bindtap="changeTab">
        <text class="text">时间排序</text>
    </view>
    <view class="item {{ activeTab == 1 ? 'active' : '' }}" data-type="1" bindtap="changeTab">
        <text class="text">阅读排序</text>
    </view>
    <view class="item {{ activeTab == 2 ? 'active' : '' }}" data-type="2" bindtap="changeTab">
        <text class="text">评论排序</text>
    </view>
    <view class="line" style="width: {{ lineWidth }}px; transform: translateX({{ activeLineLeft }}px)"></view>
</view>

<view style="padding-bottom: {{ hasSafeArea ? 68 : 30 }}rpx;">
    <view class="j-list">
        <block qq:if="{{ postTotal === 0 && !isLoadingPost }}">
            <view class="empty">
                <image src="../../assets/img/empty-list.png"></image>暂无数据
            </view>
        </block>

        <block qq:else>
            <view class="item box-shadow" qq:for="{{ postList }}" qq:key="cid" data-cid="{{ item.cid }}" bindtap="linkToPost">
                <view class="imager">
                    <image lazy-load mode="aspectFill" src="{{ item.image }}"></image>
                </view>
                <view class="describe">
                    <view class="title {{ item.text === '' ? 'empty-desc' : '' }}">{{ item.title }}</view>
                    <view class="desc" qq:if="{{ item.text !== '' }}">{{ item.text }}</view>
                    <view class="meta">
                        <view class="term">
                            <view class="icon icon-1"></view>
                            <view class="text">{{ item.publish }}</view>
                        </view>
                        <view class="term">
                            <view class="icon icon-2"></view>
                            <view class="text">{{ item.views }} 阅读</view>
                        </view>
                        <view class="term">
                            <view class="icon icon-3"></view>
                            <view class="text">{{ item.commentsNum }} 评论</view>
                        </view>
                    </view>
                </view>
            </view>
        </block>

        <block qq:if="{{ isLoadingPost }}">
            <view class="item loading" qq:for="{{ 2 }}" qq:key="index">
                <view class="imager"></view>
                <view class="describe">
                    <view class="title"></view>
                    <view class="meta">
                        <view class="term">
                            <view class="text"></view>
                        </view>
                        <view class="term">
                            <view class="text"></view>
                        </view>
                        <view class="term">
                            <view class="text"></view>
                        </view>
                    </view>
                </view>
            </view>
        </block>
    </view>
    <view class="j-end" qq:if="{{ postList.length !== 0 && postList.length === postTotal }}">已经到底啦</view>

</view>


<backhome qq:if="{{ isShare === 'yes' }}"></backhome>