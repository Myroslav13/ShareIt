import { useState } from "react";
import { FaGoogle, FaFacebookF } from 'react-icons/fa'

function Login() {
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

   function handleSubmit(e: any) {
      e.preventDefault();
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
               <FaGoogle className="w-5 h-5 cursor-pointer" />
            </div>

            <div>
               <FaFacebookF className="w-5 h-5 cursor-pointer" />
            </div>
         </div>
      </div>
   );
}

export default Login;