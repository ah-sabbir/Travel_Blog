import { NextPage } from "next";

interface Props {
  params: { slug: string };
}

const Page: NextPage<Props> = ({ params }) => {
  return <div>page</div>;
};

export default Page;
