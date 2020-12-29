import expressLoader from "./express.loader";

async function loaders(app) {
  expressLoader(app);
}

export default loaders;
