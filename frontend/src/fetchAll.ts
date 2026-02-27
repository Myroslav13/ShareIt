import axios from "axios";
import type { RequestData } from "./interfaces";

export async function fetchAllItems(requestData: Partial<RequestData>) {
   const params = new URLSearchParams();
   params.set("page", String(requestData.page ?? 1));
   params.set("limit", String(requestData.limit ?? 10));
   if (requestData.excludeOwnerId)
      params.set("excludeOwnerId", String(requestData.excludeOwnerId));
   if (requestData.location) params.set("location", requestData.location);
   if (requestData.startDate) params.set("startDate", requestData.startDate);
   if (requestData.endDate) params.set("endDate", requestData.endDate);
   if (requestData.title) params.set("title", requestData.title);

   const url = `http://localhost:3500/item?${params.toString()}`;
   const res = await axios.get(url, { withCredentials: true });
   return res.data;
}