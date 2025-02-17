import { collection, getDocs } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import {
	ArrowLeft,
	CircleFadingPlus,
	MessageSquare,
	Moon,
	Settings,
	Sun,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";
import UserCard from "./UserCard";

function ChatPanel() {
	const [users, setUsers] = useState();
	const [isLoading, setLoading] = useState(true);
	const [showProfile, setShowProfile] = useState(false);

	useEffect(() => {
		const getUsers = async () => {
			//get data from collection 'users'
			const data = await getDocs(collection(db, "users"));

			// console.log(data.docs.length);
			// console.log(data.docs);

			// map data of user and return it
			const userDataArray = data.docs.map((docs) => {
				return { data: docs.data(), id: docs.id };
			});

			// set users in an array in users in useState (line 6)
			setUsers(userDataArray);

			setLoading(false);
			// console.log("user data : ", userDataArray);
		};

		getUsers();
	}, []);

	// const navigate = useNavigate();
	// const handleProfile = () => {
	// 	navigate("/profile");
	// };

	const onBack = () => {
		setShowProfile(false);
	};

	const navigate = useNavigate();

	const handleOpenChat = (userID) => {
		// console.log("Opening Chat:", userID);
		navigate(userID, "/");
	};

	if (showProfile) {
		return <Profile onBack={onBack} />;
	}

	return (
		<>
			{/* <div>Chat Panel</div> */}

			<div
				className="
				top h-16 flex 
				items-center justify-between
		  		bg-[#222] 
		  		px-4 mb-4 rounded-tl-xl"
			>
				<img
					className="profile-pic w-12 h-12
		  					drop-shadow-2xl rounded-full
		  					border-2 border-[#25d366]
		  					cursor-pointer"
					// onClick={handleProfile}
					onClick={() => {
						setShowProfile(true);
					}}
					src="https:cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
				></img>
				<div className="options-container flex items-center justify-end gap-4">
					<div className="mode-switcher">
						<Moon className="dark-mode-icon hidden text-[#25d366] cursor-pointer" />
						<Sun className="light-mode-icon  text-[#25d366] cursor-pointer" />
					</div>
					<CircleFadingPlus className="status-icon text-[#25d366] cursor-pointer" />
					<MessageSquare className="messages-icon text-[#25d366] cursor-pointer" />
					<Settings className="settings-icon text-[#25d366] cursor-pointer" />
				</div>
			</div>
			<div className="bottom text-white">
				{isLoading ? (
					<div>Loading...</div>
				) : (
					<div className="">
						{users.map((userObj) => (
							<UserCard userObj={userObj} />
						))}
					</div>
				)}
			</div>
		</>
	);
}

export default ChatPanel;
