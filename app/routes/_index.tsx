import PageIndex from "src/modules/Index";

// Vercel: Render with edge for faster load times
export const config = { runtime: "edge" };

const Index = () => {
  return <PageIndex />;
};

export default Index;
