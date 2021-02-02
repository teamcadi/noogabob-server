import { getApi } from "../../utils/response";
import DogService from "../services/dog.service";

const DogController = {
  postDog: async (req, res, next) => {
    try {
      const { key } = req.headers;
      const { name, age, kind, meal1 } = req.body;
      const dog = await DogService.postDog(key, name, age, kind, meal1);
      res.status(201).json(getApi({ suc: true }));
    } catch (error) {
      // error handling
      next(error);
    }
  },

  updateDog: async (req, res, next) => {
    try {
      const { key } = req.headers;
      const { dogId } = req.params;
      const { name, age, kind, meal1 } = req.body;
      const dog = await DogService.updateDog(key, dogId, name, age, kind, meal1);
      res.status(201).json(getApi({ suc: true }));
    } catch (error) {
      // error handling
      next(error);
    }
  },

  feedDog: async (req, res, next) => {
    try {
      const { dogId } = req.params;
      const { userId } = req.body;
      const meal = await DogService.feedDog(dogId, userId);
      res.status(201).json(getApi({ suc: true }));
    } catch (error) {
      // error handling
      next(error);
    }
  },

  snackDog: async (req, res, next) => {
    try {
      const { dogId } = req.params;
      const { userId } = req.body;
      const snack = await DogService.snackDog(dogId, userId);
      res.status(201).json(getApi({ suc: true }));
    } catch (error) {
      // error handling
      next(error);
    }
  },
};

export default DogController;
