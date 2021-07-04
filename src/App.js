import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { ProjectsProvider, SelectedProjectProvider } from "./context";
import { ROUTES } from "./constants";
import "./App.css";
import Loader from "./utils/Loader";

import ProtectedRoute from "./components/auth/ProtectedRoute";
import ProtectedAuth from "./components/auth/ProtectedAuth";

const Dashboard = lazy(() => import("./pages/dashboard"));
const SignUp = lazy(() => import("./pages/signUp"));
const Login = lazy(() => import("./pages/login"));

function App() {
  return (
    <SelectedProjectProvider>
      <ProjectsProvider>
        <Router>
          <Suspense fallback={<Loader />}>
            <Switch>
              <ProtectedRoute
                exact
                path={ROUTES.DASHBOARD}
                component={Dashboard}
              />
              <ProtectedAuth path={ROUTES.SIGN_UP} component={SignUp} />
              <ProtectedAuth path={ROUTES.LOGIN} component={Login} />
            </Switch>
          </Suspense>
        </Router>
      </ProjectsProvider>
    </SelectedProjectProvider>
  );
}

export default App;
