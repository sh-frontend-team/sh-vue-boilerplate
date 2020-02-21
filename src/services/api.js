import tocInstance from "@/baseUtils/fetch";

export function getWxConfig(url) {
    return tocInstance.post("/WxApp/JsSdkSignature", {
        ServiceName: "wechatpublic",
        SourceType: 9,
        url
    });
}
