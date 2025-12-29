import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6 bg-background">
            {children}
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default DashboardLayout
