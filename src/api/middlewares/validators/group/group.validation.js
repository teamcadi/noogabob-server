import { groupStaticSchema } from "./group.schema";

module.exports = {
  /**
   * @description 그룹 구성원 통계 유효성 검사
   */
  staticValidation: async (req, res, next) => {
    const value = await groupStaticSchema.validate(req.query);
    if (value.error) {
      const error = new Error(value.error.details[0].message);
      error.status = 406;
      next(error);
    } else {
      next();
    }
  },
};
