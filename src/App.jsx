import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import React from "react";
import Mainlayout from "./layouts/Mainlayout";
import Homepage from "./pages/Homepage";
import Jobspage from "./pages/Jobspage";
import NotFoundPage from "./pages/NotFoundPage";
import Jobpage, { Loaderjob } from "./pages/Jobpage";
import Addjobpage from "./pages/Addjobpage";
import EditJobPage from "./pages/EditJobPage";

const App = () => {

  // Add New Job
  const addJob = async (newJob) => {
    const res = await fetch("http://localhost:8000/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newJob),
    });
    return;
  };

  // Delete Job
  const deleteJob = async (id) => {
    const res = await fetch(`http://localhost:8000/jobs/${id}`, {
      method: "DELETE",
    });
    return;
  };

   // Update Job
   const updateJob = async (job) => {
    const res = await fetch(`http://localhost:8000/jobs/${job.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(job),
    });
    return;
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Mainlayout />}>
        <Route index element={<Homepage />} />
        <Route path="/jobs" element={<Jobspage />} />
        <Route
          path="/jobs/:id"
          element={<Jobpage deleteJob={deleteJob} />}
          loader={Loaderjob}
        />
        <Route
          path="/edit-job/:id"
          element={<EditJobPage updateJobSubmit={updateJob} />}
          loader={Loaderjob}
        />
        <Route path="/add-job" element={<Addjobpage addJobSubmit={addJob} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
