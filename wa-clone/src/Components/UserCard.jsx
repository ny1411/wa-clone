import React from "react";
import { Link } from "react-router-dom";

function UserCard(props) {
	const { userObj, handleOpenChat } = props;
	return (
		<Link
			key={userObj.id}
			className="flex items-center gap-2 m-4"
			onClick={() => {
				handleOpenChat(userObj.id);
			}}
			to={`/${userObj.id}`}
		>
			<img
				src={userObj.data.profile_pic}
				alt=""
				className="w-16 rounded-full"
			/>
			<h2 >{userObj.data.name}</h2>
			{/* <p>{userObj.data.email}</p> */}
			{/* <p>User ID: {userObj.id}</p> */}
		</Link>
	);
}

export default UserCard;
