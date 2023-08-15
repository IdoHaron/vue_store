<script setup lang="ts"> 
import Product from "./Product.vue"
import { defineProps } from "vue"
let SelectedAmount;
const props = defineProps({ 
    product_img: String, product_name: String, product_id: Number, product_price: Number, product_amount:Number, product_description: String 
});
console.log('props:');
console.log(props);

const data_for_cart = ()=> {
    let props_to_send = {};
    Object.assign(props_to_send, props);
    props_to_send["product_amount"] = SelectedAmount;

};
/*
const add_to_cart_evet = ()=>{
    emit("add_item_to_cart", data_for_cart);
}
*/
</script> 
<template> 
        <Product v-if="props"
        :product_img="props.product_img"  :product_name="props.product_name" 
        :product_id="props.product_id" :product_price="props.product_price"
        :product_description="props.product_description" :product_amount="props.product_amount"
        >
        select wanted amount: 
            <select name="amount" v-model="SelectedAmount">
                <option v-for="possible_amount in props.product_amount" v-bind:value="possible_amount" v-bind:key="possible_amount">
                {{ possible_amount }}
                </option>
            </select>
        <br>
        <button @click="$emit('add_item_to_cart', data_for_cart())"> add to cart </button>
        </Product> 
</template>

