import { useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navigation from "./main_components/Navigation";
import ListItems from "./main_components/ListItems";

function Main() {
   const [count, setCount] = useState(0);

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
         <Navigation />
         <ListItems />
      </>
   );
}

export default Main;