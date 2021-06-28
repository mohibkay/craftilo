import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ProjectsProvider, SelectedProjectProvider } from "./context";
import { ROUTES } from "./constants";
import Dashboard from "./pages/Dashboard";
import "./App.css";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <SelectedProjectProvider>
      <ProjectsProvider>
        <Router>
          <Switch>
            <Route exact path={ROUTES.DASHBOARD} component={Dashboard} />
            <Route path={ROUTES.SIGN_UP} component={SignUp} />
          </Switch>
        </Router>
      </ProjectsProvider>
    </SelectedProjectProvider>
  );
}

export default App;
