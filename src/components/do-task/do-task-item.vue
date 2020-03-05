<template>
    <li class="sh-do-task-item" @click="handleClick('1')">
        <div class="sh-do-task-item__leftWrap">
            <div class="sh-do-task-item__icon">
                <img
                    class="sh-do-task-item__icon--img"
                    :src="task.icon"
                    alt=""
                />
            </div>
            <div class="sh-do-task-item__detail">
                <p class="sh-do-task-item__detail--title">
                    {{ task.taskName }}
                </p>
                <p
                    class="sh-do-task-item__detail--desc"
                    v-if="task.description"
                >
                    {{ task.description }}
                </p>
            </div>
        </div>
        <div class="sh-do-task-item__rightWrap">
            <div
                class="sh-do-task-item__rightWrap--btn"
                :class="{ disabled: task.isDone }"
                @click="handleClick('2')"
            >
                {{ btnText }}
            </div>
            <span class="sh-do-task-item__rightWrap--count"
                >+{{ task.addTimes }}次</span
            >
        </div>
    </li>
</template>
<script>
// import { Toast } from "vant";
import wx from "weixin-js-sdk";
import { Product, HomePage, Profile, ShareMenu } from "@freshservice/bridge";
import { getBaseUrl } from "@/baseUtils/env";
import { isLogin, signIn, getTockenFrom } from "@/bizUtils/login";
import { Share } from "@/bizUtils";
import { TASK_TYPE } from "@/enumUtils";
import {
    isApp,
    // isIOS,
    // isAndroid,
    isWeMini
    // isWechat,
    // isAplipay,
    // isPad,
    // isMobile,
    // isIOSClient,
    // appVersion,
    // iosVersion,
    // androidVersion,
    // wxToolVersion
} from "@/baseUtils/device";

