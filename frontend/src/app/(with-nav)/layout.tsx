import FooterNav from "@/shared/components/nav/FooterNav";
import HeaderNav from "@/shared/components/nav/HeaderNav";

export default function WithNavLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderNav />
      {children}
      <FooterNav />
    </>
  );
}
