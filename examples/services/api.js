// import tocInstance from "@/baseUtils/fetch";

/**
 * 模拟接口响应 延迟3秒
 */
export function exampleService() {
    return new Promise(resolve => {
        setTimeout(function() {
            resolve({
                Error: 0,
                Message: "请求成功",
                Data: "Loading效果，模拟请求接口，3秒后响应结果"
            });
        }, 3000);
    });
}
