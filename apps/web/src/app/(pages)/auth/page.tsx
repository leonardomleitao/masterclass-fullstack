import { Suspense } from "react";
import AuthForm from "@/components/auth/auth-form.component";
import Processing from "@/components/shared/processing.component";

export default function Page() {
  return (
    <Suspense fallback={<Processing />}>
      <AuthForm />
    </Suspense>
  );
}
