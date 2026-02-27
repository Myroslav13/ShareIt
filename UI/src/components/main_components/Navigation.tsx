import { BsPersonCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

interface NavigationProps {
   showModal: (title: string, text: string, isOk: boolean, navigateTo: string) => void,
   setIsAddingItemModal: (isAddingItemModal: boolean) => void
}

function Navigation({ setIsAddingItemModal }: NavigationProps) {
   const navigate = useNavigate();

   async function showProfile() {
      navigate("/profile");
   }

   async function handleItemAdding() {
      setIsAddingItemModal(true);
   }

   return (
      <>
         <div className="border-b border-gray-400 flex items-center justify-between py-5 px-10">
            <h1 className="text-3xl font-bold cursor-pointer" onClick={() => navigate("/main")}>Share<span className="text-[#00C9A7]">It</span></h1>

            <div className="flex items-center gap-4">
               <button className="bg-[#00C9A7] text-white rounded-2xl font-bold shadow px-4 py-2 cursor-pointer hover:bg-[#00A88D]" onClick={() => handleItemAdding()}>Add a new item</button>

               <div className="relative">
                  <BsPersonCircle size={30} className="cursor-pointer" onClick={() => showProfile()} />
               </div>
            </div>
         </div>
      </>
   );
}

export default Navigation;