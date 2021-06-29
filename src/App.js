import { BrowserRouter as Router, Switch } from "react-router-dom";
import { ProjectsProvider, SelectedProjectProvider } from "./context";
import { ROUTES } from "./constants";
import "./App.css";

import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import ProtectedAuth from "./components/auth/ProtectedAuth";

function App() {
  return (
    <SelectedProjectProvider>
      <ProjectsProvider>
        <Router>
          <Switch>
            <ProtectedRoute
              exact
              path={ROUTES.DASHBOARD}
              component={Dashboard}
            />
            <ProtectedAuth path={ROUTES.SIGN_UP} component={SignUp} />
            <ProtectedAuth path={ROUTES.LOGIN} component={Login} />
          </Switch>
        </Router>
      </ProjectsProvider>
    </SelectedProjectProvider>
  );
}

export default App;
