const path=require("path");
const express =require("express");
const app=express();
const PORT=8000;
app.set('viewengine','ejs');
app.set('views',path.resolve('./views'));
app.listen(PORT,()=>console.log(`server started at porst:${PORT}`));