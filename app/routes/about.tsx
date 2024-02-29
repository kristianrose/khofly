import type { MetaFunction } from "@remix-run/node";
import PageAbout from "src/modules/About";

export const meta: MetaFunction = () => {
  return [{ title: "About Khofly" }];
};

const About = () => {
  return <PageAbout />;
};

export default About;
