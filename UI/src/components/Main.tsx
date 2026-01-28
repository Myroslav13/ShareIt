import { useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navigation from "./main_components/Navigation";
import ListItems from "./main_components/ListItems";
import ShortInfo from "./modals/ShortInfo";

function Main() {
   const [isShowModal, setIsShowModal] = useState<boolean>(false);
   const [modalData, setModalData] = useState({
      title: "",
      text: "",
      isOk: true,
      navigateTo: "/"
   });

   function showModal(title: string, text: string, isOk: boolean, navigateTo: string) {
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
         if (response.status === 200 && response.data?.user){
            return;
         }

         navigate("/");
      } catch (err: any) {
         navigate("/");
      }
   }

   useEffect(() => {
      fetchMe();
   }, []);

   return (
      <>
         <Navigation showModal={ showModal } />
         <ListItems />
         {isShowModal && <div className="black-background" />}
         {isShowModal && 
            <ShortInfo title={modalData.title} text={modalData.text} isOk={modalData.isOk} navigateTo={modalData.navigateTo} setIsShowModal={setIsShowModal}/>
         }
      </>
   );
}

export default Main;