import { executeQuery } from "./pool";

const User = {
  findById: async (id) => {
    const query = "SELECT * FROM user WHERE id = ?;";
    const values = [id];
    // 구조 분해
    const [user] = await executeQuery(query, values);
    return user;
  },
  // ...
};

export default User;
