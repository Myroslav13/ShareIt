import { useNavigate } from "react-router-dom";
import { useState, useEffect} from "react";
import { BsPersonCircle } from "react-icons/bs";
import { BsFillGeoAltFill } from "react-icons/bs";
import { BsCalendar4Event } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";

function Navigation() {
   const [date, setDate] = useState("");
   const [location, setLocation] = useState("");
   const [itemName, setItemName] = useState("");
   const navigate = useNavigate();

   function handleLogout() {
      navigate("/");
   }

   return (
      <>
         <div className="border-b border-gray-400 flex items-center justify-between p-5">
            <h1 className="text-3xl font-bold">Share<span className="text-[#00C9A7]">It</span></h1>

            <div className="flex items-center gap-4">
               <button className="bg-[#00C9A7] text-white rounded-2xl font-bold shadow px-4 py-2 cursor-pointer hover:bg-[#00A88D]">Rent out</button>
               <BsPersonCircle size={30} className="cursor-pointer" />
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
                     value={date}
                     onChange={(e) => setDate(e.target.value)}
                     className="input w-full"
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
            <button className="ml-2 bg-[#00C9A7] text-white rounded-full flex items-center justify-center w-[75px] cursor-pointer hover:bg-[#00A88D]">
               <BsSearch size={20} />
            </button>
         </div>
      </>
   );
}

export default Navigation;