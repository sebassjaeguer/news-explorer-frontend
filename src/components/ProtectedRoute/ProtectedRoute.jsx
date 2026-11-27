import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

function ProtectedRoute({ children, onRequireLogin }) {
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    if (!currentUser) {
      onRequireLogin();
    }
  }, [currentUser, onRequireLogin]);

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;