export default {
    name: "Dotask",
    props: {
        task: {
            type: Object,
            default: () => ({
                taskId: 0, // 任务ID
                taskType: 0, // 任务类型
                taskName: "", // 任务名称
                description: "", // 任务描述
                browsePageUrl: "", // 浏览专题页面地址
                browsePageDuration: 0, // 浏览专题页面停留时间
                browseSsuId: 0, // 浏览的商品ssuid
                shareTitle: "", // 分享的标题
                addTimes: 0, // 任务做完完成的次数
                isDone: false, // 任务是否完成,
                beforeHandle: undefined, //做任务之前的钩子函数
                afterHandle: undefined //做任务之后的钩子函数
            })
        },
        registerType: {
            type: String,
            default: undefined
        }
    },
    data() {
        return {};
    },
    computed: {
        btnText() {
            if (this.task.isDone && this.task.taskType - 0 !== 2) {
                return "已完成";
            }

            switch (+this.task.taskType) {
                case TASK_TYPE.SHARE:
                    return "去分享";
                case TASK_TYPE.INVITE:
                    return "去邀请";
                case TASK_TYPE.BROWSE_PAGE:
                case TASK_TYPE.BROWSE_GOODS:
                    return "去看看";
                case TASK_TYPE.ORDER:
                    return "去下单";
                case TASK_TYPE.CHECK_IN:
                    return "去签到";
                case TASK_TYPE.FOCUS:
                    return "去关注";
                case TASK_TYPE.IMPROVE:
                    return "去完善";
                case TASK_TYPE.GIVE_CARD:
                    return "去赠送";
                default:
                    return "";
            }
        }
    },
    mounted() {},
    methods: {
        handleClick: async function() {
            const task = this.task;
            if (task.isDone) {
                return;
            } else if (!isLogin()) {
                this.$toast({
                    message: "正在跳转到登录页...",
                    onClose() {
                        signIn({
                            RegisterType: this.registerType
                        });
                    }
                });
                return;
            } else if (task.beforeHandle) {
                // 如果存在钩子函数，函数返回值为false就终止继续往下执行
                const befResult = await this.task.beforeHandle();
                if (!befResult) {
                    return;
                }
            }
            switch (+task.taskType) {
                case TASK_TYPE.SHARE: // 分享
                    this.shareOrInviteOptions(task);
                    break;
                case TASK_TYPE.INVITE: // 邀请  没有邀请任务
                    this.shareOrInviteOptions(task);
                    break;
                case TASK_TYPE.BROWSE_PAGE: // 浏览专题
                    this.lookTopic(task);
                    break;
                case TASK_TYPE.BROWSE_GOODS: // 浏览商品详情
                    this.lookProduct(task);
                    break;
                case TASK_TYPE.ORDER: // 下首单
                    this.firstOrder();
                    break;
                case TASK_TYPE.CHECK_IN: // 签到
                    this.checkIn();
                    break;
                case TASK_TYPE.IMPROVE: // 完善个人信息
                    this.improvePersonal(task);
                    break;
                case TASK_TYPE.GIVE_CARD: // 去赠送
                    this.presentedCard(task);
                    break;
                default:
                    return;
            }
        },
        // 分享 1或邀请 2
        shareOrInviteOptions: async function(task) {
            if (task.taskType === 1 && task.afterHandle) {
                const afterResult = await task.afterHandle();
                if (!afterResult) {
                    return;
                }
            }

            const share = new Share({
                title: task.shareTitle,
                desc: task.shareTitle,
                link: task.link,
                imgUrl: task.sharePic,
                shareCode: task.shareCode || 1
            });
            share.execute(getTockenFrom());

            if (isApp) {
                ShareMenu.init().execute();
            }
        },
        // 浏览专题 3
        lookTopic: function(task) {
            // eslint-disable-next-line no-useless-escape
            const urlReg = /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-.,@?^=%&:\/~+#]*[\w\-@?^=%&\/~+#])?$/;
            if (!urlReg.test(task.browsePageUrl)) return;
            const queryStr = `browsePageDuration=${task.browsePageDuration}&taskId=${task.taskId}&taskName=${task.taskName}`;
            const pageUrl =
                task.browsePageUrl.indexOf("?") > -1
                    ? `${task.browsePageUrl}&${queryStr}`
                    : `${task.browsePageUrl}?${queryStr}`;
            window.location.href = pageUrl;
        },
        // 下首单 5
        firstOrder: function() {
            if (isWeMini) {
                wx.miniProgram.switchTab({
                    url: "/pages/home/index"
                });
            } else {
                HomePage.init(getBaseUrl()).execute();
            }
        },
        // 签到
        checkIn: function() {},
        // 浏览商品详情 4
        lookProduct: function(task) {
            // taskCallBackService(task.taskId);
            // 等请求了再跳转，部分机型跳转太快导致发送请求失败
            this.$toast({
                message: "正在跳转...",
                onClose() {
                    Product.init(getBaseUrl()).execute(task.browseSsuId);
                }
            });
        },
        // 完善个人信息 8
        improvePersonal: function() {
            Profile.init(getBaseUrl()).execute();
        }
    }
};
</script>
<style lang="scss" scoped>
$height: 44px;
.sh-do-task-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
    &__leftWrap {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
    }
    &__icon {
        width: 66px;
    }
    &__icon--img {
        width: 100%;
        vertical-align: middle;
        text-align: center;
        overflow: hidden;
        opacity: 1;
        transition: opacity 0.3s ease-in;
    }
    &__detail {
        margin-left: 25px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        &--title {
            width: 12em;
            font-size: 28px;
            color: #242424;
            text-overflow: ellipsis;
            text-align: left;
            white-space: nowrap;
            overflow: hidden;
            /* prettier-ignore */
            // padding-top: 2PX; // 修复部分手机中因overflow：hidden而削掉上面一部分内容
        }
        &--desc {
            width: 14em;
            max-width: 100%;
            font-size: 24px;
            color: #8a8a8a;
            text-overflow: ellipsis;
            text-align: left;
            white-space: nowrap;
            overflow: hidden;
            /* prettier-ignore */
            // padding-top: 2PX;
        }
    }
    &__rightWrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        &--btn {
            box-sizing: border-box;
            width: 109px;
            height: $height;
            display: flex;
            justify-content: center;
            align-items: center;
            // background: rgba(191, 7, 18, 1);
            /* prettier-ignore */
            border: 2px solid rgba(236, 57, 32, 1);
            color: rgba(236, 57, 32, 1);
            border-radius: $height / 2;
            &.disabled {
                // background-color: rgba(191, 7, 18, 0.5);
                border-color: rgba(236, 57, 32, 0.5);
                color: rgba(236, 57, 32, 0.5);
            }
        }
        &--count {
            padding-top: 10px;
            font-size: 26px;
            color: #8a8a8a;
        }
    }
}
.sh-do-task-item:last-child {
    margin-bottom: 0;
}
</style>
