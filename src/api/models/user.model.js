import { executeQuery } from "./pool";

const User = {
  postUser: async (key, name, role) => {
    const query = "INSERT INTO user (fId, name, role) VALUES (?,?,?)";
    const values = [key, name, role];
    await executeQuery(query, values);
  },

  findById: async (userId, key) => {
    const query = "SELECT * FROM user WHERE (id = ? AND fId=?)";
    const values = [userId, key];
    // 구조 분해
    const user = await executeQuery(query, values);
    return user;
  },

  updateUser: async (userId, name, role, key) => {
    const query = "UPDATE user SET name = ?, role = ? WHERE (id = ? AND fId=?)";
    const values = [name, role, userId, key];
    const user = await executeQuery(query, values);
    return user;
  },

  deleteUser: async (userId, key) => {
    const query = "DELETE FROM user WHERE (id=? AND fId=?) ";
    const values = [userId, key];
    await executeQuery(query, values);
  },
};

export default User;
