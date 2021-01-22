import { getApi } from "../../../../utils/response";
import { groupStatic } from "./static.schema";

module.exports = {
  validation: async (req, res, next) => {
    const value = await groupStatic.validate(req.query);
    if (value.error) {
      res.status(200).json(getApi(false, value.error.details[0].message));
    } else {
      next();
    }
  },
};
