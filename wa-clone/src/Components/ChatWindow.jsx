import { doc, getDoc } from "firebase/firestore";
import { MessageSquareText, PlusIcon, SendIcon, User2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";

function Chat() {
	const params = useParams();
	// if (params.chatID) {
	// 	return <div className="text-white">Chat: {params.chatID}</div>;
	// }
	// console.log(params);

	const [secondUser, setSecondUser] = useState();
	const [secondUserLoading, setSecondUserLoading] = useState(true);
	const recieverID = params.chatID;

	useEffect(() => {
		const getSecondUser = async () => {
			const docRef = doc(db, "users", recieverID);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				setSecondUser(docSnap.data());
			}
			setSecondUserLoading(false);
			// console.log(secondUserLoading);
			// console.log(params.profile_pic);
		};
		getSecondUser();
	}, []);

	if (secondUserLoading == true) {
		return (
			<div className="chat-logo">
				<MessageSquareText
					className="w-32 h-32 
					text-primary m-0 stroke-[#f0f0f0] stroke-[1px] 
					drop-shadow-[0_0_5px_rgba(0,0,0,0.2)] hover:drop-shadow-[0_0_5px_rgba(0,0,0,0.5)] transition-drop-shadow duration-300 ease-in-out"
				/>
			</div>
		);
	}

	return (
		<section className="w-full h-full flex flex-col gap-4 ">
			<div className="chat-window h-full w-full flex flex-col text-white">
			
					{/* <div> Chat: {params.chatID}</div> */}

					<div className="topbar h-16 flex items-center gap-2 shadow-sm border-b-[1px] border-black">
						<img
							src={params.profile_pic}
							alt=""
							className="w-9 h-9 m-2 rounded-full object-cover"
						/>
					</div>
					<div className="message-list w-full h-[75%] flex flex-col gap-12 p-6 ">
						<div className="message">Message 1</div>
						<div className="message">Message 2</div>
						<div className="message">Message 3</div>
						<div className="message">Message 4</div>
					</div>
					<div className="input-chat flex-grow flex items-center justify-center gap-6 p-4">
						<PlusIcon className="cursor-pointer"/>
						<input type="text" placeholder="Type a message" className="w-full h-16 rounded-xl p-6 outline-none text-black" />
						<SendIcon className="cursor-pointer"/>
					</div>
				
			</div>
		</section>
	);
}

export default Chat;
