import { BrowserRouter, Routes, Route } from "react-router-dom";
import Enter from "./components/Enter";
import Main from "./components/Main";
import Profile from "./components/Profile";
import React, { useState, createContext } from "react";
import type { ModalData } from "./interfaces";

export interface ModalContextType {
   isShowModal: boolean;
   setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>;
   isAddingItemModal: boolean;
   setIsAddingItemModal: React.Dispatch<React.SetStateAction<boolean>>;
   modalData: ModalData;
   setModalData: React.Dispatch<React.SetStateAction<ModalData>>;
   showModal: (title: string, text: string, isOk: boolean, navigateTo: string) => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined);

function App() {
   const [isShowModal, setIsShowModal] = useState<boolean>(false);
   const [isAddingItemModal, setIsAddingItemModal] = useState<boolean>(false);
   const [modalData, setModalData] = useState<ModalData>({
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

   const contextValue: ModalContextType = {
      isShowModal,
      setIsShowModal,
      isAddingItemModal,
      setIsAddingItemModal,
      modalData,
      setModalData,
      showModal,
   };

   return (
      <ModalContext.Provider value={contextValue}>
         <BrowserRouter>
            <Routes>
               <Route path="/" element={ <Enter /> }/>
               <Route path="/enter" element={ <Enter /> }/>
               <Route path="/main" element={ <Main /> }/>
               <Route path="/profile" element={ <Profile /> }/>
            </Routes>
         </BrowserRouter>
      </ModalContext.Provider>
   );
}

export default App;
