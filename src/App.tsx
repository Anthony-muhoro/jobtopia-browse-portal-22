
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import Companies from "./pages/Companies";
import CompanyProfile from "./pages/CompanyProfile";
import ForEmployers from "./pages/ForEmployers";
import PostJob from "./pages/PostJob";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/companies/:id" element={<CompanyProfile />} />
        <Route path="/for-employers" element={<ForEmployers />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/dashboard" element={<EmployeeDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
