import React, { Component } from "react";
import Streams from "./Streams";
import VideoPlayer from "./VideoPlayer";
import { Link, Route, Switch } from "react-router-dom";

export default class Root extends Component {
      constructor(props) {
            super(props);
      }
      render() {
            return (
                  <div>
                        <Link to="/">Streams</Link>
                        <div>
                              <Switch>
                                    <Route
                                          exact
                                          path="/"
                                          render={(props) => (
                                                <Streams {...props} />
                                          )}
                                    />

                                    <Route
                                          exact
                                          path="/stream/:username"
                                          render={(props) => (
                                                <VideoPlayer {...props} />
                                          )}
                                    />
                              </Switch>
                        </div>
                        <a href="logout">logout</a>
                  </div>
            );
      }
}
