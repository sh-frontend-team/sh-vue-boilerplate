/* eslint-disable */
const ua = window.navigator.userAgent;
const uaToLower = ua.toLowerCase();
const verIOS = uaToLower.match(/cpu iphone os (.*?) like mac os/);
const verAndroid = uaToLower.match(/android\s([0-9.]*)/);
const verShiHang = uaToLower.match(/shihang_app_v([0-9.]*)/);
const verWxDevTool = uaToLower.match(/wechatdevtools\/(.*?)/);
const isApp = /shihang_app|shihang/.test(uaToLower);
const isIOS = /(iPhone|iPad|iPod|iOS)/gi.test(ua);
const isAndroid = /android|adr/gi.test(uaToLower);
const isWechat = /micromessenger/.test(uaToLower);
const isWeMini = isIOS
    ? window.__wxjs_environment === "miniprogram"
    : isAndroid
    ? /minipogram/i.test(uaToLower)
    : false;
const isPad = ua.match(/iPad/i) === "iPad";
const isIOSClient = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
const isMobile = /(iPhone|iPad|iPod|iOS|Android|adr|Windows Phone|SymbianOS)/gi.test(
    ua
);
const isAplipay = ua.indexOf("AlipayClient") > -1;
const isWxTool = /wechatdevtools/.test(uaToLower);
const appVersion = (verShiHang && verShiHang[1]) || -1;
const iosVersion = (verIOS && verIOS[1].replace(/_/g, ".")) || -1;
const androidVersion = (verAndroid && verAndroid[1]) || -1;
const wxToolVersion = (verWxDevTool && verWxDevTool[1]) || -1;
const device = {
    ShiHangApp: isApp,
    IOS: isIOS,
    Android: isAndroid,
    WeMini: isWeMini,
    Wechat: isWechat,
    Aplipay: isAplipay,
    IPAD: isPad,
    Mobile: isMobile,
    WxTool: isWxTool,
    ShiHangAppVersion: appVersion,
    IOSVersion: iosVersion,
    AndroidVersion: androidVersion,
    WxToolVersion: wxToolVersion
};

export {
    isApp,
    isIOS,
    isAndroid,
    isWeMini,
    isWechat,
    isAplipay,
    isPad,
    isMobile,
    isIOSClient,
    appVersion,
    iosVersion,
    androidVersion,
    wxToolVersion
};

export default device;
