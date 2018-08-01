import express from "express"
import "dotenv/config"
import mongoose from 'mongoose'
import volleyball from 'volleyball'
import { restRouter } from './api';
import cors from 'cors'
const {PORT, DBurl} = process.env
const app = express()

mongoose.connect(DBurl);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("[MongoDB]:ça marche ici");
});

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(volleyball)
app.use(cors())
app.use('/api', restRouter)

app.use((req, res, next)=>{
  const error = new Error("Not found");
  error.message = "route invalide"
  error.status = 404
  next(error)
})

app.use((error, req, res, next)=>{
  res.status(error.status || 500)
  return res.json({
    error:{
      msg: error.message
    }
  })
})

app.listen(PORT,()=>{
  console.log(`L'app marche sur le port: ${PORT}`);
})
