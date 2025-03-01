
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import Companies from "./pages/Companies";
import CompanyProfile from "./pages/CompanyProfile";
import ForEmployers from "./pages/ForEmployers";
import PostJob from "./pages/PostJob";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import EmployerDashboard from "./pages/EmployerDashboard";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import { ScrollToTopButton } from "./components/ScrollToTopButton";
import { ThemeProvider } from "./components/ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/companies/:id" element={<CompanyProfile />} />
          <Route path="/for-employers" element={<ForEmployers />} />
          <Route path="/post-job" element={<PostJob />} />
          <Route path="/dashboard" element={<EmployeeDashboard />} />
          <Route path="/employer-dashboard" element={<EmployerDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ScrollToTopButton />
      </Router>
    </ThemeProvider>
  );
}

export default App;
