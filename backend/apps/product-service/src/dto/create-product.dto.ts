export class CreateProductDTO {
   owner_id: number;
   category_id: number;
   location_id: number;
   title: string;
   description: string;
   price_per_day: number;
   available_from: Date;
   available_to: Date;
}