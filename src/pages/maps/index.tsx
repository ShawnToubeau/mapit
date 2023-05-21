import { PlusIcon } from "@radix-ui/react-icons";
import Header from "@src/components/complex/Header";
import MapList from "@src/components/complex/maps/MapList";
import CreateModal, {
  MapModalMode,
  type ModalData,
} from "@src/components/complex/maps/MapModal";

import { Button } from "@src/components/simple/Button";
import { HeaderHeight } from "@src/constants";
import { getServerAuthSession } from "@src/server/auth";
import { type GetServerSideProps } from "next";
import { type Session } from "next-auth";
import { useState } from "react";

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

export default function Page(props: PageProps) {
  const [modalData, setModalData] = useState<ModalData>(null);

  return (
    <div>
      <div className="border-b border-b-gray-400">
        <Header session={props.userSession} />
      </div>

      <div
        className="overflow-y-auto p-6 pb-16"
        style={{
          height: `calc(100dvh - ${HeaderHeight}px)`,
        }}
      >
        <MapList
          session={props.userSession}
          onMapSelect={(eventMap, action) => {
            setModalData({
              modalMode: action,
              map: eventMap,
            });
          }}
        />
      </div>

      <CreateModal data={modalData} onClose={() => setModalData(null)} />

      <Button
        className="absolute bottom-4 right-4 h-9 w-9 rounded-full p-2"
        onClick={() =>
          setModalData({
            modalMode: MapModalMode.CREATE,
          })
        }
      >
        <PlusIcon className="h-6 w-6" aria-hidden="true" />
      </Button>
    </div>
  );
}
