import React from "react";
import {
	CircleFadingPlus,
	MessageSquare,
	Moon,
	Search,
	Settings,
	Sun,
} from "lucide-react";

import { storage } from "../../firebase";
import { ref, uploadBytesResumable } from "firebase/storage";
import ChatPanel from "./ChatPanel";
import Chat from "./Chat";
import Header from "./Header";

function Home() {
	const handleImageChange = (e) => {
		const image = e.target.files[0];

		// address
		const storageRef = ref(storage, "/profile" + Math.random());

		// upload
		const uploadTask = uploadBytesResumable(storageRef, image);

		// if uploading, uploaded, or error happens
		uploadTask.on("state_changed", progressCB, errorCB, finishedCB);

		// upload
		function progressCB(data) {
			console.log("data", data);
		}
		// if error
		function errorCB(err) {
			console.log("error", err);
		}
		// if success
		function finishedCB() {
			console.log("success");
		}
	};

	return (
		<>
			{/* <div>
				<input
					type="file"
					accept="image/png image/jpg image/jpeg image/webp"
					onChange={handleImageChange}
				/>
			</div> */}
			{/* 
			<div className="home-page h-screen w-screen bg-[#e9e9e9]">
				<div className="header bg-[#060606] h-[10rem] flex items-center justify-start"></div>
				<div
					className="main absolute top-[50%] left-[50%]
		  		translate-x-[-50%] translate-y-[-50%]
		  		w-[calc(100%-5rem)] h-[calc(100%-5rem)]
		  		shadow-black drop-shadow-xl rounded-xl
		  		flex bg-[#002B20]"
				>
					<div
						className="left h-full w-[25rem]
		  		bg-[#132a13] bg-gradient-to-r
		  		from-[#2a6e5d] to-[#002B20]
		  		rounded-bl-xl rounded-tl-xl"
					>
						<div
							className="top h-16 flex items-center justify-between
		  			bg-[#132a13] bg-gradient-to-r from-[#2a6e5d] to-[#002B20]
		  			px-4 mb-4 rounded-tl-xl border-b border-black"
						>
							<img
								className="profile-pic w-12 h-12
		  					drop-shadow-2xl rounded-3xl
		  					border-2 border-[#25d366]
		  					cursor-pointer"
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
						<div className="bottom flex items-center justify-evenly">
							<div className="chat-search flex items-center justify-center gap-2 w-[100%] h-10 ">
								<input
									type="text"
									placeholder="Search or start new chat"
									className="search-input bg-transparent w-[70%]
		  						outline-none border-b border-b-[#25d366] p-2 text-white"
								/>
								<Search className="search-icon mx-4 text-[#25d366]" />
							</div> */}
			{/* <div className="w-[70vw] h-[70vh]">
				<div className=" m-10 flex justify-center items-center"> */}

			<div
				className="main-chat-container 
				absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] 
				h-[calc(100%-12rem)] w-[80%] bg-[#999] rounded-xl"
			>
				<div className="flex justify-center items-center h-full w-">
					<div className="chat-list w-full h-full  ">
						<ChatPanel className=" " />
					</div>
					<div className="chat-contianer w-screen h-full bg-[#222] rounded-r-xl">
						<Chat></Chat>
					</div>
				</div>
			</div>
			<Header />

			{/* <div className="chat-window w-[50rem] h-[70rem] bg-black"></div> */}
			{/* </div>
			</div> */}
			{/* </div> 
				</div>
					<div className="right border-l border-black"></div>
				 </div>
			</div>*/}
		</>
	);
}

export default Home;
