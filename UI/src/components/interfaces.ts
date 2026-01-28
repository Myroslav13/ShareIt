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