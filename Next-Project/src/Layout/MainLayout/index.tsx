import { ReactNode } from "react";
import Navbar from "../../components/Navbar";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  );
}

export default Layout;
