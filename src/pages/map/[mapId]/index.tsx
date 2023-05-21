import Header from "@src/components/complex/Header";
import { FooterHeight, HeaderHeight } from "@src/constants";
import { getServerAuthSession } from "@src/server/auth";
import { type GetServerSideProps } from "next";
import { type Session } from "next-auth";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { z } from "zod";

type PageProps = {
  // can't use the word 'session' - https://stackoverflow.com/a/73391392/7627620
  userSession: Session;
};

export const getServerSideProps: GetServerSideProps<PageProps> = async (
  context
) => {
  const session = await getServerAuthSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      userSession: session,
    },
  };
};

const MyAwesomeMap = dynamic(
  () => import("@src/components/complex/map/ResponsiveEventMap"),
  { ssr: false }
);

export default function Page(props: PageProps) {
  const router = useRouter();
  const schema = z.object({
    mapId: z.string(),
  });
  const queryParams = schema.safeParse(router.query);

  if (!queryParams.success) {
    return null;
  }

  return (
    <div
      className="grid"
      style={{
        height: "100dvh",
        gridTemplateRows: `${HeaderHeight}px auto ${FooterHeight}px`,
      }}
    >
      <Header session={props.userSession} />
      <MyAwesomeMap mapId={queryParams.data.mapId} />
    </div>
  );
}
