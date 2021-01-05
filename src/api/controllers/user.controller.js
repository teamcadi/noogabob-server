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
      next(e);
    }
  },
};

export default UserController;
