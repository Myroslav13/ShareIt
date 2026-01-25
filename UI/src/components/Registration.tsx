import { useState } from "react";
import { FaGoogle, FaFacebookF } from 'react-icons/fa';
import type { RegistrationLoginProps } from "./interfaces.ts";
import axios from "axios";

function Registration({setShowModal, setModalData}: RegistrationLoginProps) {
   const [enterData, setEnterData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      password: ""
   });
   const [repeatPassword, setRepeatPassword] = useState<string>("");

   function handleChange(e: any) {
      const { name, value } = e.target;

      setEnterData(prevData => ({
         ...prevData,
         [name]: value,
      }));
   }

   async function handleSubmit(e: any) {
      e.preventDefault();

      if (enterData.password !== repeatPassword) {
         setShowModal(true);
         setModalData({
            title: "Warning!",
            text: "Your passwords don't match!",
            isOk: false,
            navigateTo: "/main"
         });
      }  else if (enterData.firstName === "" || enterData.lastName === "" || enterData.email === "" || enterData.password === "") {
         setShowModal(true);
         setModalData({
            title: "Warning!",
            text: "At least one of the required fields is blank!",
            isOk: false,
            navigateTo: "/"
         });
      } else {
         try{
            const response = await axios.post(
               "http://localhost:3000/register",
               { firstName: enterData.firstName, lastName: enterData.lastName, email: enterData.email, password: enterData.password },
               { withCredentials: true }
            );

            const msg = response.data?.message;
            setShowModal(true);
            setModalData({
               title: "Success!",
               text: msg,
               isOk: true,
               navigateTo: "/main"
            });
         } catch (err: any) {
            const errMsg = err.response?.data?.message;
            setShowModal(true);
            setModalData({
               title: "Warning!",
               text: errMsg,
               isOk: false,
               navigateTo: "/"
            });
         }
      }
   }

   return (
      <>
         <div className="enter-section">
            <form className="enter-form" onSubmit={(e) => handleSubmit(e)}>
               <div className="form-inputs">
                  <input name="firstName" placeholder="First name" className="input" onChange={(e) => handleChange(e)} value={enterData.firstName} />
                  <input name="lastName" placeholder="Last name" className="input" onChange={(e) => handleChange(e)} value={enterData.lastName} />

                  <input type="email" name="email" placeholder="Email" className="input" onChange={(e) => handleChange(e)} value={enterData.email} />
                  <input type="password" name="password" placeholder="Password" className="input" onChange={(e) => handleChange(e)} value={enterData.password} />
                  <input type="password" name="password-repeat" placeholder="Repeat password" className="input" onChange={(e) => setRepeatPassword(e.target.value)} value={repeatPassword} />
               </div>

               <button type="submit" className="enter-btn">Register</button>
            </form>

            <p className="text-center text-xs lg:text-sm mt-3">Or register via</p>

            <div className="alternative-enter">
               <div>
                  <FaGoogle className="alternative-enter-img" />
               </div>

               <div>
                  <FaFacebookF className="alternative-enter-img" />
               </div>
            </div>
         </div>
      </>
   );
}

export default Registration;