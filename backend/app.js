import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import dbConnection from "./database/dbConnection.js";
import { errorMiddleware } from "./middleWares/error.js";
import messageRouter from "./routes/messageRoute.js";
import userRouter from "./routes/userRoute.js";
import timelineRouter from "./routes/timelineRoute.js";
import applicationToolRouter from "./routes/applicationToolRoute.js"
import skillRouter from "./routes/skillRoutes.js"
import projectRouter from "./routes/projectRoute.js"

dotenv.config({ path: "./config/config.env" });

const app = express();

app.use(
  cors({
    origin: [process.env.PORTFOLIO_URL, process.env.DASHBOARD_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/temp/",
  })
);

app.use("/portfolio/api/message", messageRouter);
app.use("/portfolio/api/user", userRouter);
app.use("/portfolio/api/timeline", timelineRouter);
app.use("/portfolio/api/tool", applicationToolRouter);
app.use("/portfolio/api/skill", skillRouter);
app.use("/portfolio/api/project", projectRouter);

dbConnection();
app.use(errorMiddleware);

export default app;
