import express from "express";
import cors from "cors"
import router from "./router/router.js";

const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", router);

function startApp() {
  try {
    app.listen(PORT, () =>
      console.log(`SERVER STARTED at http://localhost:${PORT}`)
    );
  } catch (e) {
    console.log(e);
  }
}

startApp();
