import { BsExclamationTriangle } from "react-icons/bs";
import { BsCheckCircle } from "react-icons/bs";

interface ShortInfoProps {
   title: string,
   text: string,
   isOk: boolean,
   setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

function ShortInfo({title, text, isOk, setShowModal} : ShortInfoProps) {
   return (
      <div className="absolute inset-inline-0 bg-white p-5 rounded-xl z-90 w-[300px]">
         <div className="w-[95%] flex flex-col justify-center items-center">
            {isOk ? <BsCheckCircle className="modal-img text-green-500"/> : <BsExclamationTriangle className="modal-img text-yellow-500" />}
            <h1 className="text-[#1E2A38] text-lg font-bold mt-2">{title}</h1>
            <p className="text-center mt-2">{text}</p>
            {isOk ? 
            <button className="bg-[#00C9A7] text-white modal-btn" onClick={() => setShowModal(false)}>Great</button> 
            : 
            <button className="border-3 border-gray-500 text-gray-500 modal-btn" onClick={() => setShowModal(false)}>Close</button>}
         </div>
      </div>
   );
}

export default ShortInfo;