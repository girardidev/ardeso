import "dotenv/config";
import { generateRouterJson } from "./server-handler";

generateRouterJson()
  .then(() => {
    console.log("Contract generated successfully");
  })
  .catch((error) => {
    console.error("Error generating contract", error);
  });
