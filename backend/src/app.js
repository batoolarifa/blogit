import dotenv from "dotenv";

dotenv.config({
    path: "./.env"
})


import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import  errorHandler from "./middlewares/error.middleware.js";


const app = express();


console.log(process.env.CORS_ORIGIN)

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))


app.use(express.json({
    limit:"16kb"
}))

app.use(express.urlencoded({
    extended: true, 
    limit:"16kb"
}))

app.use(express.static("public"))
app.use(cookieParser())



// routes import

import userRouter from "./routes/user.routes.js";
import blogRouter from "./routes/blog.routes.js";
import commentRouter from "./routes/comment.routes.js";
import followershipRouter from "./routes/followership.routes.js";

// routes  declaration

app.use("/api/v1/users", userRouter)
app.use("/api/v1/blogs", blogRouter)
app.use("/api/v1/comments", commentRouter)
app.use("/api/v1/followership", followershipRouter)



app.use(errorHandler);


export {app}