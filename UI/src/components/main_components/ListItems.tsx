import ItemCard from "./ItemCard";
import type { Item } from "../../interfaces";

interface ListItemProps {
   allItems: Item[]
}

function ListItems({ allItems }: ListItemProps) {
   return (
      <div className="flex gap-3 mt-4">
         {allItems.map((el: Item, id) => (
            <ItemCard key={id} itemData={el}/>
         ))}
      </div>
   );
}

export default ListItems;