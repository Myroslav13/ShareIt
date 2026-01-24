import { useState } from "react";
import { FaGoogle, FaFacebookF } from 'react-icons/fa';

type ModalData = { title: string; text: string; isOk: boolean };

interface RegistrationProps {
   setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
   setModalData: React.Dispatch<React.SetStateAction<ModalData>>;
}

function Registration({setShowModal, setModalData}: RegistrationProps) {
   const [enterData, setEnterData] = useState({
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

   function handleSubmit(e: any) {
      e.preventDefault();

      if (enterData.password !== repeatPassword) {
         setShowModal(true);
         setModalData({
            title: "Warning!",
            text: "Your passwords don't match!",
            isOk: false
         });
      }  else if (enterData.email === "" || enterData.password === "") {
         setShowModal(true);
         setModalData({
            title: "Warning!",
            text: "At least one of the required fields is blank!",
            isOk: false
         });
      } else {
         setShowModal(true);
         setModalData({
            title: "Success!",
            text: "You successfully registered.",
            isOk: true
         });
      }
   }

   return (
      <>
         <div className="enter-section">
            <form className="enter-form" onSubmit={(e) => handleSubmit(e)}>
               <div className="form-inputs">
                  <input type="email" name="email" placeholder="Email" className="input" onChange={(e) => handleChange(e)} value={enterData.email} />
                  <input type="password" name="password" placeholder="Password" className="input" onChange={(e) => handleChange(e)} value={enterData.password} />
                  <input type="password" name="password-repeat" placeholder="Repeat password" className="input" onChange={(e) => setRepeatPassword(e.target.value)} value={repeatPassword} />
               </div>

               <button type="submit" className="enter-btn">Register</button>
            </form>

            <p className="text-center text-xs lg:text-sm mt-3">Or register via</p>
            <div className="flex justify-center gap-2 mt-1">
               <div>
                  <FaGoogle className="w-5 h-5 cursor-pointer" />
               </div>

               <div>
                  <FaFacebookF className="w-5 h-5 cursor-pointer" />
               </div>
            </div>
         </div>
      </>
   );
}

export default Registration;