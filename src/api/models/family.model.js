import { executeQuery } from "./pool";

const Family = {
  findByKey: async (fId) => {
    const query = "SELECT fId FROM noogabab.family where fId = ?";
    const values = [fId];
    const [key] = await executeQuery(query, values);
    return key.fId;
  },

  postKey: async (fId) => {
    const query = "INSERT INTO family (fId) values (?)";
    const values = [fId];
    await executeQuery(query, values); // key return 제거
  },
  findByMembers: async (id) => {
    const query = "SELECT * FROM user WHERE fId = (SELECT fId FROM family WHERE id=?)";
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
  findByMonthMealRank: async (id) => {
    const query = `select name, role, MONTH_COUNT as cnt
                    from user inner join 
                    (select userId, dogId, count(year(createdAt)) as YEAR_COUNT, count(month(createdAt)) as MONTH_COUNT 
                    from meal 
                    where dogId= ? and year(createdAt)=year(Now()) and month(createdAt)=month(Now()) GROUP BY userId) as sub 
                    on sub.userId = user.id ORDER BY cnt desc`;
    const values = [id];
    const monthdata = await executeQuery(query, values);
    return monthdata;
  },

  findByMonthSnackRank: async (id) => {
    const query = `select name, role, MONTH_COUNT as cnt
                    from user inner join 
                    (select userId, dogId, count(year(createdAt)) as YEAR_COUNT, count(month(createdAt)) as MONTH_COUNT 
                    from snack 
                    where dogId= ? and year(createdAt)=year(Now()) and month(createdAt)=month(Now()) GROUP BY userId) as sub 
                    on sub.userId = user.id ORDER BY cnt desc`;
    const values = [id];
    const monthdata = await executeQuery(query, values);
    return monthdata;
  },

  findByWeekMealRank: async (id) => {
    const query = `select name, role, cnt from user inner join
                  (select userId, dogId, count(date_format(createdAt, "%Y-%m-%d")) as cnt from meal 
                  where dogId = ? and 
                  date_format(createdAt, "%Y-%m-%d") between date_format(DATE_SUB(Now(), INTERVAL (DAYOFWEEK(Now())-2) DAY), "%Y-%m-%d") and date_format(DATE_SUB(Now(), INTERVAL (DAYOFWEEK(Now())-8) DAY), "%Y-%m-%d")
                  GROUP BY userId) as sub on userId = user.id ORDER BY cnt desc`;
    const values = [id];
    const weekdata = await executeQuery(query, values);
    return weekdata;
  },

  findByWeekSnackRank: async (id) => {
    const query = `select name, role, cnt from user inner join
                  (select userId, dogId, count(date_format(createdAt, "%Y-%m-%d")) as cnt from snack 
                  where dogId = ? and 
                  date_format(createdAt, "%Y-%m-%d") between date_format(DATE_SUB(Now(), INTERVAL (DAYOFWEEK(Now())-2) DAY), "%Y-%m-%d") and date_format(DATE_SUB(Now(), INTERVAL (DAYOFWEEK(Now())-8) DAY), "%Y-%m-%d")
                  GROUP BY userId) as sub on userId = user.id ORDER BY cnt desc`;
    const values = [id];
    const weekdata = await executeQuery(query, values);
    return weekdata;
  },

  postAlbum: async (id, image) => {
    const query = `INSERT INTO album (fId, imageName) values ((SELECT fId FROM family WHERE id=?), ?)`;
    const values = [id, image];
    await executeQuery(query, values);
  },

  getAlbum: async (id) => {
    const query = `SELECT imageName as album FROM album WHERE fId = (SELECT fId FROM family WHERE id = ?) ORDER BY createdAt asc`;
    const values = [id];
    const albums = await executeQuery(query, values);
    return albums;
  },
};

export default Family;
