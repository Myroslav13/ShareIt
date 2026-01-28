import { useState, useEffect} from "react";
import type { Item } from "./../interfaces";

interface ItemCardProps {
   itemData: Item
}

function ItemCard({ itemData }: ItemCardProps) {
   const [count, setCount] = useState(0);

   return (
      <>
         <h1>{ itemData.title }</h1>
      </>
   );
}

export default ItemCard;