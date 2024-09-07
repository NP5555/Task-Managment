import axios from "axios";
import { REGISTRATION, USERLOGIN } from "../actionTypes";

export const register = (formData, toast) => {
	return async (dispatch) => {
	  try {
		const response = await axios.post(
		  "https://localhost:4000/api/auth/register",  // Fix URL here
		  formData,
		);
		dispatch({ type: REGISTRATION });
		console.log(response.data); // Optionally handle success message
		toast({
		  title: "Account created.",
		  description: "We've created your account for you.",
		  status: "success",
		  duration: 9000,
		  isClosable: true,
		});
	  } catch (error) {
		toast({
		  title: "Registration failed.",
		  description: error.response?.data?.message || "An error occurred",
		  status: "error",
		  duration: 9000,
		  isClosable: true,
		});
		console.error("Registration failed:", error.response?.data);
	  }
	};
  };
  
  export const login = (formData, toast, navigate) => {
	return async (dispatch) => {
		try {
			const response = await axios.post(
				"http://localhost:4000/api/auth/login",  // Ensure this matches your local server setup
				formData,
			);
			console.log(response.data); // Optionally handle success message
			dispatch({
				type: USERLOGIN,
				payload: { user: response.data.user, token: response.data.token },
			});
			if (response.data.token) {
				toast({
					title: "Login successful.",
					description: "You've logged in successfully.",
					status: "success",
					duration: 9000,
					isClosable: true,
				});
				navigate("/");
			} else {
				toast({
					title: "Login failed.",
					description: "Username or Password is incorrect. Please try again.",
					status: "error",
					duration: 9000,
					isClosable: true,
				});
			}
		} catch (error) {
			toast({
				title: "Login failed.",
				description: error.response?.data?.message || "An error occurred",
				status: "error",
				duration: 9000,
				isClosable: true,
			});
			console.error("Login failed:", error.response?.data || error.message);
		}
	};
};

