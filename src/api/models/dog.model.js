import { executeQuery } from "./pool";

const Dog = {
  findByDog: async (fId) => {
    const query = "SELECT id, name, age, kind, meal1, meal2, meal3 FROM dog WHERE fId = ?";
    const values = [fId];
    const [dog] = await executeQuery(query, values);
    return dog;
  },

  findByKey: async (fId, userId) => {
    const query = "SELECT DISTINCT dog.id FROM dog, user WHERE dog.fId = ? AND user.fId = ?";
    const values = [fId, fId];
    const [key] = await executeQuery(query, values);
    return key.id;
  },

  updateDog: async (fId, name, age, kind, meals) => {
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
