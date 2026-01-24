import { useState } from "react";
import { FaGoogle, FaFacebookF } from 'react-icons/fa'

function Login() {
   const [count, setCount] = useState(0);

   return (
      <div className="enter-section">
         <form className="enter-form">
            <div className="form-inputs">
               <input type="email" name="email" placeholder="Email" className="input"/>
               <input type="password" name="password" placeholder="Password" className="input"/>
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