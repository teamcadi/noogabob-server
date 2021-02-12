import { v4 as uuidv4 } from "uuid";
import Family from "../models/family.model";

const GroupService = {
  postGroup: async (name, age, kind, meals) => {
    const key = uuidv4();
    await Family.postKey(key);
    const dogGroupId = await Family.postDog(key, name, age, kind, meals);
    return { key: key, dogId: dogGroupId.dogId, groupId: dogGroupId.groupId };
  },
  getGroup: async (groupId) => {
    const data = await Family.getGroup(groupId);
    let updateData = {};
    let meals = [];
    updateData.name = data.name;
    updateData.age = data.age;
    updateData.kind = data.kind;

    if (data.meal1 !== null) meals.push(data.meal1);
    if (data.meal2 !== null) meals.push(data.meal2);
    if (data.meal3 !== null) meals.push(data.meal3);
    updateData.meals = meals;

    return updateData;
  },
  getMembers: async (groupId) => {
    return await Family.findByMembers(groupId);
  },

  getStatics: async (groupId, date, type) => {
    // 현재 날짜를 기준으로해서 데이터를 주는것 말고도
    // 이전 데이터도 볼수 있도록
    // date 이용
    const updateDate = new Date(date);
    if (type === "week") {
      const dogId = await Family.findByDogId(groupId);
      const mealRank = await Family.findByWeekMealRank(dogId.id, updateDate);
      const snackRank = await Family.findByWeekSnackRank(dogId.id, updateDate);
      return { mealRank, snackRank };
    } else if (type === "month") {
      const dogId = await Family.findByDogId(groupId);
      const mealRank = await Family.findByMonthMealRank(dogId.id, updateDate);
      const snackRank = await Family.findByMonthSnackRank(dogId.id, updateDate);
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
