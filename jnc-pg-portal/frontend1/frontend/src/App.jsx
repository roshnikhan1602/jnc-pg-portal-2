import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Login from "./pages/login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Faculty from "./pages/Faculty";
import FacultyEditProfile from "./pages/FacultyEditProfile";
import FacultyProfile from "./pages/FacultyProfile";
import DepartmentFaculty from "./pages/DepartmentFaculty";

/* ✅ ADD THIS */
import Library from "./pages/Library";

import AdminFaculty from "./pages/AdminFaculty";
import AdminEditFaculty from "./pages/AdminEditFaculty";

import ProtectedRoute from "./components/ProtectedRoutes";
import PublicRoute from "./components/PublicRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";

import Layout from "./components/Layout";
import AdminDashboard from "./pages/AdminDashboard";
import FacultyDashboard from "./pages/FacultyDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import FacultyProtectedRoute from "./components/FacultyProtectedRoute";
import PlacementsLayout from "./pages/placements/PlacementsLayout";
import PlacementsHome from "./pages/placements/PlacementsHome";
import Training from "./pages/placements/Training";
import Recruiters from "./pages/placements/Recruiters";
import Gallery from "./pages/placements/Gallery";
import ContactPlacement from "./pages/placements/ContactPlacement";
import AddPlacement from "./pages/admin/AddPlacement";
import PlacementAbout from "./pages/placements/PlacementAbout";
import AdminTraining from "./pages/admin/AdminTraining";
import ManageRecruiters from "./pages/admin/ManageRecruiters";
import PlacementAboutAdmin from "./pages/admin/AdminPlacementAbout";
import Chatbot from "./pages/Chatbot";

import FacultyDashboardR from "./pages/FacultyDashboardDept";
import PublicDashboard from "./pages/PublicDashboard";
import PostgraduateDetails from "./pages/PostgraduateDetails";
import FacultyEdit from "./pages/FacultyEdit";
import ApplicationForm from "./pages/ApplicationForm";
import Research from "./pages/Research";
import GuideDetails from "./pages/GuideDetails";
import AdminDashboardR from "./pages/admin/AdminDashboard";
import AllResearch from "./pages/AllResearch";
import ScrollToTop from "./components/ScrollToTop";
import AdminResearchCreate from "./pages/admin/AdminResearchCreate";


function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>

        {/* DEFAULT */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* PUBLIC (WITH LAYOUT) */}
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/faculty/:id" element={<FacultyProfile />} />
          <Route path="/departments/:deptId" element={<DepartmentFaculty />} />

          {/* ✅ NEW LIBRARY ROUTE */}
          <Route path="/library" element={<Library />} />
        </Route>

        {/* AUTH ROUTES */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* USER ROUTES */}
        <Route element={<FacultyProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/faculty/edit-profile" element={<FacultyEditProfile />} />
            <Route path="/faculty/events" element={<FacultyDashboard />} />
            

          </Route>
        </Route>

        {/* ADMIN ROUTES */}
        <Route element={<AdminProtectedRoute />}>
          <Route element={<Layout />}>
          <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/faculty" element={<AdminFaculty />} />
            <Route path="/admin/faculty/edit/:id" element={<AdminEditFaculty />} />
            <Route path="/admin/createresearch" element={<AdminResearchCreate />} />
          </Route>
        </Route>


        //legha
        
        <Route element={<Layout />}>
          {/* <Route path="/admin" element={<AdminDashboard />} /> */}
          {/* <Route path="/faculty/dash" element={<FacultyDashboard />} /> */}
          <Route path="/student" element={<StudentDashboard />} />
        </Route>

         {/* PLACEMENTS */}
          <Route path="placements" element={<PlacementsLayout />}>
            <Route index element={<PlacementsHome />} />
            <Route path="about" element={<PlacementAbout />} />
            <Route path="training" element={<Training />} />
            <Route path="recruiters" element={<Recruiters />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="contact" element={<ContactPlacement />} />
          </Route>

          
        {/* ADMIN (NO HEADER/FOOTER) */}
                <Route element={<Layout />}>
        <Route path="/admin/add-placement" element={<AddPlacement />} />
        <Route path="/admin/add-training" element={<AdminTraining />} />
        <Route path="/admin/manage-comp" element={<ManageRecruiters />} />
        <Route path="/admin/placement-about" element={<PlacementAboutAdmin />} />
</Route>



          {/* reetha */}

                 {/* DEFAULT → PUBLIC */}
          {/* <Route path="/" element={<Navigate to="/public" />} /> */}

          {/* DASHBOARDS */}
           <Route element={<Layout />}>
          <Route path="/fee&application" element={<AdminDashboardR />} />
          <Route path="//faculty/dash" element={<FacultyDashboardR />} />
          <Route path="/Postgraduate-Programmes" element={<PublicDashboard />} />

          {/* COMMON ROUTES */}
          <Route path="/postgraduate/:dept" element={<PostgraduateDetails />} />
          <Route path="/faculty/edit/:dept" element={<FacultyEdit />} />
          <Route path="/apply/:dept" element={<ApplicationForm />} />
          <Route path="/research" element={<AllResearch />} />
          <Route path="/research/:dept" element={<Research />} />

          <Route path="/research/:dept/guide/:slug" element={<GuideDetails />} />
          </Route>



      </Routes>
       <Chatbot />
    </BrowserRouter>

    
  );
}

export default App;