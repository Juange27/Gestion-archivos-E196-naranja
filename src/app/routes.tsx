import { createBrowserRouter, Navigate } from "react-router";
import { Layout } from "./components/Layout";
import { Login } from "./components/Login";
import { Dashboard } from "./components/Dashboard";
import { FileExplorer } from "./components/FileExplorer";
import { Upload } from "./components/Upload";
import { FilePreview } from "./components/FilePreview";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  return isLoggedIn ? children : <Navigate to="/" replace />;
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/",
    Component: Layout,
    children: [
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        )
      },
      {
        path: "files",
        element: (
          <ProtectedRoute>
            <FileExplorer />
          </ProtectedRoute>
        )
      },
      {
        path: "files/:fileId",
        element: (
          <ProtectedRoute>
            <FilePreview />
          </ProtectedRoute>
        )
      },
      {
        path: "upload",
        element: (
          <ProtectedRoute>
            <Upload />
          </ProtectedRoute>
        )
      },
    ],
  },
]);
