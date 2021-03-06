import { getApi } from "../../utils/response";
import DogService from "../services/dog.service";

const DogController = {
  getDog: async (req, res, next) => {
    try {
      const { key } = req.headers;
      const dog = await DogService.getDog(key);
      res.status(200).json(getApi({ suc: true, data: dog }));
    } catch (error) {
      next(error);
    }
  },
  updateDog: async (req, res, next) => {
    try {
      const { dogId } = req.params;
      const { name, age, kind, meals } = req.body;
      await DogService.updateDog(dogId, name, age, kind, meals);
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
      await DogService.feedDog(dogId, userId);
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
      await DogService.snackDog(dogId, userId);
      res.status(201).json(getApi({ suc: true }));
    } catch (error) {
      // error handling
      next(error);
    }
  },
  getLastestMeal: async (req, res, next) => {
    try {
      const { dogId } = req.params;
      const result = await DogService.getLastestMeal(dogId);
      res.status(200).json(getApi({ suc: true, data: result }));
    } catch (error) {
      next(error);
    }
  },
};

export default DogController;
