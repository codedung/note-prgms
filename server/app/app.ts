import express, { Express, Response, Request } from "express";
import cors from "cors";
import userAPI from "@/Users/users.route";
import noteAPI from "@/Notes/notes.route";
import { CORS_ORIGIN } from "@/setting";
import cookieParser from "cookie-parser";

const app: Express = express();
app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
    exposedHeaders: ["Authorization"],
  })
);
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: false }));

app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});

app.use("/api/users", userAPI);
app.use("/api/notes", noteAPI);

export default app;
