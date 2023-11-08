import { lazy } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

const LayoutAuth = lazy(() => import("../components/auth/LayoutAuth"));
const Layout = lazy(() =>
  import("../components/app/layout/Layout")
);

export const routes = {
  AUTH: "/",
  DASHBOARD: "/dashboard",
};

const BaseRoutes = () => {
  const location = useLocation();
  const background = location.state?.background;

  return (
    <>
      <Routes location={background || location}>
        <Route path={routes.AUTH} element={<LayoutAuth />} />
        <Route
          path={routes.DASHBOARD}
          element={
            <Layout />
          }
        />
      </Routes>
    </>
  );
};

export default BaseRoutes;
