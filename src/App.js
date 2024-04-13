import "./App.css";
import Navbar from "./Components/Navbar.js";
import News from "./Components/News.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import React, { useState } from "react";

const App = () => {
  const pageSize = 6;

  const [progress, setProgress] = useState(10);

  // const setActivity = (progress) => {
  //   setProgress(progress);
  // };

  return (
    <>
      <Router>
        <Navbar />
        {/* <LoadingBar height={3} color="#f11946" progress={progress} /> */}
        <Switch>
          <Route exact path="/">
            <News
              setProgress={setProgress}
              key="general"
              pageSize={pageSize}
              country="us"
              category="general"
            />
          </Route>
          <Route exact path="/business">
            <News
              setProgress={setProgress}
              key="business"
              pageSize={pageSize}
              country="us"
              category="business"
            />
          </Route>
          <Route exact path="/entertainment">
            <News
              setProgress={setProgress}
              key="entertainment"
              pageSize={pageSize}
              country="us"
              category="entertainment"
            />
          </Route>
          <Route exact path="/general">
            <News
              setProgress={setProgress}
              key="general"
              pageSize={pageSize}
              country="us"
              category="general"
            />
          </Route>
          <Route exact path="/health">
            <News
              setProgress={setProgress}
              key="health"
              pageSize={pageSize}
              country="us"
              category="health"
            />
          </Route>
          <Route exact path="/science">
            <News
              setProgress={setProgress}
              key="science"
              pageSize={pageSize}
              country="us"
              category="science"
            />
          </Route>
          <Route exact path="/sports">
            <News
              setProgress={setProgress}
              key="sports"
              pageSize={pageSize}
              country="us"
              category="sports"
            />
          </Route>
          <Route exact path="/technology">
            <News
              setProgress={setProgress}
              key="technology"
              pageSize={pageSize}
              country="us"
              category="technology"
            />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
