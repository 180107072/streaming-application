import cron from "cron";
import request from "request";
import helpers from "../helpers/helpers";
import config from "../config/default";

const CronJob = cron.CronJob;
const port = config.rtmp_server.http.port;

const job = new CronJob(
      "*/5 * * * * *",
      function () {
            request.get("http://127.0.0.1:" + port + "/api/streams", function (
                  error,
                  response,
                  body
            ) {
                  let streams = JSON.parse(body);
                  if (typeof (streams["live"] !== undefined)) {
                        let live_streams = streams["live"];
                        for (let stream in live_streams) {
                              if (!live_streams.hasOwnProperty(stream))
                                    continue;
                              helpers.generateStreamThumbnail(stream);
                        }
                  }
            });
      },
      null,
      true
);

export default job;
