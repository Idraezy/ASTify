import { RouterProvider, Router } from './router';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { UploadPage } from './pages/UploadPage';
import { JobDescriptionPage } from './pages/JobDescriptionPage';
import { ResultsPage } from './pages/ResultsPage';
import { ImprovedResumePage } from './pages/ImprovedResumePage';
import { NotFoundPage } from './pages/NotFoundPage';

function App() {
  const routes = [
    { path: '/', element: <LandingPage /> },
    { path: '/upload', element: <UploadPage /> },
    { path: '/job-description', element: <JobDescriptionPage /> },
    { path: '/results', element: <ResultsPage /> },
    { path: '/improved', element: <ImprovedResumePage /> },
    { path: '/404', element: <NotFoundPage /> },
  ];

  return (
    <ThemeProvider>
      <RouterProvider>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
          <Navbar />
          <Router routes={routes} />
          <Footer />
        </div>
      </RouterProvider>
    </ThemeProvider>
  );
}

export default App;





// import { Router } from './router';
// import { Navbar } from './components/Navbar';
// import { Footer } from './components/Footer';
// import { LandingPage } from './pages/LandingPage';
// import { UploadPage } from './pages/UploadPage';
// import { JobDescriptionPage } from './pages/JobDescriptionPage';
// import { ResultsPage } from './pages/ResultsPage';
// import { ImprovedResumePage } from './pages/ImprovedResumePage';
// import { NotFoundPage } from './pages/NotFoundPage';

// function App() {
//   const routes = [
//     { path: '/', element: <LandingPage /> },
//     { path: '/upload', element: <UploadPage /> },
//     { path: '/job-description', element: <JobDescriptionPage /> },
//     { path: '/results', element: <ResultsPage /> },
//     { path: '/improved', element: <ImprovedResumePage /> },
//     { path: '/404', element: <NotFoundPage /> },
//   ];

//   return (
//     <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
//       <Navbar />
//       <Router routes={routes} />
//       <Footer />
//     </div>
//   );
// }

// export default App;
