import Dog from "../models/dog.model";

const DogService = {
  postDog: async (userkey, name, age, kind, meal1) => {
    return await Dog.postDog(userkey, name, age, kind, meal1);
  },

  updateDog: async (userkey, dogId, name, age, kind, meal1) => {
    return await Dog.updateDog(userkey, dogId, name, age, kind, meal1);
  },

  feedDog: async (dogId, userId) => {
    return await Dog.feedDog(dogId, userId);
  },

  snackDog: async (dogId, userId) => {
    return await Dog.snackDog(dogId, userId);
  },
};

export default DogService;
