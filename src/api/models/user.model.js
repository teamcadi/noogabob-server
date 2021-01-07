import { executeQuery } from "./pool";

const User = {
  findById: async (id) => {
    const query = "SELECT * FROM user WHERE id = ?;";
    const values = [id];
    // 구조 분해
    const [user] = await executeQuery(query, values);
    return user;
  },
  
  updateUser: async(id, name, role) => {
    const query = "UPDATE user SET name = ?, role = ? WHERE id = ?";
    const values = [name, role, id];
    const user = await executeQuery(query, values);
    return user;
  }
};

export default User;
