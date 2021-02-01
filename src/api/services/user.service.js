import User from "../models/user.model";

const UserService = {
  postUser: async (userkey, name, role) => {
    return await User.postUser(userkey, name, role);
  },

  getUser: async (userId, userkey) => {
    return await User.findById(userId, userkey);
  },

  updateUser: async (userId, name, role, userkey) => {
    return await User.updateUser(userId, name, role, userkey);
  },

  deleteUser: async (userId, userkey) => {
    await User.deleteUser(userId, userkey);
  },
};

export default UserService;
