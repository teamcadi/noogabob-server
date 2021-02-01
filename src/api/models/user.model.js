import { executeQuery } from "./pool";

const User = {
  postUser: async (userkey, name, role) => {
    const query = "INSERT INTO user (fId, name, role) VALUES (?,?,?)";
    const values = [userkey, name, role];
    await executeQuery(query, values);
  },

  findById: async (userId, userkey) => {
    const query = "SELECT * FROM user WHERE (id = ? AND fId=?)";
    const values = [userId, userkey];
    // 구조 분해
    const user = await executeQuery(query, values);
    return user;
  },

  updateUser: async (userId, name, role, userkey) => {
    const query = "UPDATE user SET name = ?, role = ? WHERE (id = ? AND fId=?)";
    const values = [name, role, userId, userkey];
    const user = await executeQuery(query, values);
    return user;
  },

  deleteUser: async (userId, userkey) => {
    const query = "DELETE FROM user WHERE (id=? AND fId=?) ";
    const values = [userId, userkey];
    await executeQuery(query, values);
  },
};

export default User;
