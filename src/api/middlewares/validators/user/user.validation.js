import { getApi } from "../../../../utils/response";
import { userSchema } from "./static.schema";

module.exports = {
  /**
   * @description 내 정보 수정 유효성 검사
   */
  userValidation: async (req, res, next) => {
    const value = await userSchema.validate(req.body);
    if (value.error) {
      res.status(200).json(getApi(false, value.error.details[0].message));
    } else {
      next();
    }
  },
};
