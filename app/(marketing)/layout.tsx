import MarketingNav from "@/components/landing/MarketingNav";
import MarketingFooter from "@/components/landing/MarketingFooter";
import CursorPro from "@/components/landing/CursorPro";
import Preloader from "@/components/landing/Preloader";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white text-ink">
      <Preloader />
      <CursorPro />
      <MarketingNav />
      <main>{children}</main>
      <MarketingFooter />
    </div>
  );
}
