import express from "express";
import pg from "pg";
import env from "dotenv";
import bcrypt from "bcrypt";
import passport from "passport";
import session from "express-session";
import { Strategy as LocalStrategy } from "passport-local";
import GoogleStrategy from "passport-google-oauth2";

env.config();
 
const db = new pg.Client ({
   user: process.env.DB_USER,
   host: process.env.DB_HOST,
   database: process.env.DB_DATABASE,
   password: process.env.DB_PASSWORD,
   port: 5432,
});

db.connect();

const port = 3000;
const app = express();
const saltRounds = 10;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
   secret: process.env.COOKIES_SECRET,
   resave: false,
   saveUninitialized: true,
   cookie: {
      maxAge: 1000 * 60 * 60,
   }
}));

passport.use("local", new LocalStrategy(
   {usernameField: "email", passwordField: "password"},
   async (username, password, cb) => {
      
   }
));

app.post("/login", (req, res) => {
   passport.authenticate("local", (error, user) => {

   });
});

passport.serializeUser((user, done) => {
   done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
   const response = await db.query("SELECT * FROM users WHERE id = $1", [userId]);
   const result = response.rows[0];
   done(null, result);
});

app.listen(port, () => {
   console.log(`Successfully listening to ${port}`);
});