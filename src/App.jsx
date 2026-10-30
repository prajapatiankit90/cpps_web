import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './container/Dashborad/home';
import Footer from './components/Footer/Footer';

const Trusti = React.lazy(() => import('./container/Trusties'));
const Contact = React.lazy(() => import('./container/Contact'));
const About = React.lazy(() => import('./container/About'));
const History = React.lazy(() => import('./container/History'));
const Gallery = React.lazy(() => import('./container/Gallery'));
const Donors = React.lazy(() => import('./container/Donors'));
const Committee = React.lazy(() => import('./container/Committee'));
const OnlineForm = React.lazy(() => import('./container/OnlineForm'));
const Members = React.lazy(() => import('./container/Members'));
const StudentMarksheet = React.lazy(() => import('./container/StudentMarksheet'));
const StudentMarksheetList = React.lazy(() => import('./container/StudentMarksheetList'));
const Login = React.lazy(() => import('./container/Login'));

const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#f4f7fb] text-slate-800 relative overflow-hidden">
      {/* Light Theme Background Grid Pattern */}
      <div className="fixed inset-0 bg-grid-pattern pointer-events-none opacity-60 z-0"></div>
      
      {/* Soft Ambient Pastel Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] bg-cyan-200/40 rounded-full blur-[140px] pointer-events-none z-0"></div>
      <div className="fixed top-[25%] right-[-10%] w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] bg-teal-200/35 rounded-full blur-[130px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] left-[20%] w-[500px] sm:w-[650px] h-[500px] sm:h-[650px] bg-sky-200/40 rounded-full blur-[150px] pointer-events-none z-0"></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-24 pb-12">
          <Suspense
            fallback={
              <div className="flex justify-center items-center py-24 min-h-[350px]">
                <div className="w-12 h-12 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="sr-only">Loading...</span>
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/history" element={<History />} />
              <Route path="/members" element={<Members />} />
              <Route path="/members-list" element={<Members />} />
              <Route path="/donors" element={<Donors />} />
              <Route path="/committee" element={<Committee />} />
              <Route path="/trusti" element={<Trusti />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/form" element={<OnlineForm />} />
              <Route path="/registration" element={<OnlineForm />} />
              <Route path="/student-marksheet" element={<StudentMarksheet />} />
              <Route path="/marksheet" element={<StudentMarksheet />} />
              <Route path="/student-list" element={<StudentMarksheetList />} />
              <Route path="/admin/marksheets" element={<StudentMarksheetList />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin/login" element={<Login />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
