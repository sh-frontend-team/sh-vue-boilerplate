import fetch from "@sh/fetch";
import { getApiUrl } from "@/baseUtils/env";

const baseURL = getApiUrl();
const serve = fetch({
    baseURL,
    needCity: true
});
serve.interceptors.request.use(function(config) {
    const { params, ...others } = config;
    return {
        params: {
            timestamp: Date.now(),
            ...params
        },
        ...others
    };
});

serve.interceptors.response.use(
    data => {
        return data;
    },
    error => {
        if (error.message === "Network Error") {
            throw new Error("网络连接失败");
        }
        throw error;
    }
);

export default serve;
