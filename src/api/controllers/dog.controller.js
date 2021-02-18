import { getApi } from "../../utils/response";
import DogService from "../services/dog.service";

const DogController = {
  updateDog: async (req, res, next) => {
    try {
      const { key } = req.headers;
      const { dogId } = req.params;
      const { name, age, kind, meal1, meal2, meal3 } = req.body;
      const dog = await DogService.updateDog(name, age, kind, meal1, meal2, meal3);
      if (dog == "" || dog == null || dog == undefined || (dog != null && typeof dog == "object" && !Object.keys(dog).length)) {
        res.status(201).json(getApi({ suc: false }));
      } else {
        res.status(201).json(getApi({ suc: true }));
      }
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
      if (dog == "" || dog == null || dog == undefined || (dog != null && typeof dog == "object" && !Object.keys(dog).length)) {
        res.status(201).json(getApi({ suc: false }));
      } else {
        res.status(201).json(getApi({ suc: true }));
      }
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
};

export default DogController;
