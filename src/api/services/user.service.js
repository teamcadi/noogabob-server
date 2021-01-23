import User from "../models/user.model";

const UserService = {
  postUser: async (req, res, next) => {},

  getUser: async (id) => {
    return await User.findById(id);
  },

  putUser: async (id, name, role) => {
    return await User.updateUser(id, name, role);
  },

  deleteUser: async (id) => {
    await User.deleteUser(id);
  },
};

export default UserService;
