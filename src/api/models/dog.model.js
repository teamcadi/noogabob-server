import { executeQuery } from "./pool";

// dog가 여러마리..?? dogId가 왜필요한지 모르겠음
const Dog = {
  postDog: async (userkey, name, age, kind, meal1) => {
    const query = "INSERT INTO dog (fId, name, age, kind, meal1) VALUES (?,?,?,?,?)";
    const values = [userkey, name, age, kind, meal1];
    await executeQuery(query, values);
  },

  updateDog: async (userkey, dogId, name, age, kind, meal1) => {
    const query = "UPDATE dog SET name=?, age=?, kind=?, meal1=? WHERE (id = ? AND fId=?)";
    const values = [name, age, kind, meal1, dogId, userkey];
    const dog = await executeQuery(query, values);
    return dog;
  },

  feedDog: async (dogId, userId) => {
    const query = "INSERT INTO meal (userId, dogId) VALUES (?,?)";
    const values = [userId, dogId];
    await executeQuery(query, values);
  },

  snackDog: async (dogId, userId) => {
    const query = "INSERT INTO snack (userId, dogId) VALUES (?,?)";
    const values = [userId, dogId];
    await executeQuery(query, values);
  },
};

export default Dog;
