/**
 * 接口服务域名
 */
const thkHost = "https://thk.34580.com";

const api1Host = "https://api1.34580.com";

/***************************************************************************/

/**
 * 获取微信配置信息API
 */
const wxConfigApiUrl = "/WxApp/JsSdkSignature";

/**
 * 口令红包项目-获取红包概述
 */
const activitySummaryApi =
    "/promotionactivity/api/promotionactivitymanage/activitysummary/328";

/**
 * 口令红包项目-领取红包
 */
const enterPasswordApi =
    "/sz/redPackage/enterPassword?password=2212&sourcetype=9&accesstoken=96c3e346fa874cd0&customerguid=0ab4256c-072e-4876-9c42-a36803db6310";

if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        thkHost,
        api1Host,
        wxConfigApiUrl,
        activitySummaryApi,
        enterPasswordApi
    };
} else if (typeof define !== "undefined" && define.amd) {
    define("apiUrl", [], function() {
        return {
            thkHost,
            api1Host,
            wxConfigApiUrl,
            activitySummaryApi,
            enterPasswordApi
        };
    });
}
