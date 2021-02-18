const joi = require("@hapi/joi");
const schema = {
  /**
   * @description 그룹 생성
   */
  groupSchema: joi.object({
    name: joi.string().required(),
    age: joi.number().integer().required(),
    kind: joi.string().required(),
    meals: joi.array().items(joi.string()).unique().min(1).max(3),
  }),

  /**
   * @description 그룹 구성원 통계 유효성 검사
   */
  groupStaticSchema: joi.object({
    type: joi.string().valid("week", "month").required(),
    date: joi.date().required(),
  }),
};

module.exports = schema;
