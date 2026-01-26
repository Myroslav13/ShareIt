import { useState, useEffect} from "react";
import ItemCard from "./ItemCard";

function ListItems() {
   const [count, setCount] = useState(0);

   return (
      <>
         <ItemCard/>
      </>
   );
}

export default ListItems;