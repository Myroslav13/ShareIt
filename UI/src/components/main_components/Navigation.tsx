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
         <div className="border-b flex items-center justify-between p-5">
            <h1 className="text-2xl font-bold">ShareIt</h1>

            <div className="flex items-center gap-4">
               <button className="">Rent out</button>
               <BsPersonCircle />
            </div>
         </div>

         <div className="flex w-[100%] items-stretch items-center justify-center mt-4">
            <div className="flex w-[60%] p-4 items-center justify-between border-1 rounded-2xl divide-x divide-black">
               <div className="flex-1 flex items-center gap-4 px-4">
                  <BsSearch />
                  <input
                     value={itemName}
                     onChange={(e) => setItemName(e.target.value)}
                     placeholder="Enter an item"
                     className="input w-full"
                  />
               </div>
               <div className="flex-1 flex items-center gap-4 px-4">
                  <BsCalendar4Event />
                  <input
                     type="date"
                     value={date}
                     onChange={(e) => setDate(e.target.value)}
                     className="input w-full"
                  />
               </div>

               <div className="flex-1 flex items-center gap-4 px-4">
                  <BsFillGeoAltFill />
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
            <button className="ml-2 bg-[#00C9A7] text-white rounded-full flex items-center justify-center w-[75px] cursor-pointer">
               <BsSearch />
            </button>
         </div>
      </>
   );
}

export default Navigation;