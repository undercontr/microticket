import express from "express"
import type { Express, Response, Request } from "express"
import { json } from "body-parser"
import routes from "./routes";
import { errorHandler } from "./middlewares/error-handler";

const app: Express = express();
app.use(json());
app.use(...routes)

app.use(errorHandler)

app.listen(3000, () => {
    console.log("Listening on port 3000")
})