import Dog from "../models/dog.model";

const DogService = {
  getDog: async (key) => {
    const data = await Dog.findByDog(key);
    let updateData = {};
    let meals = [];
    updateData.id = data.id;
    updateData.name = data.name;
    updateData.age = data.age;
    updateData.kind = data.kind;

    if (data.meal1 !== null) meals.push(data.meal1);
    if (data.meal2 !== null) meals.push(data.meal2);
    if (data.meal3 !== null) meals.push(data.meal3);
    updateData.meals = meals;

    return updateData;
  },
  updateDog: async (key, dogId, name, age, kind, meal1) => {
    return await Dog.updateDog(key, dogId, name, age, kind, meal1);
  },

  feedDog: async (dogId, userId) => {
    return await Dog.feedDog(dogId, userId);
  },

  snackDog: async (dogId, userId) => {
    return await Dog.snackDog(dogId, userId);
  },
};

export default DogService;
