import React from "react";
import { useParams } from "react-router-dom";

function Chat() {
	const params = useParams();
	console.log(params);
	return (
		<>
			<div className="chat m-4">
				<div className="text-white">Chat: {params.chatID}</div>
			</div>
		</>
	);
}

export default Chat;
