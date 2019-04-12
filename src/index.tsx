import React from "react";
import ReactDOM from "react-dom";
import Todo from "@/components/todo";
import Result from "@/components/result";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Provider, Observer } from "mobx-react";
import ListStore from "./components/store/index";

ReactDOM.render(
  <Router history={createBrowserHistory()}>
    <Provider store={ListStore}>
      <Switch>
        <Route path="/todo" exact component={Todo} />
        <Route path="/result" component={Result} />
      </Switch>
    </Provider>
  </Router>,
  document.getElementById("root")
);
