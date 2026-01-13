import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/stores';
import { authService } from '@/services';
import { ROUTES, STORAGE_KEYS } from '@/lib/constants';
import { getInitials } from '@/lib/utils';
import { NotificationBell, NotificationToast } from '@/components/notifications';
import { ErrorBoundary } from '@/components/ui';

/**
 * Dashboard layout with sidebar navigation.
 * Minimal, professional design.
 */

const navigation = [
  { name: 'Dashboard', href: ROUTES.DASHBOARD, icon: LayoutDashboard },
  { name: 'Clientes', href: ROUTES.CLIENTS, icon: Users },
  { name: 'Interacciones', href: ROUTES.INTERACTIONS, icon: MessageSquare },
  { name: 'Reportes', href: ROUTES.REPORTS, icon: BarChart3 },
  { name: 'Configuración', href: ROUTES.SETTINGS, icon: Settings },
];

export function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, tenant, clearAuth } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
    await authService.logout(refreshToken || undefined);
    clearAuth();
    navigate(ROUTES.LOGIN);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-neutral-200 transition-transform lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-neutral-200">
          <Link to={ROUTES.DASHBOARD} className="font-bold text-lg text-neutral-900">
            MiGestion
          </Link>
          <button
            className="lg:hidden p-1 rounded hover:bg-neutral-100"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tenant info */}
        <div className="px-6 py-4 border-b border-neutral-200">
          <p className="text-sm font-medium text-neutral-900 truncate">{tenant?.name}</p>
          <p className="text-xs text-neutral-500 truncate">{tenant?.slug}.migestion.com</p>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navigation.map(item => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-neutral-100 text-neutral-900'
                    : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                )}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-neutral-200 flex items-center justify-center text-sm font-medium text-neutral-600">
              {user?.firstName && user?.lastName && getInitials(user.firstName, user.lastName)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-neutral-900 truncate">
                {user?.firstName || ''} {user?.lastName || ''}
              </p>
              <p className="text-xs text-neutral-500 truncate">{user?.email || ''}</p>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-neutral-900 truncate">
                {user?.firstName || ''} {user?.lastName || ''}
              </p>
              <p className="text-xs text-neutral-500 truncate">{user?.email || ''}</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 rounded hover:bg-neutral-100 text-neutral-500 hover:text-neutral-700"
              title="Cerrar sesión"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 h-16 bg-white border-b border-neutral-200 flex items-center justify-between px-4 lg:px-8">
          <button
            className="lg:hidden p-2 rounded hover:bg-neutral-100"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex-1" />

          {/* Notifications */}
          <NotificationBell />
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-8">
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </main>
      </div>

      {/* Toast notifications */}
      <NotificationToast />
    </div>
  );
}
