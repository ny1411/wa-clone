import React from "react";
import { ShieldAlertIcon } from "lucide-react";

function PageNotFound() {
	return (
		<div className="page-not-found h-screen w-screen bg-red-700">
			<div
				className="main 
							absolute top-[50%] left-[50%] 
							translate-x-[-50%] translate-y-[-50%] 
							h-[calc(100%-15rem)] w-[calc(100%-5rem)] lg:w-[calc(100%-20rem)] md:w-[calc(100%-10rem)] sm:w-[calc(100%-5rem)] bg-red-400 bg-gradient-to-t from-[#c43737] to-[#ff7575]
							flex flex-col items-center justify-center gap-8 rounded-lg shadow-black drop-shadow-2xl
							"
			>
				<ShieldAlertIcon className="text-white w-32 h-32 animate-bounce" />
				<h1 className="error-text text-4xl text-white font-semibold">
					Error 404: Page Not Found
				</h1>
			</div>
			<div className="header bg-[#060606] h-[10rem] flex items-center justify-start">
				<img
					src="https://static.whatsapp.net/rsrc.php/yZ/r/JvsnINJ2CZv.svg"
					alt="WhatsApp"
					className="logo ml-[3rem] lg:ml-[10rem] md:ml-[7rem] sm:ml-[5rem] scale-110"
				/>
			</div>
		</div>
	);
}

export default PageNotFound;
