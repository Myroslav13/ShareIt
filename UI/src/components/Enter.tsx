import { useState } from "react";
import Login from "./Login";
import Registration from "./Registration";

function Enter() {
   const [enterMode, setEnterMode] = useState<0 | 1>(0);

   return (
      <div className="flex flex-col md:flex-row items-center justify-around min-h-screen">
         <img src="src/assets/share-it.png" title="ShareIt" alt="share-it" className="w-[55%] sm:w-[48%] md:w-[40%] 2xl:w-[35%]"/>
         <div className="shadow-md rounded-lg w-[55%] sm:w-[48%] md:w-[40%] 2xl:w-[35%] p-6 bg-white">
            <div className="flex">
               <div className={`${enterMode === 0 ? "border-[#00C9A7]" : "border-gray-200 text-gray-400"} enter-navigation-div`} onClick={() => setEnterMode(0)}>
                  <h2 className="pb-2">Login</h2>
               </div>
               
               <div className={`${enterMode === 1 ? "border-[#00C9A7]" : "border-gray-200 text-gray-400"} enter-navigation-div`} onClick={() => setEnterMode(1)}>
                  <h2 className="pb-2">Registration</h2>
               </div>
            </div>
            {enterMode === 0 ? <Login/> : <Registration/>}
         </div>
      </div>
   );
}

export default Enter;