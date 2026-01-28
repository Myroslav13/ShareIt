import { useState, useEffect} from "react";
import ItemCard from "./ItemCard";
import axios from "axios";
import type { Item } from "./../interfaces";

function ListItems() {
   const [allItems, setAllItems] = useState<Item[]>([]);

   async function fetchAll(page: number, limit: number) {
      const response = await axios.get(`http://localhost:3500/item?page=${page}&limit=${limit}`, { withCredentials: true });
      setAllItems(response.data);
   }

   useEffect(() => {
      fetchAll(1, 10);
   }, []);

   return (
      <div className="flex gap-3 mt-4">
         {allItems.map((el: Item, id) => (
            <ItemCard key={id} itemData={el}/>
         ))}
      </div>
   );
}

export default ListItems;