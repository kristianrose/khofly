import type { MetaFunction } from "@remix-run/node";
import PageIndex from "src/modules/Index";

export const meta: MetaFunction = () => {
  return [
    { title: "Khofly" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return <PageIndex />;
}
