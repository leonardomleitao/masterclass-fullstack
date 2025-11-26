"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import useSession from "@/data/hooks/use-session.hook";
import Processing from "../shared/processing.component";

export default function ForceAuthentication(props: {
  children: React.ReactNode;
}) {
  const { user, loading } = useSession();
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    if (!loading && !user?.email) {
      router.push("/auth");
    }
  }, [loading, user, path, router]);

  if (loading || !user?.email) return <Processing />;
  return props.children;
}
