export class CreateUserDTO {
   first_name: string;
   last_name: string;
   email: string;
   password_hash: string;
   role_id?: number;
   location_id?: number;
};