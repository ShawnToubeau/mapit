import Header from "@src/components/complex/Header";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();

  return (
    <div>
      <div className="border-b border-b-gray-400">
        <Header session={session} />
      </div>

      <div className="flex flex-col items-center justify-center pt-4">
        <div className="text-2xl">Welcome!</div>
        <div className="px-4 text-center">
          This section is still under construction but feel free to create an
          account and take a look around.
        </div>
      </div>
    </div>
  );
}
