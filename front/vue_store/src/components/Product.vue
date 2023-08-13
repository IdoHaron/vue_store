<script lang="ts"> 
import { emit } from "cluster";
import { defineProps } from "vue"
const props = defineProps({ 
    product_img: String, product_name: String, product_id: Number, product_price: Number, product_amount:Number, product_description: String 
    });

const data_for_cart = ()=> {return {
    "name":props.product_name,  
    "id": props.product_id,
    "price": props.product_price
    }};

function add_to_cart_evet(){
    emit("add_item_to_cart", data_for_cart);
}
</script> 
<template> 
    <div :key="props.product_id"> 
        <img :src="props.product_img"> <br> 
        <h2>{{ props.product_name }}</h2> <br> 
        product description: {{ props.product_description }} <br> 
        product price: {{ props.product_price }} 
        product amount: {{product_amount}}
        <slot> </slot>
    </div>
</template>
