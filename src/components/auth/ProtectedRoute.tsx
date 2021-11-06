import { Redirect, Route, RouteComponentProps } from "react-router-dom";
import { ROUTES } from "../../constants";
import { useAuth } from "../../context/authContext";

interface Props {
  component: React.ComponentType<RouteComponentProps>;
  exact?: boolean;
  path: string;
}

const ProtectedRoute = ({ component: Component, ...rest }: Props) => {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        currentUser ? <Component {...props} /> : <Redirect to={ROUTES.LOGIN} />
      }
    />
  );
};

export default ProtectedRoute;
