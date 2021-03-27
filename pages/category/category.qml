<!--
 * @Descripttion: 
 * @Author: 帅气的杜恒欧巴
 * @Date: 2020-12-12 16:11:54
 * @LastEditTime: 2020-12-14 18:16:25
-->

<!-- Tab栏 -->
<scroll-view scroll-x class="j-scroll" scroll-with-animation scroll-left="{{ scrollLeft }}">
	<view data-mid="{{ item.mid }}" bindtap="changeTab" class="item {{ item.mid == mid ? 'active' : '' }}" qq:for="{{ categoryList }}" qq:key="index">{{ item.name }}</view>
	<view class="line" style="width: {{ tabLineWidth }}px; left: {{ tabLineLeft }}px"></view>
</scroll-view>

<!-- 列表 -->
<view class="j-list">

    <block qq:if="{{ pageTotal === 0 && !isLoadingPost }}">
        <view class="empty">
            <image src="../../assets/img/empty-list.png"></image>暂无数据
        </view>
    </block>

	<view data-cid="{{ item.cid }}" bindtap="linkToPost" class="item" qq:for="{{ postList }}" qq:key="{{ item.cid }}">
		<view class="info">
			<view class="title">{{ item.title }}</view>
			<view class="meta">
				<view>{{ item.created }}</view>
				<view>{{ item.views }} 浏览</view>
				<view>{{ item.commentsNum }} 评论</view>
			</view>
		</view>
		<image lazy-load mode="aspectFill" src="{{ item.image }}"></image>
	</view>

	<view class="item loading" qq:for="{{ 3 }}" qq:key="index" qq:if="{{ isLoadingPost }}">
        <view class="info">
			<view class="title"></view>
			<view class="meta">
				<view></view>
				<view></view>
				<view></view>
			</view>
        </view>
        <view class="image"></view>
    </view>
</view>
