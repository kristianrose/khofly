import { useEffect, useState } from "react";

const ClientOnly = ({ children }: { children: any }) => {
  let [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted ? <>{children}</> : null;
};

export default ClientOnly;
