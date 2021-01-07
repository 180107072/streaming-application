import React, { Component } from "react";
import videojs from "video.js";
import axios from "axios";

export default class VideoPlayer extends Component {
      constructor(props) {
            super(props);

            this.state = {
                  stream: false,
                  videoJsOptions: null,
            };
      }

      componentDidMount() {
            axios.get("/user", {
                  params: {
                        username: this.props.match.params.username,
                  },
            }).then((res) => {
                  this.setState(
                        {
                              stream: true,
                              videoJsOptions: {
                                    autoplay: false,
                                    controls: true,
                                    sources: [
                                          {
                                                src:
                                                      "http://127.0.0.1:8888/live/" +
                                                      res.data.stream_key +
                                                      "/index.m3u8",
                                                type: "application/x-mpegURL",
                                          },
                                    ],
                              },
                        },
                        () => {
                              this.player = videojs(
                                    this.videoNode,
                                    this.state.videoJsOptions
                              );
                        }
                  );
            });
      }

      render() {
            return (
                  <div>
                        {this.state.stream ? (
                              <div data-vjs-player>
                                    <video
                                          width="700px"
                                          ref={(node) =>
                                                (this.videoNode = node)
                                          }
                                          className="video-js vjs-big-play-centered"
                                    />
                              </div>
                        ) : (
                              " Loading "
                        )}
                  </div>
            );
      }
}
