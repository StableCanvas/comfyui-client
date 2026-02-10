import WebSocket from "ws";
import { Client } from "../src/main";
import * as fs from "fs";
(async () => {
  const client = new Client({
    clientId: "from_script",
    WebSocket,
  });
  const history = await client.getHistory();
  // console.log(JSON.stringify(history));
  const queue = await client.getQueue();
  // console.log(JSON.stringify(queue));
  const stats = await client.getSystemStats();
  fs.writeFileSync("./temp/history.json", JSON.stringify(history));
  fs.writeFileSync("./temp/queue.json", JSON.stringify(queue));
  fs.writeFileSync("./temp/stats.json", JSON.stringify(stats));
})();
