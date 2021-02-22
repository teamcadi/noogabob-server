import DogService from "../services/dog.service";
import { executeQuery } from "./pool";

const Family = {
  findByGroup: async (fId) => {
    const query = "SELECT fId FROM family where fId = ?";
    const values = [fId];
    const [key] = await executeQuery(query, values);
    return key.fId;
  },
  // key로 검색하기
  findByKey: async (fId) => {
    const query = "SELECT id FROM family where fId = ?";
    const values = [fId];
    const [key] = await executeQuery(query, values);
    return key.id;
  },
  // userId로 검색하기
  findByGroupId: async (userId) => {
    const query = "SELECT id, fId FROM family WHERE fId = (SELECT fId FROM user WHERE id = ?)";
    const values = [userId];
    const [data] = await executeQuery(query, values);
    return data;
  },
  getGroup: async (groupId) => {
    const query = "SELECT id, name, age, kind, meal1, meal2, meal3 FROM dog WHERE fId = (SELECT fId FROM family WHERE id = ?);";
    const values = [groupId];
    const [dog] = await executeQuery(query, values);
    return dog;
  },
  postKey: async (fId) => {
    const query = "INSERT INTO family (fId) values (?)";
    const values = [fId];
    await executeQuery(query, values);
  },

  postDog: async (fId, name, age, kind, meals) => {
    let query, values;
    if (meals.length === 1) {
      query = "INSERT INTO dog (fId, name, age, kind, meal1) VALUES (?, ?, ?, ?, ?)";
      values = [fId, name, age, kind, meals[0]];
    } else if (meals.length === 2) {
      query = "INSERT INTO dog (fId, name, age, kind, meal1, meal2) VALUES (?, ?, ?, ?, ?, ?)";
      values = [fId, name, age, kind, meals[0], meals[1]];
    } else {
      query = "INSERT INTO dog (fId, name, age, kind, meal1, meal2, meal3) VALUES (?, ?, ?, ?, ?, ?, ?)";
      values = [fId, name, age, kind, meals[0], meals[1], meals[2]];
    }
    await executeQuery(query, values);
    query = "SELECT dog.id as dogId, family.id as groupId FROM dog, family WHERE dog.fId = ? AND family.fId = ?";
    values = [fId, fId];
    const [dogGroupId] = await executeQuery(query, values);
    return dogGroupId;
  },
  findByMembers: async (id) => {
    const query = "SELECT id, name, role FROM user WHERE fId = (SELECT fId FROM family WHERE id=?)";
    const values = [id];
    const members = await executeQuery(query, values);
    return members;
  },
  findByDogId: async (id) => {
    //group primary key로 부터 강아지 primary key
    const query = "select dog.id from dog natural join (SELECT fId FROM family where id = ?) as sub";
    const values = [id];
    const [dogId] = await executeQuery(query, values);
    return dogId;
  },
  findByMonthMealRank: async (id, date, fId) => {
    const query = `select name, role, IFNULL(MONTH_COUNT, 0) as cnt
                  from (SELECT * FROM user WHERE fId = ?) as user LEFT JOIN 
                  (select userId, dogId, count(year(createdAt)) as YEAR_COUNT, count(month(createdAt)) as MONTH_COUNT 
                  from meal 
                  where dogId= ? and year(createdAt)=year(?) 
                  and month(createdAt)=month(?) GROUP BY userId)
                  as sub 
                  on sub.userId = user.id `;
    const values = [fId, id, date, date];
    const monthdata = await executeQuery(query, values);
    return monthdata;
  },

  findByMonthSnackRank: async (id, date, fId) => {
    const query = `select name, role, IFNULL(MONTH_COUNT, 0) as cnt
                  from (SELECT * FROM user WHERE fId = ?) as user LEFT JOIN 
                  (select userId, dogId, count(year(createdAt)) as YEAR_COUNT, count(month(createdAt)) as MONTH_COUNT 
                  from snack 
                  where dogId= ? and year(createdAt)=year(?) 
                  and month(createdAt)=month(?) GROUP BY userId)
                  as sub 
                  on sub.userId = user.id `;
    const values = [fId, id, date, date];
    const monthdata = await executeQuery(query, values);
    return monthdata;
  },

  findByWeekMealRank: async (id, date, fId) => {
    const query = `SELECT name, role, IFNULL(cnt, 0) as cnt FROM (SELECT * FROM user WHERE fId = ?) as user LEFT JOIN                   
                  (SELECT userId, dogId, COUNT(DATE_FORMAT(createdAt, "%Y-%m-%d")) as cnt FROM meal 
                  WHERE dogId = ? AND 
                  DATE_FORMAT(createdAt, "%Y-%m-%d") 
                  BETWEEN DATE_FORMAT(DATE_SUB(?, INTERVAL (DAYOFWEEK(?)-1) DAY), "%Y-%m-%d") 
                  AND DATE_FORMAT(DATE_SUB(?, INTERVAL (DAYOFWEEK(?)-7) DAY), "%Y-%m-%d")
                  GROUP BY userId) 
                  as sub on user.id = userId;`;
    const values = [fId, id, date, date, date, date];
    const weekdata = await executeQuery(query, values);
    return weekdata;
  },

  findByWeekSnackRank: async (id, date, fId) => {
    const query = `SELECT name, role, IFNULL(cnt, 0) as cnt FROM (SELECT * FROM user WHERE fId = ?) as user LEFT JOIN                   
                  (SELECT userId, dogId, COUNT(DATE_FORMAT(createdAt, "%Y-%m-%d")) as cnt FROM snack 
                  WHERE dogId = ? AND 
                  DATE_FORMAT(createdAt, "%Y-%m-%d") 
                  BETWEEN DATE_FORMAT(DATE_SUB(?, INTERVAL (DAYOFWEEK(?)-1) DAY), "%Y-%m-%d") 
                  AND DATE_FORMAT(DATE_SUB(?, INTERVAL (DAYOFWEEK(?)-7) DAY), "%Y-%m-%d")
                  GROUP BY userId) 
                  as sub on user.id = userId;`;
    const values = [fId, id, date, date, date, date];
    const weekdata = await executeQuery(query, values);
    return weekdata;
  },

  postAlbum: async (id, image) => {
    const query = `INSERT INTO album (fId, imageName) VALUES ((SELECT fId FROM family WHERE id=?), ?)`;
    const values = [id, image];
    await executeQuery(query, values);
  },

  getAlbum: async (id) => {
    const query = `SELECT id, imageName AS album FROM album WHERE fId = (SELECT fId FROM family WHERE id = ?) ORDER BY createdAt ASC`;
    const values = [id];
    const albums = await executeQuery(query, values);
    return albums;
  },

  getMealTimeline: async (id) => {
    const query = `SELECT user.name, user.role, meal.createdAt FROM meal, user WHERE dogId = ? AND user.id = meal.userId ORDER BY meal.createdAt DESC;`;
    const values = [id];
    const data = await executeQuery(query, values);
    return data;
  },

  getSnackTimeline: async (id) => {
    const query = `SELECT user.name, user.role, snack.createdAt FROM snack, user WHERE dogId = ? AND user.id = snack.userId  ORDER BY snack.createdAt DESC;`;
    const values = [id];
    const data = await executeQuery(query, values);
    return data;
  },
};

export default Family;
