import express from "express";
import pg from "pg";
import cors from "cors";
import env from "dotenv";
import bcrypt from "bcrypt";
import passport from "passport";
import session from "express-session";
import { Strategy as LocalStrategy } from "passport-local";
import GoogleStrategy from "passport-google-oauth2";
// import FacebookStrategy from "passport-facebook";

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
app.use(
   cors({
      origin: "http://localhost:5173",
      credentials: true,
   })
);

app.use(session({
   secret: process.env.COOKIES_SECRET,
   resave: false,
   saveUninitialized: true,
   cookie: {
      maxAge: 1000 * 60 * 60,
      sameSite: 'lax'
   }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use("local", new LocalStrategy(
   { usernameField: "email", passwordField: "password" },
   async (username, password, done) => {
      try{
         const response = await db.query("SELECT * FROM users WHERE email = $1", [username]);

         if (response.rowCount < 1) {
            return done(null, false);
         }

         const user = response.rows[0];
         const passwordHashed = user.password_hash || user.password;

         if (!passwordHashed) {
            return done(null, false);
         }

         bcrypt.compare(password, passwordHashed, (err, result) => {
            if (err) {
               return done(err);
            }

            if (result) {
               return done(null, user);
            } else {
               return done(null, false);
            }
         });
      } catch (err) {
         return done(err);
      }
   }
));

passport.use("google",
   new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
      passReqToCallback: true
   },
   async function(request, accessToken, refreshToken, profile, done) {
      const firstName = profile.given_name;
      const lastName = profile.family_name;
      const email = profile.email;

      try {
         const response = await db.query("SELECT * FROM users WHERE email = $1", [email]);

         if (response.rowCount > 0) {
            const user = response.rows[0];
            return done(null, user);
         } else {
            const result = await db.query(
               "INSERT INTO users (first_name, last_name, email, password_hash) VALUES ($1, $2, $3, $4) RETURNING *", 
               [firstName, lastName, email, "google"]
            );
            const newUser = result.rows[0];
            return done(null, newUser);
         }
      } catch (err) {
         return done(err);
      }
   }
));

// passport.use("facebook", 
//    new FacebookStrategy({
//       clientID: process.env.FACEBOOK_APP_ID,
//       clientSecret: process.env.FACEBOOK_APP_SECRET,
//       callbackURL: 'https://www.example.com/oauth2/redirect/facebook'
//    },
//    async function(accessToken, refreshToken, profile, done) {
//       console.log(profile);
//       const firstName = profile.given_name;
//       const lastName = profile.family_name;
//       const email = profile.email;

//       try {
//          const response = await db.query("SELECT * FROM users WHERE email = $1", [email]);

//          if (response.rowCount > 0) {
//             const user = response.rows[0];
//             return done(null, user);
//          } else {
//             const result = await db.query(
//                "INSERT INTO users (first_name, last_name, email, password_hash) VALUES ($1, $2, $3, $4) RETURNING *", 
//                [firstName, lastName, email, "facebook"]
//             );
//             const newUser = result.rows[0];
//             return done(null, newUser);
//          }
//       } catch (err) {
//          return done(err);
//       }
//    }
// ));

app.post("/login", (req, res, next) => {
   passport.authenticate("local", (error, user) => {
      if (error) {
         return res.status(400).json({ message: "Something went wrong" });
      }

      if (!user) {
         return res.status(401).json({ message: "Invalid email or password" });
      }

      req.login(user, (err) => {
         if (err) {
            return next(err);
         }

         // ensure session is saved and Set-Cookie is sent before responding
         req.session.save((saveErr) => {
            if (saveErr) return next(saveErr);
            return res.status(200).json({message: "Successfully logged in", user: user});
         });
      });
   })(req, res, next);
});

app.post("/register", async (req, res) => {
   const { firstName, lastName, email, password } = req.body;

   try {
      const hash = await bcrypt.hash(password, saltRounds);

      const response = await db.query(
         "INSERT INTO users (first_name, last_name, email, password_hash) VALUES ($1, $2, $3, $4) RETURNING *",
         [firstName, lastName, email, hash]
      );

      const user = response.rows[0];

      if (response.rowCount < 1) {
         return res.status(400).json({ message: "Something went wrong" });
      }

      req.login(user, (err) => {
         if (err) {
            return res.status(400).json({ message: "Something went wrong" });
         }

         req.session.save((saveErr) => {
            if (saveErr) return res.status(400).json({ message: "Something went wrong" });
            return res.status(200).json({ message: "Successfully registered", user });
         });
      });
   } catch (err) {
      const message = err?.detail || err?.message;

      if (err && err.code === "23505") {
         return res.status(409).json({ message: "Email already exists" });
      }

      return res.status(400).json({ message });
   }
});

app.get("/me", (req, res) => {
   if(req.isAuthenticated()) {
      return res.status(200).json({ user: req.user });
   } else {
      return res.status(400).json({ message: "You are not authenticated" });
   }
});

app.get('/auth/google',
   passport.authenticate('google', { 
      scope: [ 'email', 'profile' ] 
   }
));

app.get('/auth/google/callback',
   passport.authenticate('google', {
      successRedirect: 'http://localhost:5173/main',
      failureRedirect: 'http://localhost:5173/'
   }
));

app.post("/logout", (req, res) => {
   req.logout((err) => {
      if (err) {
         return res.status(500).json({message: "Logout failed"});
      }

      return res.status(200).json({message: "Successfully logged out"});
   });
});

app.get('/login/facebook', passport.authenticate('facebook'));

// app.get('/login/facebook', passport.authenticate('facebook', {
//   scope: [ 'email', 'user_location' ]
// }));

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