import Dog from "../../models/dog.model";
import Family from "../../models/family.model";
import User from "../../models/user.model";

module.exports = {
  authorization: async (req, res, next) => {
    const { key } = req.headers;
    if (!key) {
      const error = new Error("키를 보내주세요");
      error.status = 406;
      next(error);
    } else {
      try {
        const { groupId, dogId, userId } = req.params; // 인증으로 사용할 변수
        if (groupId !== undefined) {
          const id = await Family.findByKey(key);          
          if (id == groupId) next();
          else {
            const error = new Error("인증 실패");
            error.status = 406;
            next(error);
          }
        }

        else if (dogId !== undefined) {
          const id = await Dog.findByKey(key);
          if (id == dogId) next();
          else {
            const error = new Error("인증 실패");
            error.status = 406;
            next(error);
          }
        }
        else if (userId !== undefined) {
          const id = await User.findByKey(key, userId);
          if (id == userId) next();
          else {
            const error = new Error("인증 실패");
            error.status = 406;
            next(error);
          }
        }
        else if (userId === undefined) {
          const groupKey = await Family.findByGroup(key);
          if (key === groupKey) next();
          else {
            const error = new Error("인증 실패");
            error.status = 406;
            next(error);
          }
        }
      } catch (error) {
        next(error);
      }
    }
  },
};
