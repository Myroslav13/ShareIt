import Navigation from "./main_components/Navigation";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ModalContext } from "../App";
import { useNavigate } from "react-router-dom";
import ProfileControl from "./profile_components/ProfileControl";
import type { UserData } from "../interfaces";

function Profile() {
   const { showModal, setIsAddingItemModal } = useContext(ModalContext)!;
   const [profileMode, setProfileMode] = useState<0 | 1>(0);
   const [userData, setUserData] = useState<UserData>({
      firstName: "",
      lastName: "",
      email: "",
      location: "",
   });
   const [enterData, setEnterData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      password: ""
   });
   
   const navigate = useNavigate();

   useEffect(() => {
      async function fetchUserData() {
         try {
            const response = await axios.get("http://localhost:3000/me", { withCredentials: true });
            const { first_name, last_name, email, location } = response.data.user;
            console.log(response.data.user);
            setUserData({ firstName: first_name, lastName: last_name, email, location });
            setEnterData({ firstName: first_name, lastName: last_name, email, password: "" });
         } catch (err) {
            console.error("Error fetching user data:", err);
         } 
      }

      fetchUserData();
   }, []);

   function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      const { name, value } = e.currentTarget;

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

      }
   }

   async function handleLogout() {
      const response = await axios.post("http://localhost:3000/logout", {}, { withCredentials: true });
      if (response.status === 200) {
         showModal("Success!", "You successfully logged out!", true, "/");
         navigate("/");
      }
   }

   return (
      <>
         <Navigation showModal={ showModal } setIsAddingItemModal={ setIsAddingItemModal }/>

         <div className="flex w-[100%] justify-center">
            <div className="flex gap-4 w-[70%] justify-center">
               <ProfileControl setProfileMode={setProfileMode} userData={userData} profileMode={profileMode} handleLogout={handleLogout}></ProfileControl>
               
               { profileMode === 0 ? 
                  <div className="w-3/4 shadow-lg rounded-xl mx-auto mt-10 py-5 px-10">
                     <div className="enter-section">
                        <form className="enter-form" onSubmit={(e) => handleSubmit(e)}>
                           <div className="form-inputs">
                              <input name="firstName" placeholder="First name" className="input" onChange={(e) => handleChange(e)} value={enterData.firstName} />
                              <input name="lastName" placeholder="Last name" className="input" onChange={(e) => handleChange(e)} value={enterData.lastName} />

                              <input type="email" name="email" placeholder="Email" className="input" onChange={(e) => handleChange(e)} value={enterData.email} />
                              <input type="password" name="password" placeholder="Password" className="input" onChange={(e) => handleChange(e)} value={enterData.password} />
                           </div>

                           <button type="submit" className="enter-btn">Change</button>
                        </form>
                     </div>
                  </div>
                  :
                  <div>
                     {

                     }
                  </div>
               }
            </div>
         </div>
      </>
   );
}

export default Profile;