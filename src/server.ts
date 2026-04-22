import express from "express";
import router from "./routes/routes.js";
import helmet from "helmet";
import { globalErrorHandler } from "./middlewares/globalErrorHandler.js";

const app = express();

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", router);
app.use(globalErrorHandler);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
