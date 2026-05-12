import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

const UserPrivateRoute = ({ children }) => {
  const [showRedirect, setShowRedirect] = useState(false);
  const user = localStorage.getItem("user");

  useEffect(() => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Please login",
        text: "Please login to continue",
        confirmButtonText: "Go to Login",
      }).then(() => {
        setShowRedirect(true);
      });
    }
  }, [user]);

  if (user) {
    return children;
  }


  if (showRedirect) {
    return <Navigate to="/login" />;
  }

  return null;
};

export default UserPrivateRoute;

