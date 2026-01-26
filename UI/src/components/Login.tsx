import { useState } from "react";
import type { RegistrationLoginProps } from "./interfaces.ts";
import axios from "axios";

function Login({ showModal }: RegistrationLoginProps) {
   const [enterData, setEnterData] = useState({
      email: "",
      password: ""
   });

   function handleChange(e: any) {
      const { name, value } = e.target;

      setEnterData(prevData => ({
         ...prevData,
         [name]: value,
      }));
   }

   async function handleSubmit(e: React.FormEvent) {
      e.preventDefault();

      if (enterData.email === "" || enterData.password === "") {
         showModal("Warning!", "At least one of the required fields is blank!", false, "/");
      } else {
         try{
            const response = await axios.post(
               "http://localhost:3000/login",
               { email: enterData.email, password: enterData.password },
               { withCredentials: true }
            );

            const msg = response.data?.message;
            showModal("Success!", msg, true, "/main");
         } catch (err: any) {
            const msg = err.response?.data?.message;
            showModal('Warning!', msg, false, '/');
         }
      }
   }
 
   return (
      <div className="enter-section">
         <form className="enter-form" onSubmit={(e) => handleSubmit(e)}>
            <div className="form-inputs">
               <input type="email" name="email" placeholder="Email" className="input" onChange={(e) => handleChange(e)} value={enterData.email}/>
               <input type="password" name="password" placeholder="Password" className="input" onChange={(e) => handleChange(e)} value={enterData.password}/>
            </div>

            <p className="text-xs lg:text-sm mt-2 text-right w-[100%] cursor-pointer">Forgot your password?</p>
            <button type="submit" className="enter-btn">Login</button>
         </form>

         <p className="text-center text-xs lg:text-sm mt-3">Or login via</p>
      </div>
   );
}

export default Login;