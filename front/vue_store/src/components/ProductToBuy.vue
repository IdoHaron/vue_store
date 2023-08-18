<script setup lang="ts"> 
import Product from "./Product.vue"
import { defineProps, ref } from "vue"
let SelectedAmount;
const props = defineProps({ 
    product_img: String, product_name: String, product_id: Number, product_price: Number, product_amount:Number, product_description: String 
});
console.log('props:');
console.log(props);

const amount = ref(props.product_amount);
const amounts = ref([]);

const data_for_cart = ()=> {
    console.log("item to buy set up")
    let props_to_send = {};
    Object.assign(props_to_send, props);
    props_to_send["product_amount"] = SelectedAmount;
    amount.value-=SelectedAmount
    amounts.value = Array.from({length: amount.value}, (value, index) => index+1)
    return props_to_send;

};
amounts.value = Array.from({length: amount.value}, (value, index) => index+1)
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
        :product_description="props.product_description" :product_amount="amount"
        >
        select wanted amount: 
            <v-select name="amount" :items="amounts" v-model="SelectedAmount">
            </v-select>
        <br>
        <v-btn @click="$emit('add_item_to_cart', $event, data_for_cart())"> add to cart </v-btn>
        </Product> 
</template>

