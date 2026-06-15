import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "70vh" }}>{children}</main>
      <Footer />
    </>
  );
}
