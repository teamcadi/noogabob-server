import { executeQuery } from "./pool";

const Dog = {
  findByKey: async (fId, userId) => {
    const query = "SELECT DISTINCT dog.id FROM dog, user WHERE dog.fId = ? AND user.fId = ?";
    const values = [fId, fId];
    const [key] = await executeQuery(query, values);
    return key.id;
  },

  updateDog: async (key, dogId, name, age, kind, meal1) => {
    const query = "UPDATE dog SET name=?, age=?, kind=?, meal1=? WHERE (id = ? AND fId=?)";
    const values = [name, age, kind, meal1, dogId, key];
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
