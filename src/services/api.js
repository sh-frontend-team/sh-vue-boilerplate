import tocInstance from "@/baseUtils/fetch";
import { wxConfigApiUrl } from "./apiUrl";

export function getWxConfig(url) {
    return tocInstance.post(wxConfigApiUrl, {
        ServiceName: "wechatpublic",
        SourceType: 9,
        url
    });
}
