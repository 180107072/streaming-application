import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Streams extends Component {
      constructor(props) {
            super(props);
            this.state = {
                  live_streams: [],
            };
      }

      componentDidMount() {
            this.getLiveStreams();
      }

      getLiveStreams() {
            axios.get("http://127.0.0.1:8888/api/streams").then((res) => {
                  let streams = res.data;
                  if (typeof (streams["live"] !== "undefined")) {
                        this.getStreamsInfo(streams["live"]);
                  }
            });
      }

      getStreamsInfo(live_streams) {
            axios.get("/streams/info", {
                  params: {
                        streams: live_streams,
                  },
            }).then((res) => {
                  this.setState({
                        live_streams: res.data,
                  });
            });
      }

      render() {
            let streams = this.state.live_streams.map((stream, index) => {
                  return (
                        <div key={index}>
                              <span>LIVE</span>
                              <Link to={"/stream/" + stream.username}>
                                    <div className="stream-thumbnail">
                                          <img
                                                align="center"
                                                src={
                                                      "/thumbnails/" +
                                                      stream.stream_key +
                                                      ".png"
                                                }
                                          />
                                    </div>
                              </Link>

                              <span className="username">
                                    <Link to={"/stream/" + stream.username}>
                                          {stream.username}
                                    </Link>
                              </span>
                        </div>
                  );
            });

            return (
                  <div>
                        <h4>Live Streams</h4>
                        <hr />

                        <div className="streams row">{streams}</div>
                  </div>
            );
      }
}
