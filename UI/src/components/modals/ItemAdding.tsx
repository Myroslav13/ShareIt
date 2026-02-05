import { useState } from "react";
import type { Item } from "../../interfaces";

interface ItemAdding {
   setIsAddingItemModal: React.Dispatch<React.SetStateAction<boolean>>
}

function ItemAdding({ setIsAddingItemModal }: ItemAdding) {
   const [itemData, setItemData] = useState<Partial<Item>>({});

   function handleSubmit(e: React.FormEvent) {
      e.preventDefault();
      setIsAddingItemModal(false);
   }

   function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      const { name, value } = e.currentTarget;

      setItemData(prevValue => {
         return {
            ...prevValue,
            [name]: value,
         }
      });
   }

   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
         <div className="bg-white p-5 rounded-xl w-[300px] shadow-lg">
            <div className="w-[100%] flex flex-col justify-center items-center">

               <form className="enter-form" onSubmit={(e) => handleSubmit(e)}>
                  <div className="form-inputs">
                     <input type="text" name="title" placeholder="Title" className="input" onChange={(e) => handleChange(e)} value={ itemData.title }/>
                     <input type="text" name="description" placeholder="Description" className="input" onChange={(e) => handleChange(e)} value={ itemData.description }/>
                     <input type="text" name="price" placeholder="Price" className="input" onChange={(e) => handleChange(e)} value={ itemData.price }/>
                  </div>
                  <button type="submit" className="enter-btn">Add</button>
               </form>
            </div>
         </div>
      </div>
   );
}

export default ItemAdding;