import { HiOutlineXCircle } from "react-icons/hi2";
import { HiOutlineCheckCircle } from "react-icons/hi2";

interface ShortInfoProps {
   title: string,
   text: string,
   isOk: boolean,
   setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

function ShortInfo({title, text, isOk, setShowModal} : ShortInfoProps) {
   return (
      <div className="absolute inset-inline-0 bg-white p-5 rounded-xl z-90">
         <div className="w-[95%] flex flex-col justify-center items-center">
            {isOk ? <HiOutlineXCircle/> : <HiOutlineCheckCircle/>}
            <h1 className="text-[#1E2A38] text-lg font-bold">{title}</h1>
            <p className="text-center mt-2">{text}</p>
            {isOk ? <button className="w-[100%] bg-[#00C9A7] text-white h-10 rounded-2xl font-bold mt-5 cursor-pointer" onClick={() => setShowModal(false)}>Great</button> : <button onClick={() => setShowModal(false)} className="w-[100%] border-3 border-gray-500 text-gray-500 h-10 rounded-2xl font-bold mt-5 cursor-pointer">Close</button>}
         </div>
      </div>
   );
}

export default ShortInfo;