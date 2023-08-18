<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref } from "vue"
import HelloWorld from './components/HelloWorld.vue'
import  ProductToBuy from './components/ProductToBuy.vue'
import Cart from "./components/Cart.vue"
import {SERVER} from "./../consts"
let answer= ref([]);
const products_in_cart = ref([]);
fetch(SERVER+"/items", {
  "headers": {
    "Content-Type": "application/json"
  },
  "method": "GET"
}).then(async (res)=>{
  const tex = await res.text();
  console.log(tex);
  answer.value = JSON.parse(tex);
  console.log(answer.value);
});

function add_item_to_cart(event, item_property:Record<string, any>){
    products_in_cart.value.push(item_property);
}

function checkout(){
    const all_items = [];
    console.log(products_in_cart.value);
    for (let i = 0; i<products_in_cart.value.length; i++){
      all_items.push({
        "id_to_buy": products_in_cart.value[i]["product_id"],
        "product_amount": products_in_cart.value[i]["product_amount"]
      })
    }
    const to_send = JSON.stringify(all_items);
    console.log(to_send)
    fetch(SERVER+"/buying_items", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:to_send
    }).catch(async (error)=>{
      console.log(await error.text);
      console.log("here, error handling");
    });
    products_in_cart.value = [];
}

</script>

<template>
<v-app>
  <div>
    <div class="ProductDesign" >
      <ProductToBuy v-for="product in answer" v-bind:key="product['product_id']" 
      :product_name="product['product_name']" :product_img="product['product_image']"
      :product_id="product['product_id']" :product_price="product['product_price']"
      :product_description="product['product_description']" :product_amount="product['product_amount']"
      @add_item_to_cart="add_item_to_cart">
    </ProductToBuy>
    </div>
    <v-navigation-drawer v-app :width="325">
    <Cart :products="products_in_cart" @checkout="checkout" />
    </v-navigation-drawer>
  </div>
</v-app>
</template>

<style scoped>


.ProductDesign{
  display: flex;
  align-items: center;
  flex-direction: row;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>

