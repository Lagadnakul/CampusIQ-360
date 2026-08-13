import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function DashboardLayout({ children }) {
  return (
    <div className="app-layout">

      {/* LEFT SIDEBAR */}
      <Sidebar />

      {/* RIGHT APPLICATION AREA */}
      <div className="main-content">

        {/* TOP NAVIGATION */}
        <Topbar />

        {/* PAGE CONTENT */}
        <main className="page-content">
          {children}
        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;