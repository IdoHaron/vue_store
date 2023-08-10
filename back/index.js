const express = require("express");
const { json } = require("express/lib/response");
const fs = require("fs");
const ps_fs = fs.promises;

const PORT = process.env.PORT || 3000;

const app=  express();
const file_content = ps_fs.readFile("products.json", 'utf-8');

app.get("/items", async (req, res)=>{
    const database_content = await JSON.parse(await file_content);
    res.json(database_content);
});

app.listen(PORT, ()=>console.log(`server runs on port ${PORT}`));