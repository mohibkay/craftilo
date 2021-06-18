import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ProjectsProvider, SelectedProjectProvider } from "./context";
import Home from "./pages/Home";

function App() {
  return (
    <SelectedProjectProvider>
      <ProjectsProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </Router>
      </ProjectsProvider>
    </SelectedProjectProvider>
  );
}

export default App;
