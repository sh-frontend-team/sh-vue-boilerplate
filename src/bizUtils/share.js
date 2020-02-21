import wx from "weixin-js-sdk";
import { SetShareOptions } from "@freshservice/bridge";
import { getWxConfig } from "@/services/api";
import { isApp, isWeMini, isWechat } from "@/baseUtils/device";
import { getTockenFrom } from "@/bizUtils/login";

SetShareOptions.prototype.ios = function(shareData) {
    window.webkit &&
        window.webkit.messageHandlers &&
        window.webkit.messageHandlers.setShareOptions &&
        window.webkit.messageHandlers.setShareOptions.postMessage({
            share_title: shareData.title,
            wx_des: shareData.desc,
            share_url: shareData.link,
            share_img: shareData.imgUrl,
            is_share: shareData.shareCode
        });
};
export default class Share {
    constructor(data, cb) {
        this.shareData = data;
        this.cb = cb;
    }
    execute() {
        if (isApp) {
            const data = {
                title: this.shareData.title,
                desc: this.shareData.desc,
                link: this.shareData.link,
                imgUrl: this.shareData.imgUrl,
                shareCode: this.shareData.shareCode
            };
            SetShareOptions.init({ from: getTockenFrom() })
                .execute(data)
                .success(() => {
                    this.cb &&
                        this.cb(1, {
                            type: "微信好友/朋友圈",
                            message: "app share success"
                        });
                });
            return Promise.resolve();
        } else if (isWechat || isWeMini) {
            if (isWeMini) {
                this.setMiniProgramShare();
            } else if (isWechat) {
                history.pushState(null, null, this.shareData.link);
            }
            return this.onWxConfig();
        } else {
            return Promise.resolve();
        }
    }

    async onWxConfig() {
        const url = window.location.href.split("#")[0];
        const data = await getWxConfig(url);
        if (data.Error === 0) {
            const wxConfigs = data.Data;
            wx.config({
                debug: false,
                appId: wxConfigs.AppId,
                timestamp: wxConfigs.Timestamp,
                nonceStr: wxConfigs.Noncestr,
                signature: wxConfigs.Signature,
                jsApiList: [
                    "onMenuShareTimeline",
                    "onMenuShareAppMessage",
                    "showOptionMenu",
                    "hideMenuItems",
                    "hideOptionMenu"
                ]
            });
        }
        this.shareData.isForbidden
            ? this.onWxForbidden()
            : this.onWxShareInit();
    }

    onWxShareInit() {
        const _self = this;
        wx.ready(() => {
            wx.showOptionMenu();
            wx.hideMenuItems({
                menuList: [
                    "menuItem:share:qq",
                    "menuItem:share:weiboApp",
                    "menuItem:share:facebook",
                    "menuItem:share:QZone",
                    "menuItem:share:email",
                    "menuItem:openWithSafari",
                    "menuItem:openWithQQBrowser",
                    "menuItem:readMode",
                    "menuItem:originPage",
                    "menuItem:copyUrl",
                    "menuItem:delete",
                    "menuItem:editTag",
                    "menuItem:favorite",
                    "menuItem:share:brand",
                    "menuItem:profile",
                    "menuItem:addContact"
                ]
            });
            wx.onMenuShareAppMessage({
                title: _self.shareData.title,
                link: _self.shareData.link,
                desc: _self.shareData.desc,
                imgUrl: _self.shareData.imgUrl,
                success: function() {
                    _self.cb(1, {
                        type: "微信好友",
                        message: "wx share success"
                    });
                    _self.__vm__.$tracker.track("openCabinetShare", {
                        shareMethod: "微信"
                    });
                },
                cancel: function() {
                    _self.cb(0, {
                        type: "微信好友",
                        message: "wx share cancel"
                    });
                }
            });
            wx.onMenuShareTimeline({
                title: _self.shareData.title,
                link: _self.shareData.link,
                desc: _self.shareData.desc,
                imgUrl: _self.shareData.imgUrl,
                success: function() {
                    _self.cb(1, {
                        type: "朋友圈",
                        message: "wx share success"
                    });
                },
                cancel: function() {
                    _self.cb(0, { type: "朋友圈", message: "wx share cancel" });
                }
            });
        });
    }

    onWxForbidden() {
        // const _self = this
        wx.ready(() => {
            wx.hideOptionMenu();
        });
    }
    miniProgramShareInfo(share) {
        wx.miniProgram.getEnv(res => {
            if (res.miniprogram) {
                wx.miniProgram.postMessage({
                    data: { share }
                });
            }
        });
    }
    setMiniProgramShare() {
        this.miniProgramShareInfo({
            title: this.shareData.title, // 分享title
            imageUrl: this.shareData.imgUrl, // 分享主图
            path: this.shareData.link // 分享链接
        });
    }
}
