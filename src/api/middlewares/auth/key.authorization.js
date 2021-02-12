import Dog from "../../models/dog.model";
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
        const { groupId } = req.params; // 그룹의 키 인증으로 사용할 변수
        const { dogId } = req.params; // 강아지관련으로 키 인증으로 사용할 변수

        if (groupId !== undefined) {
          const id = await Family.findByKey(key);

          if (id == groupId) next();
          else {
            const error = new Error("인증 실패");
            error.status = 406;
            next(error);
          }
        }
        if (dogId !== undefined) {
          const id = await Dog.findByKey(key);
          if (id == dogId) next();
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
