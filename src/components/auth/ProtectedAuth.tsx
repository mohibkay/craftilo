import { Redirect, Route, RouteComponentProps } from "react-router-dom";
import { ROUTES } from "../../constants";
import { useAuth } from "../../context/authContext";

interface Props {
  component: React.ComponentType<RouteComponentProps>;
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
          <Component {...props} />
        )
      }
    />
  );
};

export default ProtectedAuth;
