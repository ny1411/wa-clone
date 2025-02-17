import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";

const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

function AuthWrapper({ children }) {

	
	const [userData, setUserData] = useState(() => {
		const storedUserObj = localStorage.getItem("user");
		return storedUserObj ? JSON.parse(storedUserObj) : null;
	});

	useEffect(() => {
		const auth = getAuth();

		// check for Firebase auth state changes
		const authChange = onAuthStateChanged(auth, (user) => {
			if (user) {
				const userObj = {
					id: user.uid,
					profile_pic: user.photoURL,
					name: user.displayName,
					email: user.email,
				};
				setUserData(userObj);
				localStorage.setItem("user", JSON.stringify(userObj)); // save to localStorage
			} else {
				setUserData(null);
				localStorage.removeItem("user"); // clear localStorage on logout
			}
		});

		return () => authChange();
	}, []);

	return (
		<AuthContext.Provider value={{ setUserData, userData }}>
			{children}
		</AuthContext.Provider>
	);
}

export default AuthWrapper;
