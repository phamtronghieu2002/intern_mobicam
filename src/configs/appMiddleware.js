import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import cors from "cors";

const flash = require("connect-flash");

export default function appMiddleware(express, app) {


  app.use(cors());
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
  app.use(express.json());
  app.use(cookieParser(process.env.COOKIE_SECRET));
  app.use(
    session({
      secret: "nope",
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false }, // Nếu bạn sử dụng HTTPS, hãy đặt là true
    })
  );
  app.use(flash());
}
