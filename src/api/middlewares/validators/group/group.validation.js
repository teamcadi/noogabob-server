import { groupStaticSchema } from "./group.schema";
import { groupSchema } from "./group.schema";

module.exports = {
  /**
   * @description 그룹 생성 유효성 검사
   */
  groupValidation: async (req, res, next) => {
    const value = await groupSchema.validate(req.body);
    if (value.error) {
      const error = new Error(value.error.details[0].message);
      error.status = 406;
      next(error);
    } else {
      next();
    }
  },
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
