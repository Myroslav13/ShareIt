export type ModalData = { 
   title: string; 
   text: string; 
   isOk: boolean,
   navigateTo: string
};

export interface RegistrationLoginProps {
   setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
   setModalData: React.Dispatch<React.SetStateAction<ModalData>>;
}