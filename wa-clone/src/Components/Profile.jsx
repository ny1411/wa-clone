import { ArrowLeft, LogOut } from "lucide-react";
import React from "react";
import { useAuth } from "./AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

function Profile(props) {
	const { userData } = useAuth();

	const navigate = useNavigate();

	function handleSignOut() {
		localStorage.removeItem("user");
		navigate("/login");
	}

	return (
		<>
			<div
				className="
			 bg-[#222] text-white 
			 flex gap-8 p-4 
			 rounded-tl-xl"
			>
				<button className="cursor-pointer" onClick={props.onBack}>
					<ArrowLeft />
				</button>
				<div className="text-xl">Profile</div>
			</div>
			<div className="flex flex-col align-center justify-center">
				<div
					className="
					profile-pic-container
					w-[25rem] h-[25rem] 
					flex items-center justify-center
		  			mb-4 mx-auto"
				>
					<img
						src={userData.profile_pic}
						alt=""
						className="profile-pic w-[12rem] h-[12rem]
						drop-shadow-2xl rounded-full border-2 border-[#25d366]
						cursor-pointer"
					/>
				</div>
				<div
					onClick={handleSignOut}
					className="flex items-center justify-center"
				>
					<button
						className="sign-out-button text-[1.5rem] 
					flex items-center justify-between 
					font-semibold bg-white p-[1rem] 
					drop-shadow-md hover:drop-shadow-2xl 
					transition-drop-shadow duration-300 ease-in-out 
					cursor-pointer rounded-xl mt-[2rem] "
					>
						Sign Out <LogOut className="ml-2" />
					</button>
				</div>
			</div>
		</>
	);
}

export default Profile;
