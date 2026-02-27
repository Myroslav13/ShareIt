import { useState } from "react";
import type { Item, RequestData } from "../../interfaces";
import { fetchAllItems } from "../../fetchAll";
import { BsFillGeoAltFill, BsCalendar4Event, BsSearch } from "react-icons/bs";

interface ProfileProps {
   myId: number,
   setAllItems: (allItems: Item[]) => void,
   showModal: (title: string, text: string, isOk: boolean, navigateTo: string) => void,
}

function Search({ myId, setAllItems, showModal }: ProfileProps) {
   const [startDate, setStartDate] = useState("");
   const [endDate, setEndDate] = useState("");
   const [location, setLocation] = useState("");
   const [itemName, setItemName] = useState("");

   async function handleSearch() {
      const requestData: Partial<RequestData> = { page: 1, limit: 10, excludeOwnerId: myId };
      if (itemName.trim() !== "") requestData.title = itemName.trim();
      if (location.trim() !== "") requestData.location = location.trim();
      if (startDate !== "") requestData.startDate = startDate;
      if (endDate !== "") requestData.endDate = endDate;

      try {
         const res = await fetchAllItems(requestData);
         if (Array.isArray(res)) {
            setAllItems(res);
         } else if (res?.items && Array.isArray(res.items)) {
            setAllItems(res.items);
         } else if (res?.data && Array.isArray(res.data)) {
            setAllItems(res.data);
         } else {
            setAllItems([]);
         }
      } catch (err: any) {
         showModal("Warning", "Failed to search items", false, "/");
      }
   }

   return (
      <>
         <div className="flex w-[100%] items-stretch items-center justify-center mt-4">
            <div className="flex w-[60%] p-4 items-center justify-between border-1 border-gray-400 rounded-2xl divide-x divide-gray-400">
               <div className="flex-1 flex items-center gap-4 px-4">
                  <BsSearch size={25} />
                  <input
                     value={itemName}
                     onChange={(e) => setItemName(e.target.value)}
                     placeholder="Enter an item"
                     className="input w-full"
                  />
               </div>
               <div className="flex-1 flex items-center gap-4 px-4">
                  <BsCalendar4Event size={25} />
                  <input
                     type="date"
                     value={startDate}
                     onChange={(e) => setStartDate(e.target.value)}
                     className="input w-1/2"
                  />
                  <span className="text-gray-500">—</span>
                  <input
                     type="date"
                     value={endDate}
                     onChange={(e) => setEndDate(e.target.value)}
                     className="input w-1/2"
                  />
               </div>

               <div className="flex-1 flex items-center gap-4 px-4">
                  <BsFillGeoAltFill size={25} />
                  <input
                     list="places"
                     value={location}
                     onChange={(e) => setLocation(e.target.value)}
                     placeholder="Enter location"
                     className="input w-full"
                  />

                  <datalist id="places">
                     <option value="Kyiv"/>
                     <option value="Lviv"/>
                     <option value="Odesa"/>
                     <option value="Kharkiv"/>
                  </datalist>
               </div>      
            </div>

            <button className="ml-2 bg-[#00C9A7] text-white rounded-full flex items-center justify-center w-[75px] cursor-pointer hover:bg-[#00A88D]" onClick={() => handleSearch()}>
               <BsSearch size={20} />
            </button>
         </div>
      </>
   );
}

export default Search;