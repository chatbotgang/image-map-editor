import { RouteConfig, RouteConfigComponentProps } from "react-router-config";
import { pagePaths } from "./paths";
import AppRoute from "./AppRoute";
import { WrapEditPicPage } from "../components/ImageEditor/ImgEditorPage";

export const appRouteList = [
  { component: WrapEditPicPage, path: pagePaths.index, exact: true },
];

export const AppRouteRootList: RouteConfig[] = [
  {
    component: ({ ...props }: RouteConfigComponentProps) => {
      return <AppRoute {...props} />;
    },
    routes: appRouteList as RouteConfig[],
  },
];
