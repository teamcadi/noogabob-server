import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import Family from "../models/family.model";

const GroupService = {
  postGroup: async (name, age, kind, meals) => {
    const key = uuidv4();
    // const hashKey = await bcrypt.hash(key, await bcrypt.genSalt(10));
    await Family.postKey(key);
    await Family.postDog(key, name, age, kind, meals);
    return key;
  },

  getMembers: async (groupId) => {
    return await Family.findByMembers(groupId);
  },

  getStatics: async (groupId, date) => {
    // 요청한 groupId를 기준으로 멤버들을 찾아서 얼마나 식사를 줫는지, 간식을 줫는지 순위 별로 리스트
    // 기준은 week와 month로 나눠서
    if (date === "week") {
      // const family = await Family.findByUser(groupId);
      const dogId = await Family.findByDogId(groupId);
      const mealRank = await Family.findByWeekMealRank(dogId.id);
      const snackRank = await Family.findByWeekSnackRank(dogId.id);
      return { mealRank, snackRank };
    } else if (date === "month") {
      const dogId = await Family.findByDogId(groupId);
      const mealRank = await Family.findByMonthMealRank(dogId.id);
      const snackRank = await Family.findByMonthSnackRank(dogId.id);

      return { mealRank, snackRank };
    }
  },

  postAlbum: async (groupId, image) => {
    await Family.postAlbum(groupId, image);
  },

  getAlbum: async (groupId) => {
    return await Family.getAlbum(groupId);
  },

  getTimeline: async (groupId) => {
    const dogId = await Family.findByDogId(groupId);
    const meal = await Family.getMealTimeline(dogId.id);
    const snack = await Family.getSnackTimeline(dogId.id);

    meal.forEach((element) => {
      element.type = 0;
      element.content = "밥";
    });

    snack.forEach((element) => {
      element.type = 1;
      element.content = "간식";
    });

    const datas = [...meal, ...snack];
    datas.sort((a, b) => {
      return a.createdAt > b.createdAt ? -1 : 1;
    });

    let updateDatas = [];

    for (let i = 0; i < datas.length; i++) {
      let subContent = datas[i].role.concat(" ", datas[i].name);
      let time = Date.parse(datas[i].createdAt) / 1000;
      let data = {};
      data.time = time;
      data.type = datas[i].type;
      data.content = datas[i].content;
      data.subContent = subContent;
      updateDatas.push(data);
    }
    return updateDatas;
  },
};

export default GroupService;
