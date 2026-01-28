import { useState } from "react";
import type { Item } from "./../interfaces";

interface ItemCardProps {
   itemData: Item
}

function ItemCard({ itemData }: ItemCardProps) {
   const [mouseEnter, setMouseEnter] = useState<boolean>(false);

   return (
      <div className="bg-white rounded-xl p-2 shadow w-[200px]">
         <h1 className="font-bold text-lg">{ itemData.title }</h1>
         <p className="truncate">{ itemData.description }</p>
         {mouseEnter === false ?
            <p onMouseEnter={() => setMouseEnter(true)}><span className="text-[#1E2A38] font-bold">{ itemData.price }</span> UAH/hour</p>
            :
            <button onMouseLeave={() => setMouseEnter(false)} className="enter-btn !mt-0">Rent</button>
         }
      </div>
   );
}

export default ItemCard;