import { useEffect, useState } from "react";

const ClientOnly = ({ children }: { children: any }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted ? <>{children}</> : null;
};

export default ClientOnly;
