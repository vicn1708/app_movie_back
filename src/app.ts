import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();
import router from "./api/routes";
import { mongodb } from "./configs/mongodb";
import { jwtStrategy } from "./api/middleware/jwt";
import passport from "passport";
import helmet from "helmet";
import morgan from "morgan";
import { handleError } from "./api/middleware/handleError";

const app = express();

app.use(morgan("dev"));
app.use(morgan("combined"));

app.use(cors());

app.use(helmet());

app.use(compression());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
passport.use(jwtStrategy);

mongodb.connect();

router(app);

handleError(app);

app.listen(3000, () => {
  console.log(`Server running on http://localhost:3000`);
});
