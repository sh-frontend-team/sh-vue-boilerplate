<template>
    <div class="demo-loading">{{ Message }}</div>
</template>
<script>
import { Button } from "vant";

export default {
    data() {
        return {
            Message: ""
        };
    },
    components: {
        [Button.name]: Button
    },
    mounted() {
        this.fetchMockData();
    },
    methods: {
        async fetchMockData() {
            this.$loading.show();
            const response = await this.$store.dispatch(
                "examples/fetchExamplesData"
            );
            if (response && response.Message) {
                this.Message = response.Data;
            }
            this.$loading.hide();
        }
    }
};
</script>
<style lang="scss">
.container-body {
    height: 100%;
}
</style>

<style lang="scss" scoped>
.demo-loading {
    display: flex;
    justify-content: center;
    width: 100%;
    font-size: 28px;
    padding: 16px;
}
</style>
