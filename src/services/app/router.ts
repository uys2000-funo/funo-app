import { RouteLocationNormalizedLoaded, LocationQueryRaw } from "vue-router";

export const getLayoutQueries = function (
  route: RouteLocationNormalizedLoaded
) {
  const query: LocationQueryRaw = {};
  if (route.query.showLogo) query.showLogo = route.query.showLogo;
  if (route.query.showHiToUser) query.showHiToUser = route.query.showHiToUser;
  if (route.query.showViewTitle)
    query.showViewTitle = route.query.showViewTitle;
  if (route.query.viewTitle) query.viewTitle = route.query.viewTitle;
  if (route.query.showMap) query.showMap = route.query.showMap;
  if (route.query.eventCreate) query.eventCreate = route.query.eventCreate;
  return query;
};
