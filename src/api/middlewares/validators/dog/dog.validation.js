import schema from "./dog.schema";
import binary_search from "../../../../utils/localData";

const validates = {
  /**
   * @description 반려견 정보 수정 유효성 검사
   */
  dogValidation: async (req, res, next) => {
    const value = await schema.dogSchema.validate(req.body);
    const { kind } = req.body;
    if (value.error) {
      const error = new Error(value.error.details[0].message);
      error.status = 406;
      next(error);
    } else {
      if (binary_search(kind)) next();
      else {
        const error = new Error("존재하지 않은 강이지 종류입니다.");
        next(error);
      }
    }
  },
  /**
   *
   * @description 식사 제공, 간식 제공 유효성 검사
   */
  eatValidation: async (req, res, next) => {
    const value = await schema.bobSchema.validate(req.body);
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
