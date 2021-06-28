import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ProjectsProvider, SelectedProjectProvider } from "./context";
import { ROUTES } from "./constants";
import "./App.css";

import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

function App() {
  return (
    <SelectedProjectProvider>
      <ProjectsProvider>
        <Router>
          <Switch>
            <Route exact path={ROUTES.DASHBOARD} component={Dashboard} />
            <Route path={ROUTES.SIGN_UP} component={SignUp} />
            <Route path={ROUTES.LOGIN} component={Login} />
          </Switch>
        </Router>
      </ProjectsProvider>
    </SelectedProjectProvider>
  );
}

export default App;
