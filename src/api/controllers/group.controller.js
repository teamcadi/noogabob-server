import { getApi } from "../../utils/response";
import GroupService from "../services/group.service";

const GroupController = {
  getKey: async (req, res, next) => {
    try {
      const key = await GroupService.getKey();
      res.status(201).json(getApi(true, key));
    } catch (e) {
      // error handling
      next(e);
    }
  },

  getMembers: async (req, res, next) => {
    try {
      const { groupId } = req.params;
      const members = await GroupService.getMembers(groupId);
      res.status(200).json(getApi(true, members));
    } catch (e) {
      next(e);
    }
  },

  getStatics: async (req, res, next) => {
    try {
      const { groupId } = req.params;
      const { date } = req.query;
      await GroupService.getStatics(groupId, date);
    } catch (e) {
      next(e);
    }
  },
};

export default GroupController;
