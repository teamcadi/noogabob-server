import User from "../models/user.model";

const UserService = {
  getUser: async (id) => {
    return await User.findById(id);
  },
};

export default UserService;
