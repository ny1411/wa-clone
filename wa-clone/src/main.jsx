import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthWrapper from "./Components/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
	<AuthWrapper>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</AuthWrapper>
);
