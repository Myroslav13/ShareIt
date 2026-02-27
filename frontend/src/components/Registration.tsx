import { useState } from "react";
import type { RegistrationLoginProps } from "../interfaces.ts";
import axios from "axios";

function Registration({ showModal }: RegistrationLoginProps) {
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
         showModal("Warning!", "Your passwords don't match!", false, "/");
      } else if (enterData.firstName === "" || enterData.lastName === "" || enterData.email === "" || enterData.password === "") {
         showModal("Warning!", "At least one of the required fields is blank!", false, "/");
      } else if (enterData.password.length < 6 ) {
         showModal("Warning!", "Your password is too small. It should contain 6 or more symbols", false, "/");
      } else {
         try{
            const response = await axios.post(
               "http://localhost:3000/register",
               { firstName: enterData.firstName, lastName: enterData.lastName, email: enterData.email, password: enterData.password },
               { withCredentials: true }
            );

            const msg = response.data?.message;
            showModal("Success!", msg, true, "/main");
         } catch (err: any) {
            const errMsg = err.response?.data?.message;
            showModal("Warning!", errMsg, false, "/");
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
         </div>
      </>
   );
}

export default Registration;