import { ComponentType } from "react";
import { Redirect, Route } from "react-router-dom";
import { ROUTES } from "../../constants";
import { useAuth } from "../../context/authContext";

interface Props {
  component: ComponentType;
}

const ProtectedRoute = ({ component: Component, ...rest }: Props) => {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        // @ts-ignore
        currentUser ? <Component {...props} /> : <Redirect to={ROUTES.LOGIN} />
      }
    />
  );
};

export default ProtectedRoute;
