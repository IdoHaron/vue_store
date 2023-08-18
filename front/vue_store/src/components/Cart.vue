<script setup lang="ts"> 
import { SERVER } from "./../../consts"
import Product from "./Product.vue"

import { defineProps } from "vue"

const props = defineProps(["products"]);



</script>

<template>
<div>
    <div @add_item_to_cart="add_item_to_cart()" class="cart">
    <div  v-if="props" >
        <Product v-for="(product, index) in props.products" v-bind:key="product['product_id']" 
            :product_name="product['product_name']" :product_img="product['product_img']"
        :product_id="product['product_id']" :product_price="product['product_price']"
        :product_description="product['product_description']" :product_amount="product['product_amount']"
        >
        </Product>
    </div>
     <v-btn @click="$emit('checkout')">check-out</v-btn>
    </div>
</div>
</template>
<style scoped>
.cart{
      align-items: center;
}
</style>

