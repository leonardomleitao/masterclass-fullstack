import InternalPage from "@/components/template/internal-page.component";
import ForceAuthentication from "@/components/auth/force-authentication.component";

export default function Layout(props: any) {
  return (
    <ForceAuthentication>
      <InternalPage>{props.children}</InternalPage>
    </ForceAuthentication>
  );
}
