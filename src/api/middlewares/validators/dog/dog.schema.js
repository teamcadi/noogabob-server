const joi = require("@hapi/joi");
const schema = {
  /**
   * @description 반려견 생성, 반려견 정보 수정 유효성 검사
   */
  dogSchema: joi.object({
    name: joi.string().valid("week", "month").required(),
    age: joi.number().integer().required(),
    kind: joi.string().required(),
    meal1: joi.date().timestamp().required(),
    meal2: joi.date().timestamp().optional().allow(null),
    meal3: joi.date().timestamp().optional().allow(null),
  }),
  /**
   * @description 식사 제공, 간식 제공 유효성 검사
   */
  bobSchema: joi.object({
    userId: joi.number().integer().required(),
  }),
};

module.exports = schema;
