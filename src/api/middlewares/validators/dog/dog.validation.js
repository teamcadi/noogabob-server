import { getApi } from "../../../../utils/response";
import { dogSchema, bobSchema } from "./static.schema";

module.exports = {
  /**
   * @description 반려견 생성, 반려견 정보 수정 유효성 검사
   */
  DogValidation: async (req, res, next) => {
    const value = await dogSchema.validate(req.body);
    if (value.error) {
      res.status(200).json(getApi(false, value.error.details[0].message));
    } else {
      next();
    }
  },
  /**
   *
   * @description 식사 제공, 간식 제공 유효성 검사
   */
  EatValidation: async (req, res, next) => {
    const value = await bobSchema.validate(req.body);
    if (value.error) {
      res.status(200).json(getApi(false, value.error.details[0].message));
    } else {
      next();
    }
  },
};
