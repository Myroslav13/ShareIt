import { useState } from "react";
import { FaGoogle, FaFacebookF } from 'react-icons/fa';
import type { RegistrationLoginProps } from "./interfaces.ts";
import axios from "axios";

function Login({setShowModal, setModalData}: RegistrationLoginProps) {
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
         setShowModal(true);
         setModalData({
            title: "Warning!",
            text: "At least one of the required fields is blank!",
            isOk: false
         });
      } else {
         try{
            const response = await axios.post(
               "http://localhost:3000/login",
               { email: enterData.email, password: enterData.password },
               { withCredentials: true }
            );

            const msg = response.data?.message;
            setShowModal(true);
            setModalData({
               title: "Success!",
               text: msg,
               isOk: true
            });
         } catch (err: any) {
            const errMsg = err.response?.data?.message;
            setShowModal(true);
            setModalData({
               title: "Warning!",
               text: errMsg,
               isOk: false
            });
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

         <div className="flex justify-center gap-2 mt-1">
            <div>
               <FaGoogle className="alternative-enter-img" />
            </div>

            <div>
               <FaFacebookF className="alternative-enter-img" />
            </div>
         </div>
      </div>
   );
}

export default Login;