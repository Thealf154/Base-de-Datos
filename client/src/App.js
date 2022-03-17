import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { AuthProvider } from "./lib/authContext";
import RecoverPassword from "./components/login/RecoverPassword";
import LoginPage from "./components/login/LoginPage";
import Dashboard from "./components/dashboard/Dashboard";
import Layout from "./components/Layout";
import Home from "./components/dashboard/home/Home";
import Teachers from "./components/dashboard/teachers/Teachers";
import Administrator from "./components/dashboard/administrator/Administrator";
import Students from "./components/dashboard/students/Students";
import Subjects from "./components/dashboard/subjects/Subjects";
import Incidents from "./components/dashboard/incidents/Incidents";
import useTheme from "./hooks/themeHook";
import "./App.css";

function App() {
  useTheme();

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Layout />}>
              <Route path="login" element={<LoginPage />} />
              <Route path="recover-password" element={<RecoverPassword />} />
              <Route path="dashboard" element={<Dashboard />}>
                <Route path="inicio" element={<Home />} />
                <Route path="materias" element={<Subjects />} />
                <Route path="docentes" element={<Teachers />} />
                <Route path="alumnos" element={<Students />} />
                <Route path="incidencias" element={<Incidents />} />
                <Route path="admin" element={<Administrator />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
