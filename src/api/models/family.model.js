import { executeQuery } from "./pool";

const Family = {
    postKey: async(fId) => {
        const query = "INSERT INTO family (fId) values (?)";
        const values = [fId];
        const key = await executeQuery(query, values);
        return key;
      }
};

export default Family;
