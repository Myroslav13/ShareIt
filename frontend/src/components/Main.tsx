import { useState, useEffect, useContext} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navigation from "./main_components/Navigation";
import ListItems from "./main_components/ListItems";
import ShortInfo from "./modals/ShortInfo";
import type { Item } from "../interfaces";
import { fetchAllItems } from "../fetchAll";
import ItemAdding from "./modals/ItemAdding";
import Search from "./main_components/Search";
import { ModalContext } from "../App";

function Main() {
   const [allItems, setAllItems] = useState<Item[]>([]);
   const [myId, setMyId] = useState<number>(0);
   const navigate = useNavigate();
   const { isShowModal, setIsShowModal, isAddingItemModal, setIsAddingItemModal, modalData, showModal } = useContext(ModalContext)!;

   async function fetchMe() {
      try {
         const response = await axios.get("http://localhost:3000/me", { withCredentials: true });
         if (response.status === 200 && response.data?.user){
            const data = response.data;
            const id = data.user.id;
            setMyId(id);
            return id;
         }

         navigate("/");
      } catch (err: any) {
         navigate("/");
      }
   }

   useEffect(() => {
      (async () => {
         const id = await fetchMe();
         try {
            const items = await fetchAllItems({page: 1, limit: 10, excludeOwnerId: id});
            if (Array.isArray(items)) setAllItems(items);
            else if (items?.items) setAllItems(items.items);
         } catch (err) {
            console.error("Failed to fetch items", err);
         }
      })();
   }, []);

   return (
      <>
         <Navigation showModal={ showModal } setIsAddingItemModal={ setIsAddingItemModal } />
         <Search myId={ myId } setAllItems={ setAllItems } showModal={ showModal } />
         <ListItems allItems={ allItems } />
         {(isShowModal || isAddingItemModal) && (
            <div className="black-background z-30" onClick={() => { setIsAddingItemModal(false); setIsShowModal(false); }} />
         )}
         {isShowModal && 
            <ShortInfo modalData={ modalData } setIsShowModal={ setIsShowModal } />
         }
         {isAddingItemModal && 
            <ItemAdding myId={ myId } showModal={ showModal } setIsAddingItemModal={ setIsAddingItemModal } />
         }
      </>
   );
}

export default Main;