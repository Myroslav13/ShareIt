import type { UserData } from "../../interfaces";

interface ProfileControlProps {
   setProfileMode: React.Dispatch<React.SetStateAction<0 | 1>>,
   userData: UserData,
   profileMode: 0 | 1,
   handleLogout: () => void
}

function ProfileControl({ setProfileMode, userData, profileMode, handleLogout }: ProfileControlProps) {
   return (
      <div className="w-1/4 flex flex-col shadow-lg rounded-xl mx-auto mt-10 py-5 px-10">
         <h1 className="text-3xl font-bold text-center mt-10">Profile</h1>
         <h2 className="text-center pt-2">{userData.firstName} {userData.lastName}</h2>
         <h3 className="text-center text-gray-600">{userData.location}</h3>
         
         <div className="flex flex-col gap-2 mt-6">
            <button className={`${ profileMode === 0 ? "bg-[#00C9A7] text-white hover:bg-[#00A88D]" : "text-gray-600" } py-2 px-4 rounded cursor-pointer`} onClick={() => setProfileMode(0)}>Personal data</button>
            <button className={`${ profileMode === 1 ? "bg-[#00C9A7] text-white hover:bg-[#00A88D]" : "text-gray-600" } py-2 px-4 rounded cursor-pointer`} onClick={() => setProfileMode(1)}>My items</button>
            <button className="cursor-pointer" onClick={() => handleLogout()}>Logout</button>
         </div>
      </div>
   )
}

export default ProfileControl;