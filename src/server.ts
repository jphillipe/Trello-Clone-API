import express from "express";
import router from "./routes/routes.js";
import helmet from "helmet";

const app = express();

app.use(helmet())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", router);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
