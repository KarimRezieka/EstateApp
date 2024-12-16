import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import postRoute from "./routes/postRoute.js";
import chatRoute from "./routes/chatRoute.js";
import messageRoute from './routes/messageRoute.js'
// Load environment variables
dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENTSIDE_URL, // Use the correct key `origin`
    credentials: true, // Allow cookies and credentials
  })
);
app.use(express.json());

// Corrected cookie-parser usage
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);


const port = 8800;
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
