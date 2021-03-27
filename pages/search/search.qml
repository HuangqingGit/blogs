<!--
 * @Descripttion: 
 * @Author: 帅气的杜恒欧巴
 * @Date: 2020-11-27 16:27:50
 * @LastEditTime: 2020-12-17 13:02:58
-->
<view class="j-search">
    <view class="icon"></view>
    <input maxlength="15" bindinput="changeSearchVal" bindconfirm="confirmSearch" type="text" confirm-type="search" placeholder="请输入搜索内容..." />
</view>

<view class="j-group">
    <view class="title danger">热门搜索</view>
    <block qq:if="{{ isLoadingTags }}">
        <view class="list loading">
            <view class="item" qq:for="{{ 4 }}" qq:key="index"></view>
        </view>
    </block>
    <block qq:else>
        <view class="list" qq:if="{{ tagsList.length > 0 }}">
            <view class="item" data-val="{{ item.name }}" bindtap="searchRes" qq:for="{{ tagsList }}" qq:key="mid">{{ item.name }}</view>
        </view>
        <view class="empty" qq:else>
            <image src="../../assets/img/empty.png" />
            暂无数据
        </view>
    </block>
</view>

<view class="j-group" style="margin-bottom: 0; padding-bottom: {{ hasSafeArea ? 68 : 0 }}rpx;">
    <view class="title success">历史搜索
        <image qq:if="{{ searchHistory.length > 0 }}" bindtap="clearHistory" class="clear" src="../../assets/img/clear.png" />
    </view>
    <view class="list" qq:if="{{ searchHistory.length > 0 }}">
        <view class="item" data-val="{{ item }}" bindtap="searchRes" qq:for="{{ searchHistory }}" qq:key="index">{{ item }}</view>
    </view>
    <view class="empty" qq:else>
        <image src="../../assets/img/empty.png" />
        暂无数据
    </view>
</view>