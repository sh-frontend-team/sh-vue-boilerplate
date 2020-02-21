const nodeEnv = process.env.NODE_ENV;
const isProd = nodeEnv === "production";
const isTest = nodeEnv === "test" || nodeEnv === "development";
const isDev = nodeEnv === "development";

export function getBaseUrl() {
    const baseUrl = isProd
        ? "https://wechatx.34580.com/home/#"
        : "https://wechatz.34580.com/home/#";
    return {
        test: isTest,
        baseUrl,
        baseWechatUrl: baseUrl
    };
}

export function getApiUrl() {
    return isProd ? "https://api1.34580.com" : "https://apitest.34580.com";
}

export { isProd, isTest, isDev };
