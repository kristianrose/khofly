import type { MetaFunction } from "@remix-run/node";
import PageIndex from "src/modules/Index";

export const meta: MetaFunction = () => {
  return [{ title: "About Khofly" }];
};

export default function Index() {
  return <PageIndex />;
}
