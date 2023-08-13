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
app.use(cors())
app.get("/items", async (req, res)=>{
   await __database_event;
    if (!db_loaded)
      __database_event= load_db();
   await __database_event;
    res.json(database_content);
});

app.put("/buying_items", (req, res)=>{
      __database_event = handle_database_update();
})

async function handle_database_update(req, res){
   await __database_event;
   if (!db_loaded)
      await load_db();
   if (! (id_to_buy in  database_content)){
      res.status(400)
      res.send("product doesn't exists")
      return;
   }
   if (database_content[id_to_buy]["amount"] < amount){
      res.status(400)
      res.send(`not enough supply of the product: ${database_content[id_to_buy]["product_name"]}`)
   }
   database_content[id_to_buy]["amount"]-=amount;
   save_db();
   res.status(200);
}

const server_instace = app.listen(PORT, ()=>console.log(`server runs on port ${PORT}`));
server_instace.on('close', async function() {
   await save_db();
 });
 
 process.on('SIGINT', async function() {
   server_instace.close();
 });
