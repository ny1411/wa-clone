import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { OrbitProgress } from "react-loading-indicators";

function ProtectedRoute(props) {
	const { userData, loading } = useAuth();
	const children = props.children;

	if (loading == true) {
		return (
			<div className="flex flex-col items-center justify-center h-screen">
				
				<OrbitProgress
					dense
					color="#25d366"
					size="medium"
					text=""
					textColor=""
				/>
			</div>
		);
	}

	if (userData) {
		return children;
	} else {
		return <Navigate to="/login"></Navigate>;
	}
}

export default ProtectedRoute;
