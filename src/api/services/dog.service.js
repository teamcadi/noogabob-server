import Dog from "../models/dog.model";

const DogService = {
  updateDog: async (key, name, age, kind, meals) => {
    return await Dog.updateDog(key, name, age, kind, meals);
  },

  feedDog: async (dogId, userId) => {
    return await Dog.feedDog(dogId, userId);
  },

  snackDog: async (dogId, userId) => {
    return await Dog.snackDog(dogId, userId);
  },
};

export default DogService;
