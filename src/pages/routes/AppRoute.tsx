import { ReactElement } from "react";
import { renderRoutes, RouteConfig } from "react-router-config";
import { AppLayout } from "../layouts/App/AppLayout";

const AppRoute = ({ route }: RouteConfig): ReactElement => {
  return <AppLayout>{renderRoutes(route.routes)}</AppLayout>;
};

export default AppRoute;
