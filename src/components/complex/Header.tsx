import { Button } from "@components/simple/Button";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@components/simple/Dropdown";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { SewingPinIcon } from "@radix-ui/react-icons";
import { type Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AvatarRoot } from "../simple/Avatar";

interface HeaderProps {
  session: Session | null;
}

export default function Header(props: HeaderProps) {
  return (
    <div className="p4 flex items-center justify-between p-4">
      <Link href="/">
        <div className="flex cursor-pointer">
          <SewingPinIcon height={32} width={28} />
          <div className="text-2xl font-bold">Mapit</div>
        </div>
      </Link>

      {props.session ? (
        <AccountDropdown session={props.session} />
      ) : (
        <Button onClick={() => void signIn()}>Sign In</Button>
      )}
    </div>
  );
}

interface AccountDropdownProps {
  session: Session;
}

function AccountDropdown(props: AccountDropdownProps) {
  const router = useRouter();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <AvatarRoot>
          <AvatarImage
            src={props.session.user.image || undefined}
            alt={props.session.user.name || "User Profile"}
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
              <div>{props.session.user.name}</div>
              <div className="text-xs leading-loose opacity-75">
                {props.session.user.email}
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
