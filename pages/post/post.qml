<!--
 * @Descripttion: 
 * @Author: 帅气的杜恒欧巴
 * @Date: 2020-12-01 16:36:35
 * @LastEditTime: 2020-12-18 10:41:51
-->


<!-- 头部 -->

<block qq:if="{{ isLoadingDetail }}">
    <view class="j-header loading">
        <view class="title"></view>
        <view class="meta">
            <view class="item" qq:for="{{ 3 }}" qq:key="index"></view>
        </view>
    </view>
    <view class="j-markdown loading">
        <image src="../../assets/img/loading.png"></image>loading...
    </view>
</block>

<block qq:else>
    <view class="j-header">
        <view class="title">{{ postDetail.title }}</view>
        <view class="meta">
            <view class="item">
                <image class="icon" src="../../assets/img/time.png" />
                <view class="text">{{ postDetail.publish }}</view>
            </view>
            <view class="item">
                <image class="icon" src="../../assets/img/comment.png"></image>
                <view class="text">{{ postDetail.commentsNum }}</view>
            </view>
            <view class="item">
                <image class="icon" src="../../assets/img/view.png"></image>
                <view class="text">{{ postDetail.views }}</view>
            </view>
            <view class="item" qq:if="{{ postDetail.category.length > 0 }}">
                <image class="icon" src="../../assets/img/category.png"></image>
                <view class="text">{{ postDetail.category[0].name }}</view>
            </view>
        </view>
    </view>

    <view class="j-markdown">
        <wemark md="{{ article }}" link highlight type="wemark"></wemark>
    </view>

    <view class="j-action" style="padding-bottom: {{ isShowComment === 'on' ? comment.list.length > 0 ? '30rpx' : hasSafeArea ? '178rpx' : '130rpx' : hasSafeArea ? '68rpx' : '30rpx' }}">
        <view class="button" bindtap="handleAgree">
            <image qq:if="{{ isAgree }}" src="../../assets/img/like-active.png"></image>
            <image qq:else src="../../assets/img/like.png"></image>
            赞 · {{ agree }}
        </view>
    </view>
</block>

<block qq:if="{{ isShowComment === 'on' }}">

    <view class="j-comment" qq:if="{{ comment.list.length > 0 }}" style="padding-bottom: {{ hasSafeArea ? '178rpx' : '130rpx' }};">
        <view class="comments loading" qq:if="{{ isLoadingComment }}">
            <view class="item" qq:for="{{ 3 }}" qq:key="index">
                <view class="avatar"></view>
                <view class="content">
                    <view class="name"></view>
                    <view class="substance">
                        <view class="text"></view>
                    </view>
                    <view class="meta">
                        <view class="time"></view>
                    </view>
                </view>
            </view>
        </view>
        <view class="comments" qq:else>
            <view class="item" qq:for="{{ comment.list }}" qq:key="index">
                <image class="avatar" src="{{ item.mail }}"></image>
                <view class="content">
                    <view class="name">{{ item.author }}</view>
                    <view class="substance">
                        <rich-text qq:if="{{ !item.isCanvas }}" class="text" nodes="{{ item.text }}"></rich-text>
                        <view class="canvas" qq:else data-src="{{ item.text }}" bindtap="previewImg">
                            <image src="../../assets/img/pic.png"></image>图片回复
                        </view>
                    </view>
                    <view class="children" qq:if="{{ item.replys }}">

                        <view class="term" qq:for="{{ item.replys }}" qq:key="{{ _index }}" qq:for-index="_index" qq:for-item="_item">
                            <!-- 最顶级评论 -->
                            <block qq:if="{{ _item.parentItem.coid === item.coid }}">
                                <view class="term-name" data-parent="{{ _item.coid }}" data-placeholder="{{ _item.author }}" bindtap="handleParent">{{ _item.author }}</view>：
                                <rich-text qq:if="{{ !_item.isCanvas }}" class="term-text" nodes="{{ _item.text }}"></rich-text>
                                <view class="term-canvas" qq:else data-src="{{ item.text }}" bindtap="previewImg">
                                    <image src="../../assets/img/pic.png"></image>图片回复
                                </view>
                            </block>

                            <!-- 否则回复别人 -->
                            <block qq:else>
                                <view class="term-name" data-parent="{{ _item.coid }}" data-placeholder="{{ _item.author }}" bindtap="handleParent">{{ _item.author }}</view>
                                <view class="term-reply">回复</view>
                                <view class="term-name" data-parent="{{ _item.parentItem.coid }}" data-placeholder="{{ _item.parentItem.author }}" bindtap="handleParent">{{ _item.parentItem.author }}</view>：
                                <rich-text qq:if="{{ !_item.isCanvas }}" class="term-text" nodes="{{ _item.text }}"></rich-text>
                                <view class="term-canvas" qq:else data-src="{{ item.text }}" bindtap="previewImg">
                                    <image src="../../assets/img/pic.png"></image>图片回复
                                </view>
                            </block>
                        </view>

                    </view>
                    <view class="meta">
                        <view class="time">{{ item.created }}</view>
                        <image data-parent="{{ item.coid }}" data-placeholder="{{ item.author }}" bindtap="handleParent" src="../../assets/img/reply.png"></image>
                    </view>
                </view>
            </view>
        </view>
    </view>

    <view class="j-reply" style="padding-bottom: {{  hasSafeArea ? '68rpx' : '20rpx' }}">
        <view class="input" bindtap="openReplyForm">给 TA 评论</view>
    </view>

    <view class="j-form {{ isShowReplyForm ? 'active' : '' }}" catchtouchmove="preventTouchMove">
        <block qq:if="{{ isShowReplyForm }}" catchtouchmove="preventTouchMove">
            <view class="head" catchtouchmove="preventTouchMove">
                <input catchtouchmove="preventTouchMove" value="{{ author }}" bindinput="handleInputAuthor" adjust-position="{{ false }}" type="text" placeholder="请输入昵称" />
                <input catchtouchmove="preventTouchMove" value="{{ mail }}" bindinput="handleInputMail" adjust-position="{{ false }}" type="text" placeholder="请输入邮箱" />
            </view>
            <textarea catchtouchmove="preventTouchMove" fixed value="{{ text }}" bindinput="handleInputText" disable-default-padding adjust-position="{{ false }}" show-confirm-bar="{{ false }}" placeholder="{{ placeholder }}"></textarea>
            <view class="footer">
                <view class="button" bindtap="confirmComment">发表</view>
            </view>
        </block>
    </view>

    <view bindtap="closeReplyForm" catchtouchmove="preventTouchMove" class="j-form-mask {{ isShowReplyForm ? 'active' : '' }}"></view>


</block>

<backhome qq:if="{{ isShare === 'yes' }}"></backhome>