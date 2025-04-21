import express from "express";
import cors from "cors";
import "dotenv/config"
import { dbConnect } from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import articleRoutes from "./routes/articleRoute.js"
import bookmarkRoutes from "./routes/bookmarkRoutes.js"
import cookieParser from "cookie-parser";



const app=express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",   
    credentials: true                 
  }));
app.use(cookieParser());
dbConnect();

const port=process.env.PORT;

app.use('/users',userRouter);
app.use('/articles',articleRoutes);
app.use('/bookmarks',bookmarkRoutes);

app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
})