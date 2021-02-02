import User from "../models/user.model";

const UserService = {
  postUser: async (key, name, role) => {
    return await User.postUser(key, name, role);
  },

  getUser: async (userId, key) => {
    return await User.findById(userId, key);
  },

  updateUser: async (userId, name, role, key) => {
    return await User.updateUser(userId, name, role, key);
  },

  deleteUser: async (userId, key) => {
    await User.deleteUser(userId, key);
  },
};

export default UserService;
