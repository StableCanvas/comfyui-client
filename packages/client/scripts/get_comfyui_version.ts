import WebSocket from "ws";
import { Client } from "../src/main";
import * as fs from "fs";
(async () => {
  const client = new Client({
    clientId: "from_script",
    WebSocket,
  });
  const node_config = await client.getNodeDefs();
  fs.writeFileSync("node_config.json", JSON.stringify(node_config, null, 2));
  const samplers = await client.getSamplers();
  const schedulers = await client.getSchedulers();
  fs.writeFileSync("./temp/samplers.json", JSON.stringify(samplers, null, 2));
  fs.writeFileSync(
    "./temp/schedulers.json",
    JSON.stringify(schedulers, null, 2),
  );
})();
