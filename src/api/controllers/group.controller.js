import { getApi } from "../../utils/response";
import GroupService from "../services/group.service";

const GroupController = {
  createGroup: async (req, res, next) => {
    try {
      const { name, age, kind, meals } = req.body;
      const data = await GroupService.postGroup(name, age, kind, meals);
      res.status(201).json(getApi({ suc: true, data }));
    } catch (e) {
      // error handling
      next(e);
    }
  },
  getGroup: async (req, res, next) => {
    try {
      const { groupId } = req.params;
      const data = await GroupService.getGroup(groupId);
      res.status(200).json(getApi({ suc: true, data }));
    } catch (e) {
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
      } else {
        res.status(200).json(getApi({ suc: true, data: members }));
      }
    } catch (e) {
      next(e);
    }
  },

  getStatics: async (req, res, next) => {
    try {
      const { key } = req.headers;
      const { groupId } = req.params;
      const { type, date } = req.query;
      const data = await GroupService.getStatics(groupId, date, type, key);
      res.status(200).json(getApi({ suc: true, data: data }));
    } catch (e) {
      next(e);
    }
  },

  postAlbum: async (req, res, next) => {
    try {
      const { groupId } = req.params;
      const image = `/upload/${req.file.filename}`;
      await GroupService.postAlbum(groupId, image);
      res.status(201).json(getApi({ suc: true }));
    } catch (e) {
      next(e);
    }
  },

  getAlbum: async (req, res, next) => {
    try {
      const { groupId } = req.params;
      const ablum = await GroupService.getAlbum(groupId);
      res.status(200).json(getApi({ suc: true, data: ablum }));
    } catch (e) {
      next(e);
    }
  },

  getTimeline: async (req, res, next) => {
    try {
      const { groupId } = req.params;
      const data = await GroupService.getTimeline(groupId);
      res.status(200).json(getApi({ suc: true, data: data }));
    } catch (e) {
      next(e);
    }
  },
};

export default GroupController;
