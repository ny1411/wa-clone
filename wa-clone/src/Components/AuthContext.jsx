import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";

const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

function AuthWrapper({ children }) {
	const [loading, setLoading] = useState(true);
	const [userData, setUserData] = useState(() => {
		const storedUserObj = localStorage.getItem("currentUser");
		return storedUserObj ? JSON.parse(storedUserObj) : null;
	});

	useEffect(() => {
		const auth = getAuth();

		// check for Firebase auth state changes
		const authChange = onAuthStateChanged(auth, (currentUser) => {
			setLoading(true);
			if (currentUser) {
				const userObj = {
					id: currentUser.uid,
					profile_pic: currentUser.photoURL,
					name: currentUser.displayName,
					email: currentUser.email,
				};
				setUserData(userObj);
				// console.log(userObj);
				localStorage.setItem("currentUser", JSON.stringify(userObj)); // save to localStorage
			} else {
				setUserData(null);
				localStorage.removeItem("currentUser"); // clear localStorage on logout
			}
			setLoading(false);
		});

		return () => authChange();
	}, []);

	return (
		<AuthContext.Provider value={{ setUserData, userData, loading }}>
			{children}
		</AuthContext.Provider>
	);
}

export default AuthWrapper;
