import { createBrowserRouter, Navigate, Route, createRoutesFromElements } from 'react-router-dom'
import AdminLayout from '../components/admin/AdminLayout'
import ProtectedAdminRoute from './ProtectedAdminRoute'
import PublicLandingPage from '../pages/PublicLandingPage'
import AdminLoginPage from '../pages/admin/AdminLoginPage'
import AnalyticsPage from '../pages/admin/AnalyticsPage'
import DashboardHomePage from '../pages/admin/DashboardHomePage'
import SettingsPage from '../pages/admin/SettingsPage'
import SubmissionDetailPage from '../pages/admin/SubmissionDetailPage'
import SubmissionsPage from '../pages/admin/SubmissionsPage'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<PublicLandingPage />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route element={<ProtectedAdminRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardHomePage />} />
          <Route path="submissions" element={<SubmissionsPage />} />
          <Route path="submissions/:id" element={<SubmissionDetailPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </>,
  ),
  {
    basename: import.meta.env.BASE_URL,
  },
)
