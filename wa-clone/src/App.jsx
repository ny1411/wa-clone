import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/Login.jsx";
import Chat from "./Components/Chat.jsx";
import Home from "./Components/Home.jsx";
import PageNotFound from "./Components/PageNotFound.jsx";
import Profile from "./Components/Profile.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	return (
		<>
			{/* 
			<Routes> 
			 <Route path="/" element={<Home />}></Route>
				<Route path="/login" element={<Login />}></Route>
				<Route path="/profile" element={<Profile />}></Route>
				<Route path="/chat/:uniqueID" element={<Chat />}></Route> 
				// :uniqueID will match everything that looks gibberish 
			 	<Route path="*" element={<PageNotFound />}></Route> 
				// use * for everything else than above 
			</Routes> 
			*/}
			<Routes>
				<Route
					path="/"
					element={
						<ProtectedRoute isLoggedIn={isLoggedIn}>
							<Home setIsLoggedIn={setIsLoggedIn}></Home>
						</ProtectedRoute>
					}
				></Route>
				<Route
					path="/chat/:uniqueId"
					element={
						<ProtectedRoute isLoggedIn={isLoggedIn}>
							<Chat setIsLoggedIn={setIsLoggedIn}></Chat>
						</ProtectedRoute>
					}
				></Route>
				<Route
					path="/login"
					element={<Login setIsLoggedIn={setIsLoggedIn}></Login>}
				></Route>
				<Route path="*" element={<PageNotFound />}></Route>
			</Routes>
		</>
	);
}

export default App;
