import { ComponentType } from "react";
import { Redirect, Route } from "react-router-dom";
import { ROUTES } from "../../constants";
import { useAuth } from "../../context/authContext";

interface Props {
  component: ComponentType;
  path: string;
}

const ProtectedAuth = ({ component: Component, ...rest }: Props) => {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        currentUser ? (
          <Redirect to={ROUTES.DASHBOARD} />
        ) : (
          // @ts-ignore
          <Component {...props} />
        )
      }
    />
  );
};

export default ProtectedAuth;
