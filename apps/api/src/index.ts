import { createApp } from "./app.js";
import { apiConfig } from "./config.js";

const app = createApp();

app.listen(apiConfig.PORT, () => {
  console.log(`TrimAtlas API listening on port ${apiConfig.PORT}`);
});
