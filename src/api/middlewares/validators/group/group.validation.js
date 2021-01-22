import { getApi } from "../../../../utils/response";
import { groupStaticSchema } from "./group.schema";

module.exports = {
  /**
   * @description 그룹 구성원 통계 유효성 검사
   */
  staticValidation: async (req, res, next) => {
    const value = await groupStaticSchema.validate(req.query);
    if (value.error) {
      res.status(200).json(getApi(false, value.error.details[0].message));
    } else {
      next();
    }
  },
};
