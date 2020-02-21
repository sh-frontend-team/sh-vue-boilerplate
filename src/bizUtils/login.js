import device from "@/baseUtils/device";
import { isProd, isTest } from "@/baseUtils/env";
import { SignIn } from "@freshservice/bridge";

const {
    isApp,
    isIOS,
    isAndroid,
    isWeMini,
    isWechat,
    isAplipay,
    isPad
} = device;
const TOKEN_NAME = `TOCTOKEN`;
const TOKEN_CITY_NAME = `TOCCITY`;

export function getToken() {
    const tokenStr = window.localStorage.getItem(TOKEN_NAME);
    const token =
        !tokenStr || tokenStr === "undefined" || tokenStr === "null"
            ? undefined
            : window.JSON.parse(tokenStr);

    const expires = new Date(token ? token.expires : undefined);
    const now = new Date();
    console.log("expires:", expires);
    console.log("now:", now, expires > now);
    return expires > now && token ? token : removeToken();
}

export function getCity() {
    const cityInfo = window.localStorage.getItem(TOKEN_CITY_NAME);
    return !cityInfo || cityInfo === "undefined" || cityInfo === "null"
        ? undefined
        : window.JSON.parse(cityInfo);
}

export function removeToken() {
    window.localStorage.removeItem(TOKEN_NAME);
    window.localStorage.removeItem("TOC_ISMAX");
    window.localStorage.removeItem("TOC_USER_INFORMATION");
    return {};
}

export function removeCity() {
    window.localStorage.removeItem(TOKEN_CITY_NAME);
    return {};
}

export function getTockenFrom() {
    return getToken().from || "wechat";
}

export function getRegisterMethod() {
    return isWechat
        ? 1500
        : isMiniProgram
        ? 1510
        : isAplipay
        ? 2040
        : isPad
        ? 1400
        : isIOS
        ? 1200
        : isAndroid
        ? 1300
        : 1600;
}

export function isLogin() {
    const token = getToken();
    if (token && token.CustomerGuid && token.AccessToken) {
        return true;
    }
    return false;
}

export function signIn({ RegisterType }) {
    if (isApp) {
        const token = getToken();
        const from = (token && token.form) || "wechat";

        SignIn.init({ from, test: isTest }).execute(
            RegisterType
                ? {
                      RegisterType
                  }
                : {}
        );
    } else if (isWeMini) {
        wx.miniProgram.redirectTo({
            url: `../user/signIn?service=${encodeURIComponent(
                window.location.origin +
                    window.location.pathname +
                    window.location.hash
            )}${
                RegisterType
                    ? `&isActivity=1&ActivityId=3116&RegisterMethod=${getRegisterMethod()}&RegisterType=3116`
                    : ""
            }`
        });
    } else {
        const baseUrl = isProd
            ? "https://wechatx.34580.com/mart/#/"
            : "https://wechatz.34580.com/mart/#";
        console.log("isTest:", isTest);
        SignIn.init({
            test: isTest,
            baseUrl,
            baseWechatUrl: baseUrl
        }).execute(
            // 必须设置一个无用参数用于截断原链接与渠道等参数，否则分享过去之后只剩下一个原参数（原因未明）
            RegisterType
                ? `&RegisterMethod=${getRegisterMethod()}&RegisterType=3116`
                : null
        );
    }
}
