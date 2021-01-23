import { executeQuery } from "./pool";

const Dog = {
  postDog: async (dogId) => {
    const query = "INSERT INTO dog (dId, name, age, kind, meal1, meal2, meal3) values (?)";
    const values = [dogId];
    await executeQuery(query, values);
    return dog;
  },

  updateDog: async (dogId, name, age, kind, meal1, meal2, meal3) => {
    const query = "UPDATE dog SET name=?, age=?, kind=?, meal1=?, meal2=?, meal3=? WHERE dogId = ?";
    const values = [name, age, kind, meal1, meal2, meal3, dogId];
    const dog = await executeQuery(query, values);
    return dog;
  },

  feedDog: async (id, dogId) => {
    const query = "UPDATE dogs SET (userid=?, meal1=True) WHERE dogid = ?"; // 우선 meal1 먹이 줌
    const values = [id, dogId];
    const dog = await executeQuery(query, values);
    return dog;
  },

  snackDog: async (id, dogId) => {
    snack = 0;
    const query = "UPDATE dog SET (userid=?, snack=snack+1) WHERE dogid = ?";
    const values = [id, dogId];
    const dog = await executeQuery(query, values);
    return dog;
  },
};

export default Dog;
