import "./App.css";
import { Component, useEffect } from "react";
import { Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Jobs from "./components/Jobs/Jobs";
import Notifications from "./components/Notifications/Notifications";
import SignIn from "./components/Auth/SignIn/SignIn";
import SignUp from "./components/Auth/SignUp/SignUp";
import SignOut from "./components/Auth/SignOut/SignOut";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          {/* <Route path="/" exact component={Home} /> */}
          <Route path="/" exact component={Jobs} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signout" component={SignOut}/>
          <Route path="/home" component={Home}/>
          <Route path="/notifications" component={Notifications} />
          <Route path="/signup" component={SignUp} />
        </Layout>
      </div>
    );
  }
}

export default App;
