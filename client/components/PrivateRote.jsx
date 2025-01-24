import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  const accessToken = localStorage.getItem("accessToken"); // Check if the user is logged in

  if (!accessToken) {
    // If no access token is found, redirect to the login page
    return <Navigate to="/login" />;
  }

  // If authenticated, render the requested component
  return children;
};

export default PrivateRoute;
