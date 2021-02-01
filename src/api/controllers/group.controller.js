import { getApi } from "../../utils/response";
import GroupService from "../services/group.service";

const GroupController = {
  getKey: async (req, res, next) => {
    try {
      const key = await GroupService.getKey();
      res.status(201).json(getApi({ suc: true, data: key }));
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
      } else {
        res.status(200).json(getApi({ suc: true, data: members }));
      }
    } catch (e) {
      next(e);
    }
  },

  getStatics: async (req, res, next) => {
    try {
      const { groupId } = req.params;
      const { date } = req.query;
      const data = await GroupService.getStatics(groupId, date);
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

  // ?: 안드로이드 모듈 테스트 중
  // todo: 파트원과 상의 후 구현하기
  // todo: 가장 최근의 데이터가 0 인덱스로 구현하기
  getTimeline: async (req, res, next) => {
    try {
      const { groupId } = req.params;
      const data = await GroupService.getTimeline(groupId);
      // const dummy = [
      //   { time: 1611938892000, type: 0, content: "밥", subContent: "아들 임태호" },
      //   { time: 1611938892000, type: 0, content: "밥", subContent: "아들 임꺽정" },
      //   { time: 1611938892000, type: 0, content: "밥", subContent: "아들 임영웅" },
      //   { time: 1611766027000, type: 0, content: "밥", subContent: "딸 임솔히" },
      //   { time: 1611766027000, type: 1, content: "간식", subContent: "엄마 오씨" },
      //   { time: 1611766027000, type: 0, content: "밥", subContent: "아빠 임씨" },
      //   { time: 1611938892000, type: 0, content: "밥", subContent: "아들 임태호" },
      //   { time: 1611938892000, type: 1, content: "간식", subContent: "아들 임태호" },
      //   { time: 1611938892000, type: 0, content: "밥", subContent: "아들 임태호" },
      //   { time: 1611938892000, type: 0, content: "밥", subContent: "아들 임태호" },
      //   { time: 1611938892000, type: 0, content: "밥", subContent: "아들 임태호" },
      //   { time: 1611938892000, type: 0, content: "밥", subContent: "아들 임태호" },
      //   { time: 1611679627000, type: 1, content: "간식", subContent: "아들 임태호" },
      //   { time: 1611679627000, type: 0, content: "밥", subContent: "아들 임태호" },
      // ];
      res.status(200).json(getApi({ suc: true, data: data }));
    } catch (e) {
      next(e);
    }
  },
};

export default GroupController;
