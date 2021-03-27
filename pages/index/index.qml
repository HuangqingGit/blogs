<!--
 * @Descripttion: 
 * @Author: 帅气的杜恒欧巴
 * @Date: 2020-11-25 09:42:14
 * @LastEditTime: 2020-12-14 09:10:37
-->

<!-- 轮播图 -->
<view class="j-swiper">
    <view class="loading" qq:if="{{ isLoadingSwiper }}"></view>
    <swiper autoplay circular duration="300" qq:else>
        <swiper-item qq:for="{{ swiperList }}" qq:key="cid">
            <image lazy-load mode="aspectFill" src="{{ item.image }}" />
        </swiper-item>
    </swiper>
    <view class="search box-shadow" bindtap="handleSearchTap">
        <view class="icon"></view>探索一下新大陆！
    </view>
</view>

<!-- 热门文章 -->
<view class="j-hot">
    <view class="title">
        <view class="icon"></view>
        <view class="text">热门文章</view>
    </view>
    <scroll-view scroll-x>
        <block qq:if="{{ isLoadingHot }}">
            <view class="scroll loading">
                <view class="item" qq:for="{{ 3 }}" qq:key="index">
                    <view class="image"></view>
                    <view class="text"></view>
                </view>
            </view>
        </block>
        <block qq:else>
            <view class="scroll">
                <view class="item box-shadow" qq:for="{{ hotList }}" qq:key="cid" data-cid="{{ item.cid }}" bindtap="linkToPost">
                    <image lazy-load mode="aspectFill" src="{{ item.image }}"></image>
                    <view class="text">{{ item.title }}</view>
                    <view class="num">{{ item.views }}</view>
                </view>
            </view>
        </block>
    </scroll-view>
</view>

<view class="j-notice box-shadow" qq:if="{{ notice }}">
    <view class="icon"></view>
    <view class="text">{{ notice.content }}</view>
</view>

<view class="j-list">
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

<view class="j-end">我是有底线的</view>