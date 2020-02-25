<template>
    <div class="demo-do-task">
        <DoTask>
            <DoTaskItem
                v-for="task in tasks"
                :task="task"
                :key="task.taskId"
                registerType="3116"
            />
        </DoTask>
    </div>
</template>
<script>
export default {
    data() {
        return {
            tasks: [
                {
                    taskId: 475, // 任务ID
                    taskType: 1, // 任务类型
                    taskName: "分享描述", // 任务名称
                    icon: require("../assets/images/do-task/task-icon-1.png"),
                    description: "分享备注", // 任务描述
                    browsePageUrl: "", // 浏览专题页面地址
                    browsePageDuration: 0, // 浏览专题页面停留时间
                    browseSsuId: "", // 浏览的商品ssuid
                    shareTitle: "分享标题", // 分享的标题
                    sharePic:
                        "http://sh-groupon-test.oss-cn-shanghai.aliyuncs.com/f4a73ed734f0309f952ca61a522581d5/%E7%A7%AF%E5%88%86.png", //分享图片
                    addTimes: 0, // 任务做完完成的次数
                    isDone: false // 任务是否完成
                },
                {
                    taskId: 476,
                    taskType: 2,
                    taskName: "邀请描述",
                    icon: require("../assets/images/do-task/task-icon-2.png"),
                    description: "邀请备注",
                    browsePageUrl: null,
                    browsePageDuration: null,
                    browseSsuId: null,
                    shareTitle: "邀请标题",
                    sharePic:
                        "http://sh-groupon-test.oss-cn-shanghai.aliyuncs.com/bfa0c7ce4e4e570211f2a52ad989cba8/%E5%88%86%E4%BA%AB.png",
                    addTimes: 1,
                    isDone: false
                },
                {
                    taskId: 477,
                    taskType: 3,
                    taskName: "浏览页面描述",
                    icon: require("../assets/images/do-task/task-icon-3.png"),
                    description: "浏览页面备注",
                    browsePageUrl:
                        "https://wechatx.34580.com/topics/fe576e1657391753546b2dc8a7be3e24",
                    browsePageDuration: 1,
                    browseSsuId: null,
                    shareTitle: null,
                    sharePic: null,
                    addTimes: 1,
                    isDone: false
                },
                {
                    taskId: 478,
                    taskType: 4,
                    taskName: "浏览商品描述",
                    icon: require("../assets/images/do-task/task-icon-4.png"),
                    description: "浏览商品备注",
                    browsePageUrl: null,
                    browsePageDuration: null,
                    browseSsuId: 115488,
                    shareTitle: null,
                    sharePic: null,
                    addTimes: 1,
                    isDone: false
                },
                {
                    taskId: 479,
                    taskType: 5,
                    taskName: "下单描述",
                    icon: require("../assets/images/do-task/task-icon-5.png"),
                    description: "下单备注",
                    browsePageUrl: null,
                    browsePageDuration: null,
                    browseSsuId: null,
                    shareTitle: null,
                    sharePic: null,
                    addTimes: 1,
                    isDone: false
                },
                {
                    taskId: 480,
                    taskType: 6,
                    taskName: "签到描述",
                    icon: require("../assets/images/do-task/task-icon-6.png"),
                    description: "签到备注",
                    browsePageUrl: null,
                    browsePageDuration: null,
                    browseSsuId: null,
                    shareTitle: null,
                    sharePic: null,
                    addTimes: 1,
                    isDone: false
                },
                {
                    taskId: 481,
                    taskType: 10,
                    taskName: "赠送描述",
                    icon: require("../assets/images/do-task/task-icon-7.png"),
                    description: "赠送备注",
                    browsePageUrl: null,
                    browsePageDuration: null,
                    browseSsuId: null,
                    shareTitle: "赠送分享标题",
                    sharePic:
                        "http://sh-groupon-test.oss-cn-shanghai.aliyuncs.com/f4a73ed734f0309f952ca61a522581d5/%E7%A7%AF%E5%88%86.png",
                    addTimes: 1,
                    isDone: false
                }
            ]
        };
    }
};
</script>
<style lang="scss">
.van-toast--text {
    padding: 8px 12px;
}
</style>
<style lang="scss" scoped>
.demo-do-task {
    padding: 16px 93px 16px 96px;
}
</style>
