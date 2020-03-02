<template>
    <ul class="sh-do-task">
        <slot></slot>
    </ul>
</template>
<script>
export default {
    name: "DoTask",
    mounted() {},
    methods: {}
};
</script>
<style lang="scss" scoped>
.sh-do-task {
    display: flex;
    flex-direction: column;
    justify-content: center;
    list-style: none;
    margin: 0;
    padding: 0;
}
</style>
