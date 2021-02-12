import { userSchema } from "./user.schema";

module.exports = {
  /**
   * @description 내 정보 수정 유효성 검사
   */
  userValidation: async (req, res, next) => {
    const value = await userSchema.validate(req.body);
    if (value.error) {
      const error = new Error(value.error.details[0].message);
      error.status = 406;
      next(error);
    } else {
      next();
    }
  },
};
