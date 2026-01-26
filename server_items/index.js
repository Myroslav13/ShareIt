import express from "express";
import pg from "pg";
import env from "dotenv";
import cors from "cors";

env.config();
 
const db = new pg.Client ({
   user: process.env.DB_USER,
   host: process.env.DB_HOST,
   database: process.env.DB_DATABASE,
   password: process.env.DB_PASSWORD,
   port: 5432,
});
 
db.connect();

const port = 3500;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.get("/getAll", async (req, res) => {
   const ownerId = req.query.ownerId;

   try {
      let result;
      if (ownerId) {
         result = await db.query("SELECT * FROM items WHERE owner_id = $1 ORDER BY id", [ownerId]);
      } else {
         result = await db.query("SELECT * FROM items ORDER BY id");
      }

      return res.status(200).json(result.rows || []);
   } catch (error) {
      return res.status(400).json({ error: `${error}` });
   }
});

app.get("/getItem/:id", async (req, res) => {
   const itemId = req.params.id;
   
   try {
      const result = await db.query("SELECT * FROM items WHERE id = $1", [itemId]);

      if (result.rowCount > 0) {
         return res.status(200).json( result.rows[0] );
      } else {
         return res.status(400).json({ error: 'Something went wrong' });
      }
   } catch (error) {
      return res.status(400).json({ error: `${error}` });
   }
});

app.post("/addItem", async (req, res) => {
   const ownerId = req.body.owner_id;
   const title = req.body.title;
   const description = req.body.description;
   const price = req.body.price;
   const today = new Date().toISOString();

   try {
      const result = await db.query("INSERT INTO items (owner_id, title, description, price, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *", [ownerId, title, description, price, today]);

      if (result.rowCount > 0) {
         const itemId = result.rows[0].id;
         return res.status(200).json({ message: `New item was created with id = ${itemId}`, item: result.rows[0] });
      } else {
         return res.status(400).json({ error: 'Something went wrong' });
      }
   } catch (error) {
      return res.status(400).json({ error: `${error}` });
   }
});

app.put("/editItem", async (req, res) => {
   const itemId = req.body.item_id;
   const ownerId = req.body.owner_id;
   const title = req.body.title;
   const description = req.body.description;
   const price = req.body.price;

   try {
      const result = await db.query("UPDATE items SET owner_id = $2, title = $3, description = $4, price = $5 WHERE id = $1 RETURNING *", [itemId, ownerId, title, description, price]);

      if (result.rowCount > 0) {
         const itemId = result.rows[0].id;
         return res.status(200).json({ message: `The item with id = ${itemId} was successfully edited`, item: result.rows[0] });
      } else {
         return res.status(400).json({ error: 'Something went wrong' });
      }
   } catch (error) {
      return res.status(400).json({ error: `${error}` });
   }
});

app.delete("/deleteItem/:id", async (req, res) => {
   const itemId = req.params.id;

   try {
      const result = await db.query("DELETE FROM items WHERE id = $1", [itemId]);

      if (result.rowCount > 0) {
         return res.status(200).json({ message: `The item with id = ${itemId} was successfully deleted` });
      } else {
         return res.status(400).json({ error: 'Something went wrong' });
      }
   } catch (error) {
      return res.status(400).json({ error: `${error}` });
   }
});

app.listen(port, () => {
   console.log(`Successfully listening to ${port}`);
});