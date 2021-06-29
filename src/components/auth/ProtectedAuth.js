import { Redirect, Route } from "react-router-dom";
import { ROUTES } from "../../constants";
import { useAuth } from "../../context/authContext";

export default function ProtectedAuth({ component: Component, ...rest }) {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        currentUser ? (
          <Redirect to={ROUTES.DASHBOARD} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}
