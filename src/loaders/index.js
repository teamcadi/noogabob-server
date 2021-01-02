import databaseLoader from "./database.loader";
import expressLoader from "./express.loader";
import fsLoader from "./fs.loader";

async function loaders(app) {
  fsLoader();
  await databaseLoader();
  expressLoader(app);
}

export default loaders;
