<template>
    <div class="examples-list">
        <div class="examples-list__item">
            <p class="examples-list__item--title">业务组件</p>
            <van-grid :column-num="2" clickable>
                <van-grid-item to="/do-task" text="do-task" />
                <van-grid-item to="/loading" text="Loading" />
            </van-grid>
        </div>
    </div>
</template>
<script>
import { Grid, GridItem } from "vant";
export default {
    components: {
        [Grid.name]: Grid,
        [GridItem.name]: GridItem
    },
    methods: {}
};
</script>
<style lang="scss">
.van-grid-item__text {
    padding: 10px;
    font-size: 20px;
}
</style>
<style lang="scss" scoped>
.examples-list {
    display: flex;
    flex-direction: column;
    font-size: 24px;
    width: 100%;
    &__item {
        display: flex;
        flex-direction: column;
        &--title {
            display: flex;
            padding: 24px;
            background: rgba(0, 0, 0, 0.05);
            width: 100%;
        }
    }
}
</style>
