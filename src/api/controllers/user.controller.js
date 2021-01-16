import { getApi } from "../../utils/response";
import UserService from "../services/user.service";

// 컨트롤러에서 모든 에러를 체크함
const UserController = {
  getUser: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const user = await UserService.getUser(userId);
      res.status(200).json(getApi(true, user));
    } catch (error) {
      // error handling
      next(error);
    }
    //user가 없으면 success:false 나오게 만들기
  },
  putUser: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const { name, role } = req.body;
      const user = await UserService.putUser(userId, name, role);
      res.status(201).json(getApi(true));
    } catch (error) {
      next(error);
    }
  },
  deleteUser: async (req, res, next) => {
    try {
      const { userId } = req.params;
      await UserService.deleteUser(userId);
      res.status(200).json(getApi(true));
    } catch (error) {
      next(error);
    }
  },
};

export default UserController;
