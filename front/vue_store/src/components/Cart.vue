<script lang="ts"> 
import { SERVER } from "./../../consts"
import Product from "./Product.vue"
import {ref} from "vue"

const products = ref([]);

function checkout(){
    const to_send = JSON.stringify(products);
    fetch(SERVER+"/buying_items", {
        method: 'PUT',
        body:to_send
    });
    products.value = [];
}

function add_item_to_cart(item_property:Record<string, any>){
    products.value.push(item_property);
}

function get_products(){
    return products.value;
}

console.log(products.value)



</script>

<template>
    <div @add_item_to_cart="add_item_to_cart()">
        <Product v-for="(product, index) in products" v-bind:key="product['product_id']" 
            :product_name="product['product_name']" :product_img="product['product_img']"
        :product_id="product['product_id']" :product_price="product['product_price']"
        :product_description="product['product_description']" :product_amount="product['product_amount']"
        ></Product>
        <button @click="checkout()">check-out</button>
    </div>
</template>