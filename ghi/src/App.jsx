import { BrowserRouter, Routes, Route } from "react-router-dom";
import Application from './components/Application';
import ViewApplications from './components/ViewApplications';
import Home from './components/Home';
import NavBar from "./components/NavBar";

function App() {
  return (
    <BrowserRouter>
    <NavBar />
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/application" element={<Application />} />
        <Route path="/view-applications" element={<ViewApplications />} />
      </Routes>
    </>
    </BrowserRouter>
  );
}

export default App;







// import { useState } from 'react';
// import Application from './components/Application';
// import ViewApplications from './components/ViewApplications';


// function App() {

//   return (
//     <>
//       <Application />
//       <ViewApplications />
//     </>
//   )
// }

// export default App
