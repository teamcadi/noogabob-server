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
};

export default GroupController;
