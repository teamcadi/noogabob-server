import { getApi } from "../../utils/response";
import UserService from "../services/user.service";

//컨트롤러 하나씩 짜기
// 컨트롤러에서 모든 에러를 체크함
const UserController = {
  postUser: async (req, res, next) => {
    try {
      // key 불러와서  user 만들기
      const { key } = req.headers;
      const { name, role } = req.body;
      const user = await UserService.postUser(key, name, role);
      res.status(201).json(getApi({ suc: true }));
    } catch (error) {
      next(error);
    }
  },

  getUser: async (req, res, next) => {
    try {
      const { key } = req.headers;
      const { userId } = req.params;
      const user = await UserService.getUser(userId, key);
      if (user === undefined) {
        res.status(200).json(getApi({ suc: false }));
      } else {
        res.status(200).json(getApi({ suc: true, data: user }));
      }
    } catch (error) {
      // error handling
      next(error);
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const { key } = req.headers;
      const { userId } = req.params;
      const { name, role } = req.body;
      const user = await UserService.updateUser(userId, name, role, key);
      res.status(201).json(getApi({ suc: true }));
    } catch (error) {
      next(error);
    }
  },
  deleteUser: async (req, res, next) => {
    try {
      const { key } = req.headers;
      const { userId } = req.params;
      await UserService.deleteUser(userId, key);
      res.status(200).json(getApi({ suc: true }));
    } catch (error) {
      next(error);
    }
  },
};

export default UserController;
