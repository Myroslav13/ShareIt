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

app.get("/item", async (req, res) => {
   const ownerId = req.query.ownerId;
   const excludeOwnerId = req.query.excludeOwnerId;
   const page = parseInt(req.query.page) || 1;
   const limit = parseInt(req.query.limit) || 20;
   const offset = (page - 1) * limit;

   const location = req.query.location;
   const startDate = req.query.startDate;
   const endDate = req.query.endDate;
   const title = req.query.title;

   try {
      let params = [];
      let where = [];
      let joinUsers = false;

      if (ownerId) {
         where.push(`owner_id = $${params.length + 1}`);
         params.push(ownerId);
      }

      if (excludeOwnerId) {
         where.push(`owner_id != $${params.length + 1}`);
         params.push(excludeOwnerId);
      }

      if (title) {
         where.push(`title ILIKE $${params.length + 1}`);
         params.push(`%${title}%`);
      }

      if (startDate) {
         where.push(`created_at::date >= $${params.length + 1}::date`);
         params.push(startDate);
      }

      if (endDate) {
         where.push(`created_at::date <= $${params.length + 1}::date`);
         params.push(endDate);
      }

      if (location) {
         joinUsers = true;
         where.push(`users.location = $${params.length + 1}`);
         params.push(location);
      }

      let baseQuery = 'SELECT * FROM items';
      if (joinUsers) baseQuery += ' JOIN users ON items.owner_id = users.id';

      if (where.length > 0) baseQuery += ' WHERE ' + where.join(' AND ');

      baseQuery += ` ORDER BY items.id LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
      params.push(limit, offset);

      const result = await db.query(baseQuery, params);

      return res.status(200).json(result.rows);
   } catch (error) {
      return res.status(500).json({ error: `${error}` });
   }
});

app.get("/item/:id", async (req, res) => {
   const itemId = req.params.id;
   
   try {
      const result = await db.query("SELECT * FROM items WHERE id = $1", [itemId]);

      if (result.rowCount > 0) {
         return res.status(200).json(result.rows[0]);
      } else {
         return res.status(400).json({ error: 'Something went wrong' });
      }
   } catch (error) {
      return res.status(500).json({ error: `${error}` });
   }
});

app.post("/item", async (req, res) => {
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
      return res.status(500).json({ error: `${error}` });
   }
});

app.put("/item/:id", async (req, res) => {
   const itemId = req.params.id;
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
      return res.status(500).json({ error: `${error}` });
   }
});

app.delete("/item/:id", async (req, res) => {
   const itemId = req.params.id;

   try {
      const result = await db.query("DELETE FROM items WHERE id = $1", [itemId]);

      if (result.rowCount > 0) {
         return res.status(200).json({ message: `The item with id = ${itemId} was successfully deleted` });
      } else {
         return res.status(400).json({ error: 'Something went wrong' });
      }
   } catch (error) {
      return res.status(500).json({ error: `${error}` });
   }
});

app.listen(port, () => {
   console.log(`Successfully listening to ${port}`);
});