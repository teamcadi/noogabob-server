import { executeQuery } from "./pool";

const Family = {
  postKey: async (fId) => {
    const query = "INSERT INTO family (fId) values (?)";
    const values = [fId];
    await executeQuery(query, values); // key return 제거
  },
  findByMembers: async (id) => {
    const query = "SELECT * FROM user WHERE fId = (SELECT fId FROM family WHERE id=?)";
    const values = [id];
    const members = await executeQuery(query, values);
    return members;
  },
};

export default Family;
