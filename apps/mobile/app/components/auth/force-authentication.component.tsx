"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "expo-router";
import useSession from "@/app/data/hooks/use-session.hook";
import Loading from "../shared/loading.component";

export default function ForceAuthentication(props: {
  children: React.ReactNode;
}) {
  const { user, loading } = useSession();
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    if (!loading && !user?.email) {
      router.replace("/screens/(external)/auth" as any);
    }
  }, [loading, user, path, router]);

  if (loading || !user?.email) return <Loading />;
  return props.children;
}
