import { useState } from "react";
import { BsFillGeoAltFill, BsCalendar4Event, BsPersonCircle, BsSearch } from "react-icons/bs";
import type { Item, RequestData } from "../../interfaces";
import axios from "axios";
import { fetchAllItems } from "../../fetchAll";

interface NavigationProps {
   myId: number,
   showModal: (title: string, text: string, isOk: boolean, navigateTo: string) => void,
   setAllItems: (allItems: Item[]) => void
}

function Navigation({ myId, showModal, setAllItems }: NavigationProps) {
   const [startDate, setStartDate] = useState("");
   const [endDate, setEndDate] = useState("");
   const [location, setLocation] = useState("");
   const [itemName, setItemName] = useState("");
   const [showProfileChange, setShowProfileChange] = useState<boolean>(false);

   async function handleLogout() {
      const response = await axios.post("http://localhost:3000/logout", {}, { withCredentials: true });
      if (response.status === 200) {
         showModal("Success!", "You successfully logged out!", true, "/");
      }
   }

   async function showProfile() {

   }

   async function handleSearch() {
      console.log(startDate, endDate, location, itemName);
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
         <div className="border-b border-gray-400 flex items-center justify-between py-5 px-10">
            <h1 className="text-3xl font-bold">Share<span className="text-[#00C9A7]">It</span></h1>

            <div className="flex items-center gap-4">
               <button className="bg-[#00C9A7] text-white rounded-2xl font-bold shadow px-4 py-2 cursor-pointer hover:bg-[#00A88D]">Add a new item</button>

               <div className="relative">
                  <BsPersonCircle size={30} className="cursor-pointer" onMouseEnter={() => setShowProfileChange(prevValue => !prevValue)} />

                  {showProfileChange && (
                     <div className="absolute top-full right-0 mt-2 border p-2 rounded-2xl bg-white shadow w-[90px]">
                        <ul className="divide-y divide-gray-400">
                           <li className="cursor-pointer py-1" onClick={() => showProfile()}>My Profile</li>
                           <li className="cursor-pointer py-1" onClick={() => handleLogout()}>Log out</li>
                        </ul>
                     </div>
                  )}
               </div>
            </div>
         </div>

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

export default Navigation;