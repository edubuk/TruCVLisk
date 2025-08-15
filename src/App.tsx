import { Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar";
import PrivateRoute from "./protectRoute";

import { lazy, Suspense } from "react";
import ThreeDotLoader from "./components/Loader/ThreeDotLoader";
function App() {
  const Home =lazy(()=> import("./pages/Home"));
  const Login = lazy(() => import("./pages/Login"));
  const Resume = lazy(() => import("./pages/ResumeTem"));
  const RefundPolicy = lazy(() => import("./pages/RefundPolicy"));
  const About = lazy(() => import("./pages/About"));
  const TermsAndConditions = lazy(() => import("./pages/TermCond"));
  const CancellationPolicy = lazy(() => import("./pages/CancellationPol"));
  const ContactUs = lazy(() => import("./pages/ContactUs"));
  const DashBoard = lazy(() => import("./pages/DashBoard"));
  const CvOutputPage = lazy(() => import("./pages/CvOutputPage"));
  const CreateCV = lazy(() => import("./pages/HomePage"));

  return (
    <>
    <Navbar />
    <Suspense fallback={<div className="flex justify-center items-center text-3xl text-[#03257e] font-bold h-[80vh]" data-aos="zoom-in">Loading {""} <ThreeDotLoader w={2} h={2} yPos={'end'} /></div>}>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
        <Route path="new-cv/:id" element={<Resume />}></Route>
        <Route path="/refund-policy" element={<RefundPolicy />}></Route>
        <Route path="/about-us" element={<About />}></Route>
        <Route path="/terms-and-conditions" element={<TermsAndConditions />}></Route>
        <Route path="/cancellation-policy" element={<CancellationPolicy />}></Route>
        <Route path="/contact-us" element={<ContactUs />}></Route>
          <Route element={<PrivateRoute />}>
          <Route path="/create-cv" element={<CreateCV />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="cv/:id" element={<CvOutputPage />} />
        </Route>
      </Routes>
    </Suspense>
      </>
  );
}

export default App;
