// poradnie importov dotenv musel ist prvy kvoli tomu, aby sa nacitali env premene pred importom ostatnych modulov
import "dotenv/config";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { profileRouter } from "../routes/profile";
import { planRouter } from "../routes/plan";

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/profile", profileRouter);
app.use("/api/plan", planRouter);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
