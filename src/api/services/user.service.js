import User from "../models/user.model";
import GroupService from "../services/group.service";

const UserService = {
  postUser: async (key, name, role) => {
    const userId = await User.postUser(key, name, role);
    const group = await GroupService.getGroupId(userId);
    const dog = await GroupService.getGroup(group.id);

    let data = {};
    data.userId = userId;
    data.groupId = group.id;
    data.key = group.fId;
    data.dog = dog;

    return data;
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
