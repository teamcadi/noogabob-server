const joi = require("@hapi/joi");
const schema = {
  groupStatic: joi.object({
    date: joi.string().valid("week", "month").required(),
  }),
};

module.exports = schema;
