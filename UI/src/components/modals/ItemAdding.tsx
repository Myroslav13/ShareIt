import { useState } from "react";
import type { Item } from "../../interfaces";
import axios from "axios";

interface ItemAdding {
   myId: number,
   showModal: (title: string, text: string, isOk: boolean, navigateTo: string) => void,
   setIsAddingItemModal: React.Dispatch<React.SetStateAction<boolean>>
}

function ItemAdding({ myId, showModal, setIsAddingItemModal }: ItemAdding) {
   const [itemData, setItemData] = useState<Partial<Item>>({
      owner_id: 0,
      price: "",
      title: "",
      description: "",
   });

   async function handleSubmit(e: React.FormEvent) {
      e.preventDefault();

      if (itemData.title && itemData.description && itemData.price) {
         const ownerId = myId;

         const response = await axios.post(
            "http://localhost:3500/item",
            { owner_id: ownerId, title: itemData.title, description: itemData.description, price: itemData.price },
            { withCredentials: true }
         );

         if (response.status === 200) {
            showModal("Success!", "You successfully added the new item", true, "/main");
         } else {
            const msg = response.data?.message;
            showModal("Warning!", msg, false, "/main");
         }
      } else {
         showModal("Warning!", "At least one of the required fields is blank!", false, "/main");
      }

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
      <div className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none">
         <div className="bg-white p-5 rounded-xl w-[400px] shadow-lg pointer-events-auto">
            <div className="w-[100%] flex flex-col justify-center items-center">
               <form className="enter-form" onSubmit={(e) => handleSubmit(e)}>
                  <div className="form-inputs">
                     <h1 className="text-2xl text-center font-bold">Item adding</h1>
                     <input type="text" name="title" placeholder="Title" className="input" onChange={(e) => handleChange(e)} value={ itemData.title }/>
                     <input type="text" name="description" placeholder="Description" className="input" onChange={(e) => handleChange(e)} value={ itemData.description }/>
                     <input type="number" step="1" min="0" name="price" placeholder="Price" className="input" onChange={(e) => handleChange(e)} value={ itemData.price }/>
                  </div>
                  <button type="submit" className="enter-btn">Add</button>
               </form>
            </div>
         </div>
      </div>
   );
}

export default ItemAdding;