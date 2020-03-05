<!-- 
原作者：小香薯
日期：
说明：文本框组件
备注：为了兼容 ES6 与 TypeScript 两种语法开发的组件，因此使用TS编写 HelloWorld 组件作为测试
-->
<template>
    <div class="mn-input" :class="{ [`is-${size}`]: !!size }">
        <input
            ref="input"
            :type="type"
            class="mn-input-control"
            :class="{ 'is-focus': isFocus }"
            :value="parseBefore(value)"
            :placeholder="placeholder"
            :readonly="readonly"
            :disabled="disabled"
            :maxlength="maxlength"
            @input="changeValue"
            @focus="onFocus"
            @blur="onBlur"
        />
        <div class="mn-input-mask" :class="{ 'is-focus': isFocus }"></div>
        <transition name="mn-input-clear">
            <div
                v-if="value && !hideClear"
                class="mn-input-clear"
                @click="clearValue"
            >
                <img
                    class="mn-input-clear-icon"
                    src="./login_icon_close.svg"
                    alt=""
                />
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
@Component({})
export default class HelloWorld extends Vue {
    @Prop({ default: undefined })
    public readonly value: string | undefined;
    @Prop({
        type: String,
        default: "test"
        // required: true,
        // validator: (value: string) => {
        //     return ["text", "password", "tel"].indexOf(value) !== -1;
        // }
    })
    public readonly type: string | undefined;
    @Prop()
    public readonly maxlength: number | undefined;
    @Prop()
    public readonly placeholder: string | undefined;
    @Prop({ default: false })
    public readonly readonly: boolean | undefined;
    @Prop({ default: false })
    public readonly disabled: boolean | undefined;
    @Prop({ default: "" })
    public readonly size: string | undefined;
    @Prop({ default: false })
    public readonly hideClear: boolean | undefined;
    @Prop({ default: false })
    public readonly autospace: boolean | undefined;

    public isFocus: boolean = false;
    @Emit("input")
    public changeValue(event: Event) {
        const pos = (event.target as HTMLInputElement).value.length;
        setTimeout(
            () =>
                (event.target as HTMLInputElement).setSelectionRange(pos, pos),
            20
        );
        return this.parseAfter((event.target as HTMLInputElement).value);
    }
    @Emit("input")
    public clearValue() {
        return this.parseClear();
    }
    public parseClear() {
        return undefined;
    }
    public parseAfter(newValue: string) {
        if (this.autospace) {
            newValue = newValue.replace(/\s+/g, "");
        }
        return newValue.length > 0 ? newValue : undefined;
    }
    public parseBefore(value: string) {
        if (value && this.autospace) {
            value = value.replace(/(.{4})/g, "$1 ");
        }
        return value;
    }
    public onFocus() {
        this.isFocus = true;
        setTimeout(() => {
            this.isFocus = false;
        }, 672);
    }
    @Emit("blur")
    public onBlur() {
        try {
            const ua = window.navigator.userAgent.toLowerCase();
            let version: string | RegExpMatchArray | null = ua.match(
                /cpu iphone os (.*?) like mac os/
            );
            version = version && version[1].substring(0, 2);
            if (/iphone|ipad|ipod|ios/i.test(ua) && version === "12") {
                const scrollHeight =
                    document.documentElement.scrollTop ||
                    document.body.scrollTop ||
                    0;
                window.scrollTo(0, Math.max(scrollHeight - 1, 0));
            }
        } catch (e) {
            throw e;
        }
    }
}
</script>

<style lang="scss">
@keyframes mn-input-control {
    0% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(3px);
    }
    100% {
        transform: translateY(0);
    }
}

@keyframes mn-input-mask {
    0% {
        transform: scale(0);
    }
    100% {
        transform: scale(1);
    }
}

.mn-input {
    width: 100%;
    display: flex;
    align-items: center;
    position: relative;

    &-control {
        flex: 1 1;
        display: block;
        width: 100%;
        height: 1.5rem;
        line-height: 1.5;
        border: none;
        padding: 0;
        background: transparent;
        outline: none;
        -webkit-appearance: none;

        &.is-focus {
            animation: 900ms mn-input-control;
        }
    }

    &.is-lg {
        .mn-input-control {
            height: 3.5rem;
            padding-top: 1rem;
            padding-bottom: 1rem;
        }
    }

    &-mask {
        $radius: 80px;
        position: absolute;
        width: $radius;
        height: $radius;
        background: rgba(rgb(0, 122, 255), 0.03);
        transform: scale(0);
        border-radius: $radius / 2;
        top: $radius * -0.5 + 28px;
        left: $radius * -0.1;

        &.is-focus {
            animation: 366ms mn-input-mask;
        }
    }

    &-clear {
        flex-shrink: 0;
        cursor: pointer;
        font-size: 0;
    }

    &-clear-enter-active {
        transition: all 0.2s ease;
    }

    &-clear-leave-active {
        transition: all 0.2s ease;
    }

    &-clear-enter,
    &-clear-leave-active {
        opacity: 0;
    }

    &-clear-icon {
        color: rgba(0, 0, 0, 0.2);
    }
}
</style>
