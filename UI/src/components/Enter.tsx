import { useState, useEffect } from "react";
import Login from "./Login";
import Registration from "./Registration";
import ShortInfo from "./modals/ShortInfo";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaGoogle, FaFacebookF } from 'react-icons/fa';

function Enter() {
   const [enterMode, setEnterMode] = useState<0 | 1>(0);

   const [isShowModal, setIsShowModal] = useState<boolean>(false);
   const [modalData, setModalData] = useState({
      title: "",
      text: "",
      isOk: true,
      navigateTo: "/"
   });

   function showModal (title: string, text: string, isOk: boolean, navigateTo: string) {
      setIsShowModal(true);
      setModalData({
         title: title,
         text: text,
         isOk: isOk,
         navigateTo: navigateTo
      });
   }

   const navigate = useNavigate();

   async function fetchMe() {
      try {
         const response = await axios.get("http://localhost:3000/me", { withCredentials: true });
         if (response.status === 200) {
            navigate("/main");
         }
      } catch (err: any) {
         return;
      }
   }
   
   useEffect(() => {
      fetchMe();
   }, []);

   return (
      <div className="flex flex-col md:flex-row items-center justify-around min-h-screen">
         <img src="src/assets/share-it.png" title="ShareIt" draggable={false} alt="share-it" className="w-[50%] sm:w-[40%] md:w-[45%] xl:w-[40%] 2xl:w-[35%]"/>
         <div className="shadow-md rounded-lg w-[50%] sm:w-[42%] md:w-[40%] 2xl:w-[35%] p-6 bg-white">
            <div className="flex">
               <div className={`${enterMode === 0 ? "border-[#00C9A7]" : "border-gray-200 text-gray-400"} enter-navigation-div`} onClick={() => setEnterMode(0)}>
                  <h2 className="pb-2">Login</h2>
               </div>
               
               <div className={`${enterMode === 1 ? "border-[#00C9A7]" : "border-gray-200 text-gray-400"} enter-navigation-div`} onClick={() => setEnterMode(1)}>
                  <h2 className="pb-2">Registration</h2>
               </div>
            </div>

            {enterMode === 0 ? <Login showModal={showModal} /> : <Registration showModal={showModal} />}
            
            <div className="alternative-enter">
               <div>
                  <a href="http://localhost:3000/auth/google">
                     <FaGoogle className="alternative-enter-img" />
                  </a>
               </div>

               <div>
                  <FaFacebookF className="alternative-enter-img" />
               </div>
            </div>
         </div>

         {isShowModal && <div className="black-background" />}
         {isShowModal && 
            <ShortInfo title={modalData.title} text={modalData.text} isOk={modalData.isOk} navigateTo={modalData.navigateTo} setIsShowModal={setIsShowModal}/>
         }
      </div>
   );
}

export default Enter;