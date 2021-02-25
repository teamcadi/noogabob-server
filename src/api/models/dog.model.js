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

  updateDog: async (dogId, name, age, kind, meals) => {
    let query;
    let values;
    if (meals.length === 1) {
      query = "UPDATE dog SET name=?, age=?, kind=?, meal1=?, meal2=null, meal3=null WHERE id = ?";
      values = [name, age, kind, meals[0], dogId];
    } else if (meals.length === 2) {
      query = "UPDATE dog SET name=?, age=?, kind=?, meal1=?, meal2=?, meal3=null WHERE id = ?";
      values = [name, age, kind, meals[0], meals[1], dogId];
    } else {
      query = "UPDATE dog SET name=?, age=?, kind=?, meal1=?, meal2=?, meal3=? WHERE id = ?";
      values = [name, age, kind, meals[0], meals[1], meals[2], dogId];
    }
    await executeQuery(query, values);
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
  getLastestMeal: async (dogId) => {
    const query = `(SELECT createdAt FROM meal where dogId = ?) 
                    UNION ALL 
                    (SELECT createdAt FROM snack where dogId = ?) 
                      ORDER BY createdAt DESC LIMIT 1`;
    const values = [dogId, dogId];
    const [result] = await executeQuery(query, values);
    return result;
  },
};

export default Dog;
