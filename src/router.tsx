import React from "react";

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from "./pages/Landing";
import TeacherForm from "./pages/TeacherForm";
import TeacherList from "./pages/TeacherList";


function Router() {
    return (
        <BrowserRouter>

            <Routes>
                <Route path="/" element={<Landing />} />

                <Route path="/study" element={<TeacherList />} />

                <Route path="/give-classes" element={<TeacherForm />} />

            </Routes>
        </BrowserRouter>
    )
}


export default Router