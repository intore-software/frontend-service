/* 
 @Role : define app routes to be affected by auth guard,
         modify for only new routes or route renaming
*/


const AdminRoutes = [
  "/admin/mayors",
  "/admin/system-operators",
  "/admin/members"
];

const MayorRoutes = [
  "/mayor/members"
]

const SystemOperatorRoutes = [
  "/system-operator/members",
  "/system-operator/amasibo"
]


const Routes = {
  AdminRoutes,
  MayorRoutes,
  SystemOperatorRoutes
};

Object.freeze(Routes);

export { Routes };
