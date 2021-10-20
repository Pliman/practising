<template>
    <div class="parent">
        <h3>这里是父组件</h3>
        <button type="button" @click="clickHandler">修改自己文本</button>
        <button type="button" @click="clickHandler2">修改子组件文本</button>
        <div>Test: {{msg}}</div>
        <child></child>
    </div>
</template>

<script>
    import Child from './Child.vue'
    import {CHANGE_CHILD_TEXT, CHANGE_TEST_MSG} from "../store/mutation-types";
    import {mapMutations, mapState} from "vuex";

    export default {
        name: "Parent",
        computed: {
            ...mapState({
                msg: state => state.module1.testMsg
            })
        },
        methods:{
            // 映射为名称不同的mutations操作
            ...mapMutations({
                changeTestMsg: CHANGE_TEST_MSG,
            }),
            // 映射为名称相同的mutations操作
            ...mapMutations([
                CHANGE_CHILD_TEXT
            ]),

            clickHandler(){
                this.changeTestMsg({
                    content: '父组件修改自己后的文本'
                });
            },
            clickHandler2(){
                this.changeChildText({
                    content: '父组件修改子组件后的文本'
                });
            }
        },
        components:{
            'child': Child
        }
    }
</script>

<style scoped>
    .parent{
        background-color: #00BBFF;
        height: 400px;
    }
</style>
