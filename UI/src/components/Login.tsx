import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebookF } from 'react-icons/fa';
import type { RegistrationLoginProps } from "./interfaces.ts";
import axios from "axios";

function Login({ showModal }: RegistrationLoginProps) {
   const [enterData, setEnterData] = useState({
      email: "",
      password: ""
   });
   
   const navigate = useNavigate();

   async function fetchMe() {
      try {
         const response = await axios.get("http://localhost:3000/me", { withCredentials: true });
         if (response.status === 200 && response.data?.user) {
            navigate("/main");
         }
      } catch (err: any) {
         return;
      }
   }
   
   useEffect(() => {
      fetchMe();
   }, []);

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
            const status = err.response?.status;
            const msg = err.response?.data?.message || err.message || 'Network error';

            if (status === 401) {
               showModal('Warning!', 'Invalid email or password', false, '/');
            } else if (status === 409) {
               showModal('Warning!', 'Email already exists', false, '/');
            } else if (status === 500) {
               showModal('Warning!', 'Server error. Please try later.', false, '/');
            } else {
               showModal('Warning!', msg, false, '/');
            }
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

         <div className="alternative-enter">
            <div>
               <a href="http://localhost:3000/auth/google">
                  <FaGoogle className="alternative-enter-img" />
               </a>
            </div>

            <div>
               <FaFacebookF className="alternative-enter-img" />
            </div>
         </div>
      </div>
   );
}

export default Login;