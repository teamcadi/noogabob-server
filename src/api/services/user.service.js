import User from "../models/user.model";

const UserService = {
  getUser: async (id) => {
    return await User.findById(id);
  },
  
  putUser: async (id, name, role) => {
    return await User.updateUser(id, name, role);
  }
};

export default UserService;
