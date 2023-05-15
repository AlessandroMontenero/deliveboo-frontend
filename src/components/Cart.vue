<script>
import PayButton from './PayButton.vue'

export default{
    data(){
        return {
            expanded: 0
        }
    },
    components:{
        PayButton
    }
}
</script>

<template>
    {{ expanded }}
    <span @click="expanded == 0 ? expanded = 1 : expanded = 0">
        <PayButton />
    </span>
</template>