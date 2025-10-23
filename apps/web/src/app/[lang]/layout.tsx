import { UserProvider } from "@/components/user-provider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <UserProvider>{children}</UserProvider>;
}
