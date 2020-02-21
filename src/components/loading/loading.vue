<template>
    <div class="sh-loading">
        <van-loading v-show="loading" size="28" text-size="16">
            <p>{{ message || "加载中..." }}</p>
        </van-loading>
    </div>
</template>
<script>
import { Loading } from "vant";

export default {
    name: "Loading",
    components: {
        [Loading.name]: Loading
    },
    data() {
        return {
            loading: false,
            message: ""
        };
    },
    methods: {
        show: function(message) {
            this.loading = true;
            this.message = message;
        },
        hide: function() {
            this.loading = false;
        }
    }
};
</script>
<style lang="scss" scoped>
.sh-loading {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 9999;
    transform: translate(-50%, -50%);
}
</style>
