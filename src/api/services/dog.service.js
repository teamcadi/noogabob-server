import Dog from "../models/dog.model";

const DogService = {
  postDog: async (dogId, name, age, kind, meal1, meal2, meal3) => {
    return await User.postDog(dogId, name, age, kind, meal1, meal2, meal3);
  },

  updateDog: async (dogId, name, age, kind, meal1, meal2, meal3) => {
    return await User.updateDog(dogId, name, age, kind, meal1, meal2, meal3);
  },

  feedDog: async (dogId, userId) => {
    return await User.feedDog(dogId, userId);
  },

  snackDog: async (dogId, userId) => {
    return await User.snackDog(dogId, userId);
  },
};

export default DogService;
