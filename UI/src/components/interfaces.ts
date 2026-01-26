export type ModalData = { 
   title: string; 
   text: string; 
   isOk: boolean,
   navigateTo: string
};

export interface RegistrationLoginProps {
   showModal: (title: string, text: string, isOk: boolean, navigateTo: string) => void;
}