<template>
    <div class="container">
        <div
            class="container-header"
            :class="{ 'container-header-split': this.$route.name !== 'home' }"
        >
            <router-link to="/"><van-icon name="arrow-left"/></router-link>
            <p>{{ title }}</p>
        </div>
        <div class="container-body">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
export default {
    computed: {
        title() {
            return this.$route.meta.title;
        }
    }
};
</script>

<style lang="scss">
@import "../src/styles/index.scss";
</style>
<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 0;
    margin: 0;
    background: rgba(0, 0, 0, 0.05);
    &-header {
        display: flex;
        align-items: center;
        padding: 24px;
        font-size: 28px;
        background: #fff;
        &-split {
            margin-bottom: 16px;
        }
        > a {
            display: flex;
            position: absolute;
            font-size: 42px;
            color: rgba(0, 0, 0, 0.45);
        }
        > p {
            display: flex;
            justify-content: center;
            width: 100%;
        }
    }
    &-body {
        display: flex;
        background: #fff;
        // height: 100%;
    }
}
</style>
