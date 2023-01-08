import { combineReducers } from "redux";

import authReducer from "./auth/AuthReducer";
import messageReducer from "./auth/MessageReducer"
import adminMayorsReducer from "./admin/AdminMayorsReducer";
import adminSystemOperatorsReducer from "./admin/AdminSystemOperatorsReducer";
import mayorMembersReducer from "./mayor/MayorMembersReducer"
import adminMembersReducer from "./admin/AdminMembersReducer"
import systemOperatorMembersReducer from "./system-operator/SystemOperatorMembersReducer"

const rootReducer = combineReducers({

  auth: authReducer,
  message: messageReducer,
  adminMayors: adminMayorsReducer,
  adminSystemOperators: adminSystemOperatorsReducer,
  mayorMembers: mayorMembersReducer,
  adminMembers: adminMembersReducer,
  systemOperatorMembers: systemOperatorMembersReducer
});

export default rootReducer;
