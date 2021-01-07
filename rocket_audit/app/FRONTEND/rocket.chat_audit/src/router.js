/****************************************
 ***************** Router ***************
 ****************************************/
import Vue from "vue";
import VueRouter from "vue-router";
import MessageArea from "./components/pages/userPanel/MessageArea";
import ViewPanel from "./components/pages/userPanel/ViewPanel";

Vue.use(VueRouter);

export const routeNames = {
  ROOT: "root",
  VIEW_PROFILE: "view_profile",
  USER_PANEL_HOME: "user_panel_home",
};

Vue.prototype.$rns = routeNames;

const router = new VueRouter({
  scrollBehavior: function (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {x: 0, y: 0};
    }
  },
  routes: [
    {
      path: "/",
      name: routeNames.ROOT,
      redirect: {name: routeNames.USER_PANEL_HOME},
    },
    {
      path: "",
      component: ViewPanel,
      meta: {
        layout: "UserPanelLayout"
      },
      children: [
        {
          path: "",
          name: routeNames.USER_PANEL_HOME,
          redirect: {name: routeNames.VIEW_PROFILE}
        },
        {
          path: "Chat:",
          name: routeNames.VIEW_PROFILE,
          meta: {
            pageInfo: {
              title: "Chat",
              titleDesc: "view profile"
            }
          },
          component: MessageArea
        },
      ]
    },
    {
      path: "*",
      redirect: {name: routeNames.ROOT}
    }
  ]
});


export default router;
