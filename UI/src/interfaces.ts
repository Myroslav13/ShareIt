export interface RegistrationLoginProps {
   showModal: (title: string, text: string, isOk: boolean, navigateTo: string) => void;
}

export interface Item {
   id: number,
   owner_id: number,
   price: number,
   title: string,
   description: string,
   created_at: string
}

export interface ModalData {
   title: string,
   text: string,
   isOk: boolean,
   navigateTo: string
}

export interface RequestData {
   ownerId: number,
   excludeOwnerId: number,
   page: number,
   limit: number,
   offset: number,
   location: string,
   startDate: string,
   endDate: string,
   title: string,
}