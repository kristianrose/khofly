import { useEffect } from "react";
import { NavigationProgress, nprogress } from "@mantine/nprogress";
import { useLocation, useSearchParams } from "@remix-run/react";

const NProgress = () => {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    nprogress.complete();
  }, [pathname, searchParams]);

  return <NavigationProgress />;
};

export default NProgress;
