import express from "express";
import cors from "cors";
import { config } from "dotenv"; // instead of importing all of dotenv
import { dbConnect } from "./config/mongoose.config.js";
import userRouter from "./routes/user.routes.js"
import productRouter from "./routes/product.routes.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json(), cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json())
app.use(cookieParser())
app.use("/v1/user", userRouter);
app.use("/v1/product",productRouter);

config(); // instead of dotenv.config
const PORT = process.env.PORT;

dbConnect();

app.listen(PORT, () => {
    console.log("port:", PORT);
});
