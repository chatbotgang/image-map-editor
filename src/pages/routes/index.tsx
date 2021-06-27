import { RouteConfig, RouteConfigComponentProps } from "react-router-config";
import { pagePaths } from "./paths";
import AppRoute from "./AppRoute";
import upLoadPage from "../components/ImageEditor/ImgEditorPage";

export const appRouteList = [
  { component: upLoadPage, path: pagePaths.index, exact: true },
];

export const AppRouteRootList: RouteConfig[] = [
  {
    component: ({ ...props }: RouteConfigComponentProps) => {
      return <AppRoute {...props} />;
    },
    routes: appRouteList as RouteConfig[],
  },
];
