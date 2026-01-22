import express from "express";

const port = 3500;
const app = express();

app.listen(port, () => {
   console.log(`Successfully listening to ${port}`);
});