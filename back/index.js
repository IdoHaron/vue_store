const express = require("express");
const { json } = require("express/lib/response");
const fs = require("fs");
const cors = require("cors");
const ps_fs = fs.promises;

const PORT = process.env.PORT || 3000;

const app=  express();
let database_content ={};
let db_loaded = false;
let __database_event = null;

async function load_db(){
   const file_content = await ps_fs.readFile("products.json", 'utf-8');
   database_content = await JSON.parse(file_content);
   db_loaded= true
}

async function save_db(){
   await ps_fs.writeFile("products.json", JSON.stringify(database_content));
}
__database_event = load_db();
app.use(cors())
app.use(express.json());
app.use(express.json());
app.get("/items", async (req, res)=>{
   await __database_event;
   let to_send = []
   let current_element = {}
   console.log(database_content);
   for (key in database_content){
      current_element = Object.assign({}, database_content[key])
      current_element["product_id"] = key
      to_send.push(current_element)
   }
    res.json(to_send);
});

app.post("/buying_items", (req, res)=>{
      __database_event = handle_database_update(req.body, res);
})

async function handle_database_update(message, res){
   await __database_event;
   const all_items_data = message;
   if (!db_loaded)
      await load_db();
   let single_item_parsing_status = {}
   console.log(all_items_data)
   for (const item in all_items_data){
      single_item_parsing_status =  await single_item_update(all_items_data[item]);
      if (!single_item_parsing_status["success"]){
         res.status(400);
         res.send(single_item_parsing_status["error"])
         console.log(single_item_parsing_status["error"])
         return
      }
   }
   await save_db();
   res.status(200);
}

async function single_item_update(item_data){
   const res = {
      "success": true
   }
   const [id_to_buy, amount] = [item_data["id_to_buy"], item_data["product_amount"]]
   console.log(id_to_buy);
   console.log(database_content[id_to_buy]);
   if (! (id_to_buy in  database_content)){
      res["success"] = false;
      res["error"] = "product doesn't exists";
      return res;
   }
   if (database_content[id_to_buy]["amount"] < amount){
      res["success"] = false;
      res["error"] = `not enough supply of the product: ${database_content[id_to_buy]["product_name"]}`;
      return res;
   }
   database_content[id_to_buy]["amount"] -= amount;
   console.log(amount);
   return res;
}

const server_instace = app.listen(PORT, ()=>console.log(`server runs on port ${PORT}`));
server_instace.on('close', async function() {
   await save_db();
 });
 
 process.on('SIGINT', async function() {
   server_instace.close();
 });
