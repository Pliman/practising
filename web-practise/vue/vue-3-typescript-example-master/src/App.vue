<template>
    <div>
        {{num1}}
        <el-button type="warning" @click="getNumber">get a random number</el-button>
        <Steps :Steps="registSpets" :SetData="SetData" />
        <el-button type="primary" @click="registSpets++">+++</el-button>
        {{registSpets}}
        <el-button type="danger" @click="registSpets--">---</el-button>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Steps from "./Steps.vue";
@Component({
    components: {
        Steps
    }
})
export default class Input extends Vue {
    num1: 0;
    registSpets = 1;
    SetData = ["用户信息", "魔童哪吒", "齐天大圣", "赤脚大仙", "我爱中国"];
    getNumber() {
        this.num1 = Math.ceil(Math.random() * 10); // Matg.ceil向上取整
    }
}
</script>
