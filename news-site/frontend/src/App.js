import "./App.css";
import Header from "./components/Header/Header.js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ArticlePage from "./components/ArticlePage/ArticlePage.js";
import Footer from "./components/Footer/Footer";
import ReportersPage from "./components/ReportersPage/ReportersPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
      </div>

      <Switch>
        <Route exact path="/reporters">
          <ReportersPage />
        </Route>

        <Route exact path="/">
          <ArticlePage />
        </Route>

        <Route exact path="/:category">
          <ArticlePage />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
