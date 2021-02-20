import schema from "./user.schema";

const validates = {
  /**
   * @description 내 정보 수정 유효성 검사
   */
  userValidation: async (req, res, next) => {
    const value = await schema.userSchema.validate(req.body);
    if (value.error) {
      const error = new Error(value.error.details[0].message);
      error.status = 406;
      next(error);
    } else {
      next();
    }
  },
};

export default validates;
