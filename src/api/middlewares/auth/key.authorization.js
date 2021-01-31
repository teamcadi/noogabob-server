import Family from "../../models/family.model";

module.exports = {
  /**
   * @question 사용자가 키값이랑 groupId를 다르게 보낼 수가 있는가?
   */
  authorization: async (req, res, next) => {
    const { key } = req.headers;
    if (!key) {
      const error = new Error("키를 보내주세요");
      error.status = 406;
      next(error);
    } else {
      try {
        const id = await Family.findByKey(key);
        const { groupId } = req.params;
        if (id == groupId) {
          next();
        } else {
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
