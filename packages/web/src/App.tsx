import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/stores';
import { ROUTES } from '@/lib/constants';
import { Spinner } from '@/components/ui';
import { SocketProvider } from '@/contexts';

// Layouts - imported directly (always needed)
import { DashboardLayout } from '@/layouts/DashboardLayout';

// Auth pages - imported directly (entry points)
import { LoginPage, RegisterPage } from '@/pages/auth';

// ─────────────────────────────────────────
// Lazy-loaded pages (code splitting)
// ─────────────────────────────────────────

const LandingPage = lazy(() => import('@/pages/landing').then(m => ({ default: m.LandingPage })));

const DashboardPage = lazy(() =>
  import('@/pages/dashboard').then(m => ({ default: m.DashboardPage }))
);

const ClientsPage = lazy(() => import('@/pages/clients').then(m => ({ default: m.ClientsPage })));

const InteractionsPage = lazy(() =>
  import('@/pages/interactions').then(m => ({ default: m.InteractionsPage }))
);

const ReportsPage = lazy(() => import('@/pages/reports').then(m => ({ default: m.ReportsPage })));

const SettingsPage = lazy(() =>
  import('@/pages/settings').then(m => ({ default: m.SettingsPage }))
);

const NotificationsPage = lazy(() =>
  import('@/pages/notifications').then(m => ({ default: m.NotificationsPage }))
);

const AuditPage = lazy(() => import('@/pages/audit').then(m => ({ default: m.AuditPage })));

// ─────────────────────────────────────────
// Loading Fallback Component
// ─────────────────────────────────────────

function PageLoader() {
  return (
    <div className="flex items-center justify-center h-64">
      <Spinner size="md" />
    </div>
  );
}

// ─────────────────────────────────────────
// Route Guards
// ─────────────────────────────────────────

/**
 * Private route wrapper.
 * Redirects to login if user is not authenticated.
 */
function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <>{children}</>;
}

/**
 * Public route wrapper.
 * Redirects to dashboard if user is already authenticated.
 */
function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return <>{children}</>;
}

// ─────────────────────────────────────────
// Main Application
// ─────────────────────────────────────────

/**
 * Main application component.
 * Sets up routing with code splitting and auth initialization.
 */
export default function App() {
  const { initialize } = useAuthStore();

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <SocketProvider>
      <BrowserRouter>
        <Routes>
          {/* Landing route - Public */}
          <Route
            path="/"
            element={
              <PublicRoute>
                <Suspense fallback={<PageLoader />}>
                  <LandingPage />
                </Suspense>
              </PublicRoute>
            }
          />

          {/* Public routes */}
          <Route
            path={ROUTES.LOGIN}
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path={ROUTES.REGISTER}
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          />

          {/* Protected routes with dashboard layout */}
          <Route
            element={
              <PrivateRoute>
                <DashboardLayout />
              </PrivateRoute>
            }
          >
            <Route
              path={ROUTES.DASHBOARD}
              element={
                <Suspense fallback={<PageLoader />}>
                  <DashboardPage />
                </Suspense>
              }
            />
            <Route
              path={ROUTES.CLIENTS}
              element={
                <Suspense fallback={<PageLoader />}>
                  <ClientsPage />
                </Suspense>
              }
            />
            <Route
              path={ROUTES.CLIENT_DETAIL}
              element={
                <Suspense fallback={<PageLoader />}>
                  <ClientsPage />
                </Suspense>
              }
            />
            <Route
              path={ROUTES.INTERACTIONS}
              element={
                <Suspense fallback={<PageLoader />}>
                  <InteractionsPage />
                </Suspense>
              }
            />
            <Route
              path={ROUTES.REPORTS}
              element={
                <Suspense fallback={<PageLoader />}>
                  <ReportsPage />
                </Suspense>
              }
            />
            <Route
              path={ROUTES.SETTINGS}
              element={
                <Suspense fallback={<PageLoader />}>
                  <SettingsPage />
                </Suspense>
              }
            />
            <Route
              path={ROUTES.NOTIFICATIONS}
              element={
                <Suspense fallback={<PageLoader />}>
                  <NotificationsPage />
                </Suspense>
              }
            />
            <Route
              path={ROUTES.AUDIT}
              element={
                <Suspense fallback={<PageLoader />}>
                  <AuditPage />
                </Suspense>
              }
            />
          </Route>

          {/* 404 - redirect to dashboard */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </SocketProvider>
  );
}
