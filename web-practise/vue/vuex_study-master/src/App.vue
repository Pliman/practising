<template>
    <div>
        {{num1}}
        <button type="warning" @click="getNumber">get a random number</button>
        <Steps :Steps="registSpets" :SetData="SetData" />
        <button type="primary" @click="registSpets++">+++</button>
        {{registSpets}}
        <button type="danger" @click="registSpets--">---</button>
    </div>
</template>

<script lang="es6">
import Steps from "./Steps.vue";

export default {
    data: () => {
        return {
            num1: 0,
            registSpets: 1,
            SetData: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-"],
            getNumber: () =>{
                this.num1 = Math.ceil(Math.random() * 10); // Matg.ceil向上取整
            }
        }
    },
    components: {
        Steps
    }
}
</script>
