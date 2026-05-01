import HeaderNav from "@/shared/components/nav/HeaderNav";
import FooterNav from "@/shared/components/nav/FooterNav";

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
