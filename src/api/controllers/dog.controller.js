import { getApi } from "../../utils/response";
import GroupService from "../services/dog.service";

const DogController = {
  postDog: async (req, res, next) => {
    try {
      const { dogId } = req.params;
      const { name, age, kind, meal1, meal2, meal3 } = req.body;
      const user = await UserService.postDog(dogId, name, age, kind, meal1, meal2, meal3);
      res.status(201).json(getApi(true));
    } catch (error) {
      // error handling
      next(error);
    }
  },

  updateDog: async (req, res, next) => {
    try {
      const { dogId } = req.params;
      const { name, age, kind, meal1, meal2, meal3 } = req.body;
      const user = await UserService.updateDog(dogId, name, age, kind, meal1, meal2, meal3);
      res.status(201).json(getApi(true));
    } catch (error) {
      // error handling
      next(error);
    }
  },

  feedDog: async (req, res, next) => {
    try {
      const { dogId } = req.params;
      const { userId } = req.body;
      const user = await UserService.feedDog(dogId, userId);
      res.status(201).json(getApi(true));
    } catch (error) {
      // error handling
      next(error);
    }
  },

  snackDog: async (req, res, next) => {
    try {
      const { dogId } = req.params;
      const { userId } = req.body;
      const user = await UserService.snackDog(dogId, userId);
      res.status(201).json(getApi(true));
    } catch (error) {
      // error handling
      next(error);
    }
  },
};

export default DogController;
