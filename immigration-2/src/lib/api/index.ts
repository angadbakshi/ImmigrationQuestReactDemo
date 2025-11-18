import {profileApi} from "../../services/profile/profile.service";
import {adminApi} from "../../../../admin/src/services/admin.service";

export const api = {
  admin: adminApi,
  profile: profileApi,
};