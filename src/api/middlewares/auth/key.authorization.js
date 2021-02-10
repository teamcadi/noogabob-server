import Family from "../../models/family.model";

module.exports = {
  authorization: async (req, res, next) => {
    const { key } = req.headers;
    if (!key) {
      const error = new Error("키를 보내주세요");
      error.status = 406;
      next(error);
    } else {
      try {
        const { groupId } = req.params;
        const id = await Family.findByKey(key);

        if (id == groupId) next();
        else {
          const error = new Error("인증 실패");
          error.status = 406;
          next(error);
        }
      } catch (error) {
        next(error);
      }
    }
  },
};
