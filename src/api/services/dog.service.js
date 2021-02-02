import Dog from "../models/dog.model";

const DogService = {
  postDog: async (key, name, age, kind, meal1) => {
    return await Dog.postDog(key, name, age, kind, meal1);
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
