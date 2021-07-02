import path from "path";
import dotenv from "dotenv";

(() => {
  // Set the env file
  const result2 = dotenv.config({
    path: path.join(__dirname, `env/test.env`),
  });
  if (result2.error) {
    throw result2.error;
  }
})();