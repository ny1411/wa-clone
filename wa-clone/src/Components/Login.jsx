import { FingerprintIcon } from "lucide-react";
import React from "react";
import { auth, db } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "./AuthContext";
import Header from "./Header";

async function createUser(authData) {
	// if (!authData?.user?.uid) {
	// 	// console.log("User not authenticated");
	// }
	const userObj = authData.user;
	// console.log("authData is collected");
	const { uid, photoURL, displayName, email } = userObj;

	/** Alternate Approach:
	 
		const userObject = authData.user;
		const uid = userObject.uid;
		const photoURL = userObject.photoURL;
		const name = userObject.displayName;
		const email = userObject.email;
	*/

	setDoc(doc(db, "users", uid), {
		email,
		profile_pic: photoURL,
		name: displayName,
	});
	// console.log("await ki mkc");
}

function Login() {
	const { setUserData } = useAuth();

	const navigate = useNavigate();

	const handleLogin = async () => {
		// console.log("inside handleLogin");
		// Auth step 4
		const userData = await signInWithPopup(auth, new GoogleAuthProvider());

		// console.log("user data is collected");
		createUser(userData);
		// console.log(userData);

		navigate("/");

		const userObj = userData.user;
		const { uid, photoURL, displayName, email } = userObj;
		setUserData({
			id: uid,
			profile_pic: photoURL,
			name: displayName,
			email: email,
		});
		localStorage.setItem("user", JSON.stringify(userObj));
		console.log(userObj);

		// 	try {
		// 		const userData = await signInWithPopup(
		// 			auth,
		// 			new GoogleAuthProvider()
		// 		);
		// 		await createUser(userData);
		// 		setIsLoggedIn(true);
		// 		navigate("/");
		// 	} catch (error) {
		// 		console.error("Login failed:", error);
		// 		// Show error message to user
		// 	}
	};

	return (
		<div className="login-page h-screen w-screen bg-[#e9e9e9]">
			<div
				className="main 
							absolute top-[50%] left-[50%] 
							translate-x-[-50%] translate-y-[-50%] 
							h-[calc(100%-15rem)] w-[calc(100%-5rem)] lg:w-[calc(100%-20rem)] md:w-[calc(100%-10rem)] sm:w-[calc(100%-5rem)]
							bg-green-400 bg-gradient-to-r from-[#bdf49c] to-[#29de92]
							flex items-center justify-center rounded-lg shadow-black drop-shadow-2xl
							"
			>
				<div className="login-container relative grid gap-[1rem] items-center justify-items-center">
					<FingerprintIcon
						className="fingerprint-icon w-32 h-32 
					text-primary m-0 stroke-[#004d40] stroke-[1px] 
					drop-shadow-[0_0_5px_rgba(0,0,0,0.2)] hover:drop-shadow-[0_0_5px_rgba(0,0,0,0.5)] transition-drop-shadow duration-300 ease-in-out"
					/>
					{/* <svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="#004d40"
						stroke-width="1"
						stroke-linecap="round"
						stroke-linejoin="round"
						className="lucide lucide-fingerprint w-32 h-32 text-primary m-0"
					>
						<path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4"></path>
						<path d="M14 13.12c0 2.38 0 6.38-1 8.88"></path>
						<path d="M17.29 21.02c.12-.6.43-2.3.5-3.02"></path>
						<path d="M2 12a10 10 0 0 1 18-6"></path>
						<path d="M2 16h.01"></path>
						<path d="M21.8 16c.2-2 .131-5.354 0-6"></path>
						<path d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2"></path>
						<path d="M8.65 22c.21-.66.45-1.32.57-2"></path>
						<path d="M9 6.8a6 6 0 0 1 9 5.2v2"></path>
					</svg> */}
					<div
						className="login-button text-[1.5rem] 
					flex items-center justify-between 
					font-semibold bg-white p-[1rem] 
					drop-shadow-md hover:drop-shadow-2xl 
					transition-drop-shadow duration-300 ease-in-out 
					cursor-pointer rounded-xl mt-[2rem]"
						onClick={handleLogin}
					>
						<span>Sign in with</span>

						<svg
							xmlns="http://www.w3.org/2000/svg"
							height="24"
							viewBox="0 0 24 24"
							width="24"
							className=" scale-150 ml-[1rem]  outline-none"
						>
							<path
								d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
								fill="#4285F4"
							/>
							<path
								d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
								fill="#34A853"
							/>
							<path
								d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
								fill="#FBBC05"
							/>
							<path
								d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
								fill="#EA4335"
							/>
							<path d="M1 1h22v22H1z" fill="none" />
						</svg>
					</div>
				</div>
			</div>
			<Header />
		</div>
	);
}

export default Login;
