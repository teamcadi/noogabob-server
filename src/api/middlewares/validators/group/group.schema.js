const joi = require("@hapi/joi");
const schema = {
  /**
   * @description 그룹 생성
   */
  groupSchema: joi.object({
    name: joi.string().required(),
    age: joi.number().integer().required(),
    kind: joi.string().required(),
    meals: joi.array().min(1).max(3),
  }),

  /**
   * @description 그룹 구성원 통계 유효성 검사
   */
  groupStaticSchema: joi.object({
    date: joi.string().valid("week", "month").required(),
  }),
};

module.exports = schema;
