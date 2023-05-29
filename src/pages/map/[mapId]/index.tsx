import Header from "@src/components/complex/Header";
import { FooterHeight, HeaderHeight } from "@src/constants";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { z } from "zod";

const MyAwesomeMap = dynamic(
  () => import("@src/components/complex/map/ResponsiveEventMap"),
  { ssr: false }
);

export default function Page() {
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
      <Header />
      <MyAwesomeMap mapId={queryParams.data.mapId} />
    </div>
  );
}
