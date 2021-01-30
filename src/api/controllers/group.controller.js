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

      if (!Object.keys(members).length) {
        const error = new Error("Not Found Data");
        next(error);
      }
      res.status(200).json(getApi(true, members));
    } catch (e) {
      next(e);
    }
  },

  getStatics: async (req, res, next) => {
    try {
      const { groupId } = req.params;
      const { date } = req.query;
      const data = await GroupService.getStatics(groupId, date);
      res.status(200).json(getApi(true, data));
    } catch (e) {
      next(e);
    }
  },

  postAlbum: async (req, res, next) => {
    try {
      const { groupId } = req.params;
      const image = `/upload/${req.file.filename}`;
      await GroupService.postAlbum(groupId, image);
      res.status(201).json(getApi(true));
    } catch (e) {
      next(e);
    }
  },

  getAlbum: async (req, res, next) => {
    try {
      const { groupId } = req.params;
      const ablum = await GroupService.getAlbum(groupId);
      res.status(200).json(getApi(true, ablum));
    } catch (e) {
      next(e);
    }
  },

  getTimeline: async (req, res, next) => {
    try {
      const { groupId } = req.params;
      const data = await GroupService.getTimeline(groupId);
      res.status(200).json(getApi(true, data));
    } catch (e) {
      next(e);
    }
  },
};

export default GroupController;
