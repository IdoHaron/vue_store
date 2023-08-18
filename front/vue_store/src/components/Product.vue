<script setup lang="ts"> 
import { defineProps } from "vue"
const props = defineProps({ 
    product_img: String, product_name: String, product_id: Number, product_price: Number, product_amount:Number, product_description: String 
    });

</script> 
<template> 
<div class="Product">
    <div :key="props.product_id" class="ProductDesign"> 
        <img :src="props.product_img" width="300" height="300"> <br> 
        <h2>{{ props.product_name }}</h2> <br> 
        product description: {{ props.product_description }} <br> 
        product price: {{ props.product_price }} 
        <br>
        product amount: {{props.product_amount}}
        <br>
        <slot> </slot>
    </div>
</div>
</template>
<style scoped>
.Product{
      flex-direction: column;
}
</style>

