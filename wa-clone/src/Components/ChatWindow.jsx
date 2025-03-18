import {
	arrayUnion,
	doc,
	getDoc,
	onSnapshot,
	setDoc,
	updateDoc,
} from "firebase/firestore";
import { MessageSquareText, PlusIcon, SendIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import { useAuth } from "./AuthContext";

function Chat() {
	const params = useParams();
	const { userData } = useAuth();

	// if (params.chatID) {
	// 	return <div className="text-white">Chat: {params.chatID}</div>;
	// }
	// console.log(params);

	const [secondUser, setSecondUser] = useState();
	const [secondUserLoading, setSecondUserLoading] = useState(true);
	const recieverID = params.chatID;

	const [message, setMessage] = useState("");
	const [messageList, setMessageList] = useState([]);

	const chatID =
		userData?.id > recieverID
			? `${userData?.id}-${recieverID}`
			: `${recieverID}-${userData?.id}`;

	const messageEndRef = useRef(null);

	useEffect(() => {
		messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messageList]);

	useEffect(() => {
		messageEndRef.current?.scrollIntoView({ behavior: "instant" });
	}, []);

	useEffect(() => {
		const getSecondUser = async () => {
			const docRef = doc(db, "users", recieverID);
			console.log(docRef);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				setSecondUser(docSnap.data());
				// console.log(docSnap.data());
			}
			setSecondUserLoading(false);
		};
		getSecondUser();

		const messageUnsubscribe = onSnapshot(
			doc(db, "user-chat", chatID),
			(doc) => {
				// console.log(doc.data());
				setMessageList(doc.data()?.messages);
			}
		);
		return () => {
			messageUnsubscribe();
		};
	}, [recieverID]);

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

	const handleSendMessage = async () => {
		if (message) {
			const date = new Date();
			const timestamp = date.toLocaleTimeString("en-US", {
				hour: "numeric",
				minute: "numeric",
				hour12: false,
			});

			const messageRef = doc(db, "user-chat", chatID);

			const messageSnapshot = await getDoc(messageRef);
			//start new chat
			if (!messageSnapshot.exists()) {
				await setDoc(doc(db, "user-chat", chatID), {
					chatID: chatID,
					messages: [
						{
							content: message,
							reciever: recieverID,
							sender: userData.id,
							timestamp: timestamp,
						},
					],
				});
			} else {
				//update message list
				await updateDoc(doc(db, "user-chat", chatID), {
					messages: arrayUnion({
						content: message,
						reciever: recieverID,
						sender: userData.id,
						timestamp: timestamp,
					}),
				});
			}
		}

		// console.log("Message:", message);
		setMessage("");
	};

	return (
		<section className="w-full h-full flex flex-col gap-4 ">
			<div className="chat-window h-full w-full flex flex-col text-white">
				<div className="topbar h-16 flex items-center gap-2 shadow-sm border-b-[1px] border-black">
					<img
						src={secondUser?.profile_pic}
						alt=""
						className="w-9 h-9 m-2 rounded-full object-cover"
					/>
					<div>{secondUser?.name}</div>
				</div>
				<div className="message-list w-full h-[75%] flex flex-col gap-12 p-6 overflow-y-scroll">
					{messageList?.map((message, index) => {
						return (
							<div
								key={index}
								data-sender={message.sender === userData.id}
								className={`message bg-white w-fit max-w-[400px] p-2 rounded-md shadow-sm break-words data-[sender=true]:ml-auto data-[sender=true]:bg-lime-200`}
							>
								<p className="text-black">{message?.content}</p>
								<p className="text-xs text-neutral-500 text-end">
									{message?.timestamp}
								</p>
							</div>
						);
					})}
					{/* 
					<div className="message">Message 1</div>
					<div className="message">Message 2</div>
					<div className="message">Message 3</div>
					<div className="message">Message 4</div> */}
					<div ref={messageEndRef}></div>
				</div>
				<div className="input-chat flex-grow flex items-center justify-center gap-6 p-4">
					<PlusIcon className="cursor-pointer" />
					<input
						type="text"
						placeholder="Type a message"
						className="w-full h-16 rounded-xl p-6 outline-none text-black"
						value={message}
						onChange={(e) => {
							setMessage(e.target.value);
						}}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								handleSendMessage();
							}
						}}
					/>
					<SendIcon
						className="cursor-pointer"
						onClick={handleSendMessage}
					/>
				</div>
			</div>
		</section>
	);
}

export default Chat;
