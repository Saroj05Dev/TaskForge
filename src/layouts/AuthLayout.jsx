import Navbar from "@/components/layout/Navbar";
import BottomNav from "@/components/layout/BottomNav";

const AuthLayout = ({ children }) => (
  <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden">
    <Navbar onMenuClick={() => {}} />
    <main className="flex-1 overflow-y-auto pb-16 lg:pb-0">
      {children}
    </main>
    <BottomNav />
  </div>
);

export default AuthLayout;
