import { useAuth, useUser } from "@clerk/nextjs";
import { type UserResource } from "@clerk/types/dist";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@components/simple/Dropdown";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { SewingPinIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AvatarRoot } from "../simple/Avatar";

export default function Header() {
  const { user, isSignedIn } = useUser();

  return (
    <div className="p4 flex items-center justify-between p-4">
      <Link href="/">
        <div className="flex cursor-pointer">
          <SewingPinIcon height={32} width={28} />
          <div className="text-2xl font-bold">Mapit</div>
        </div>
      </Link>

      {isSignedIn ? (
        <AccountDropdown user={user} />
      ) : (
        <Link href="/auth/sign-in">Sign In</Link>
      )}
    </div>
  );
}

interface AccountDropdownProps {
  user: UserResource;
}

function AccountDropdown(props: AccountDropdownProps) {
  const router = useRouter();
  const { signOut } = useAuth();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <AvatarRoot>
          <AvatarImage
            src={props.user.imageUrl || undefined}
            alt="User Profile Image"
          />
          <AvatarFallback delayMs={600}>
            {/* TODO make better */}
            ST
          </AvatarFallback>
        </AvatarRoot>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenuContent sideOffset={5} align="end">
          <DropdownMenuItem variant="tall">
            <div>
              <div>{`${props.user.firstName || ""} ${
                props.user.lastName || ""
              }`}</div>
              <div className="text-xs leading-loose opacity-75">
                {props.user.primaryEmailAddressId || ""}
              </div>
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => {
              router.push("/maps");
            }}
          >
            My Maps
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => {
              signOut()
                .then(() => {
                  // redirect if we're on a protected route
                  if (location.pathname === "/maps") {
                    router.push("/");
                  }
                })
                .catch((error) => console.error("error signing out", error));
            }}
          >
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
