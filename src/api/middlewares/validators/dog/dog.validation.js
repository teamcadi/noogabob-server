import { dogSchema, bobSchema } from "./dog.schema";

module.exports = {
  /**
   * @description 반려견 정보 수정 유효성 검사
   */
  dogValidation: async (req, res, next) => {
    const value = await dogSchema.validate(req.body);
    if (value.error) {
      const error = new Error(value.error.details[0].message);
      error.status = 406;
      next(error);
    } else {
      next();
    }
  },
  /**
   *
   * @description 식사 제공, 간식 제공 유효성 검사
   */
  eatValidation: async (req, res, next) => {
    const value = await bobSchema.validate(req.body);
    if (value.error) {
      const error = new Error(value.error.details[0].message);
      error.status = 406;
      next(error);
    } else {
      next();
    }
  },
};
