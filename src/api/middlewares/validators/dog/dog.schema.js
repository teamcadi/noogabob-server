const joi = require("@hapi/joi");
const schema = {
  /**
   * @description 반려견 정보 수정 유효성 검사
   */
  //
  dogSchema: joi.object({
    name: joi.string().required(),
    age: joi.number().integer().required(),
    kind: joi.string().required(),
    meals: joi.array().items(joi.string()).unique().min(1).max(3),
  }),
  /**
   * @description 식사 제공, 간식 제공 유효성 검사
   */
  bobSchema: joi.object({
    userId: joi.number().integer().required(),
  }),
};

module.exports = schema;
