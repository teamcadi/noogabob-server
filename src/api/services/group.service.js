import { v4 as uuidv4 } from "uuid";
import Family from "../models/family.model";
import moment from "moment";

const GroupService = {
  getKey: async () => {
    const key = uuidv4();
    await Family.postKey(key);
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

      if (Object.keys(mealRank).length && Object.keys(snackRank).length) {
        return { mealRank, snackRank };
      } else if (Object.keys(mealRank).length && !Object.keys(snackRank).length) {
        return { mealRank, snackRank: "없음" };
      } else if (!Object.keys(mealRank).length && Object.keys(snackRank).length) {
        return { mealRank: "없음", snackRank };
      } else {
        return { mealRank: "없음", snackRank: "없음" };
      }
    } else if (date === "month") {
      const dogId = await Family.findByDogId(groupId);
      const mealRank = await Family.findByMonthMealRank(dogId.id);
      const snackRank = await Family.findByMonthSnackRank(dogId.id);

      if (Object.keys(mealRank).length && Object.keys(snackRank).length) {
        return { mealRank, snackRank };
      } else if (Object.keys(mealRank).length && !Object.keys(snackRank).length) {
        return { mealRank, snackRank: "없음" };
      } else if (!Object.keys(mealRank).length && Object.keys(snackRank).length) {
        return { mealRank: "없음", snackRank };
      } else {
        return { mealRank: "없음", snackRank: "없음" };
      }
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
    for (let i = 0; i < Object.keys(meal).length; i++) {
      meal[i].kind = "meal";
    }
    for (let i = 0; i < Object.keys(snack).length; i++) {
      snack[i].kind = "snack";
    }
    const data = [...meal, ...snack];

    // 밥준 순서대로 정렬하기
    data.sort((a, b) => {
      return a.createdAt < b.createdAt ? -1 : a.createdAt > b.createdAt ? 1 : 0;
    });

    return data;
  },
};

export default GroupService;
