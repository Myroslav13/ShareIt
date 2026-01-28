import { useState, useEffect} from "react";
import ItemCard from "./ItemCard";
import axios from "axios";
import type { Item } from "./../interfaces";

function ListItems() {
   const [allItems, setAllItems] = useState<any[]>([]);

   async function fetchAll() {
      const response = await axios.get("http://localhost:3500/getAll", { withCredentials: true });
      console.log(response.data);
      setAllItems(response.data);
   }

   useEffect(() => {
      fetchAll();
   }, []);

   return (
      <div>
         {allItems.map((el: Item, id) => (
            <ItemCard key={id} itemData={el}/>
         ))}
      </div>
   );
}

export default ListItems;