import { BsExclamationTriangle } from "react-icons/bs";
import { BsCheckCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

interface ShortInfoProps {
   title: string,
   text: string,
   isOk: boolean,
   navigateTo: string,
   setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

function ShortInfo({ title, text, isOk, navigateTo, setIsShowModal } : ShortInfoProps) {
   const navigate = useNavigate();

   function handleClose() {
      setIsShowModal(false);
      navigate(navigateTo);
   }

   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
         <div className="bg-white p-5 rounded-xl w-[300px] shadow-lg">
            <div className="w-[100%] flex flex-col justify-center items-center">
               {isOk ? 
                  <BsCheckCircle className="modal-img text-green-500" /> 
                  : 
                  <BsExclamationTriangle className="modal-img text-yellow-500" />
               }
               <h1 className="text-[#1E2A38] text-lg font-bold mt-2">{title}</h1>
               <p className="text-center mt-2">{text}</p>
               {isOk ? 
                  <button className="bg-[#00C9A7] text-white modal-btn" onClick={() => handleClose()}>Great</button> 
                  : 
                  <button className="border-3 border-gray-500 text-gray-500 modal-btn" onClick={() => handleClose()}>Close</button>
               }
            </div>
         </div>
      </div>
   );
}

export default ShortInfo;