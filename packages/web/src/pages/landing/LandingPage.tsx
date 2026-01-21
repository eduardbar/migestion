import { Link } from 'react-router-dom';
import {
  BarChart2,
  Users,
  Shield,
  Zap,
  ArrowRight,
  LayoutDashboard,
  PieChart,
  MessageSquare,
} from 'lucide-react';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-neutral-900 text-white p-1.5 rounded-lg">
                <LayoutDashboard className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold tracking-tight">MiGestion</span>
            </Link>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-600">
              <a href="#features" className="hover:text-neutral-900 transition-colors">
                Características
              </a>
              <a href="#architecture" className="hover:text-neutral-900 transition-colors">
                Arquitectura
              </a>
              <a href="#security" className="hover:text-neutral-900 transition-colors">
                Seguridad
              </a>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                Acceder
              </Link>
              <Link
                to="/register"
                className="bg-neutral-900 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-neutral-800 transition-colors"
              >
                Registrarse
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 text-xs font-medium text-neutral-600 mb-6">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
              v1.0 - CRM SaaS Multi-tenant
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-neutral-900 mb-6 leading-tight">
              CRM moderno para <br />
              <span className="text-neutral-400">negocios locales.</span>
            </h1>
            <p className="text-xl text-neutral-500 mb-10 max-w-2xl mx-auto leading-relaxed">
              Sistema de gestión de relaciones con clientes diseñado para empresas que necesitan
              control total sobre su base de clientes, seguimiento de interacciones y análisis de
              rendimiento.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 bg-neutral-900 text-white px-8 py-4 rounded-xl text-lg font-medium hover:bg-neutral-800 transition-all"
              >
                Comenzar <ArrowRight className="h-5 w-5" />
              </Link>
              <a
                href="#features"
                className="inline-flex items-center justify-center gap-2 bg-white text-neutral-900 border border-neutral-200 px-8 py-4 rounded-xl text-lg font-medium hover:bg-neutral-50 transition-colors"
              >
                Conocer más
              </a>
            </div>
          </div>

          <div className="mt-20 relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 rounded-2xl blur opacity-30"></div>
            <div className="relative bg-white border border-neutral-200 rounded-xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-neutral-100 bg-neutral-50/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-neutral-300"></div>
                  <div className="w-3 h-3 rounded-full bg-neutral-300"></div>
                  <div className="w-3 h-3 rounded-full bg-neutral-300"></div>
                </div>
                <span className="text-xs text-neutral-400 ml-2">MiGestion Dashboard</span>
              </div>
              <svg
                viewBox="0 0 1200 800"
                className="w-full h-auto opacity-90"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="bgGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#f9fafb" />
                    <stop offset="100%" stop-color="#f3f4f6" />
                  </linearGradient>
                  <linearGradient id="areaBlue" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#3b82f6" stopOpacity="0.3" />
                    <stop offset="100%" stop-color="#3b82f6" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="areaGreen" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#10b981" stopOpacity="0.3" />
                    <stop offset="100%" stop-color="#10b981" stopOpacity="0" />
                  </linearGradient>
                </defs>

                <rect width="1200" height="800" fill="url(#bgGradient)" />

                <rect
                  x="0"
                  y="0"
                  width="240"
                  height="800"
                  fill="#ffffff"
                  stroke="#e5e7eb"
                  stroke-width="1"
                />

                <rect x="24" y="24" width="48" height="48" rx="8" fill="#111827" />
                <text
                  x="38"
                  y="55"
                  font-family="sans-serif"
                  font-size="20"
                  font-weight="bold"
                  fill="white"
                >
                  M
                </text>

                <text
                  x="84"
                  y="52"
                  font-family="sans-serif"
                  font-size="18"
                  font-weight="bold"
                  fill="#111827"
                >
                  MiGestion
                </text>

                <rect x="16" y="96" width="208" height="40" rx="6" fill="#111827" />
                <text
                  x="44"
                  y="120"
                  font-family="sans-serif"
                  font-size="14"
                  font-weight="500"
                  fill="white"
                >
                  Dashboard
                </text>

                <text x="44" y="160" font-family="sans-serif" font-size="14" fill="#6b7280">
                  Clientes
                </text>
                <text x="44" y="200" font-family="sans-serif" font-size="14" fill="#6b7280">
                  Interacciones
                </text>
                <text x="44" y="240" font-family="sans-serif" font-size="14" fill="#6b7280">
                  Reportes
                </text>
                <text x="44" y="280" font-family="sans-serif" font-size="14" fill="#6b7280">
                  Configuración
                </text>

                <rect
                  x="0"
                  y="720"
                  width="240"
                  height="80"
                  fill="#ffffff"
                  stroke="#e5e7eb"
                  stroke-width="1"
                />
                <circle cx="40" cy="755" r="20" fill="#e5e7eb" />
                <text
                  x="33"
                  y="760"
                  font-family="sans-serif"
                  font-size="12"
                  font-weight="500"
                  fill="#6b7280"
                >
                  TU
                </text>
                <text
                  x="72"
                  y="750"
                  font-family="sans-serif"
                  font-size="14"
                  font-weight="500"
                  fill="#111827"
                >
                  Test User
                </text>
                <text x="72" y="770" font-family="sans-serif" font-size="12" fill="#6b7280">
                  test@migestion.com
                </text>

                <rect
                  x="260"
                  y="16"
                  width="300"
                  height="36"
                  fill="#ffffff"
                  stroke="#e5e7eb"
                  stroke-width="1"
                  rx="6"
                />
                <rect
                  x="1080"
                  y="16"
                  width="40"
                  height="36"
                  fill="#ffffff"
                  stroke="#e5e7eb"
                  stroke-width="1"
                  rx="6"
                />

                <text
                  x="280"
                  y="40"
                  font-family="sans-serif"
                  font-size="16"
                  font-weight="600"
                  fill="#111827"
                >
                  Bienvenido, Test User
                </text>

                <rect
                  x="280"
                  y="80"
                  width="205"
                  height="88"
                  rx="8"
                  fill="#ffffff"
                  stroke="#e5e7eb"
                  stroke-width="1"
                />
                <text x="296" y="108" font-family="sans-serif" font-size="12" fill="#6b7280">
                  Total Clientes
                </text>
                <text
                  x="296"
                  y="145"
                  font-family="sans-serif"
                  font-size="28"
                  font-weight="600"
                  fill="#111827"
                >
                  248
                </text>

                <rect
                  x="505"
                  y="80"
                  width="205"
                  height="88"
                  rx="8"
                  fill="#ffffff"
                  stroke="#e5e7eb"
                  stroke-width="1"
                />
                <text x="521" y="108" font-family="sans-serif" font-size="12" fill="#6b7280">
                  Clientes Activos
                </text>
                <text
                  x="521"
                  y="145"
                  font-family="sans-serif"
                  font-size="28"
                  font-weight="600"
                  fill="#111827"
                >
                  185
                </text>
                <text x="521" y="163" font-family="sans-serif" font-size="10" fill="#6b7280">
                  75% del total
                </text>

                <rect
                  x="730"
                  y="80"
                  width="205"
                  height="88"
                  rx="8"
                  fill="#ffffff"
                  stroke="#e5e7eb"
                  stroke-width="1"
                />
                <text x="746" y="108" font-family="sans-serif" font-size="12" fill="#6b7280">
                  Interacciones (mes)
                </text>
                <text
                  x="746"
                  y="145"
                  font-family="sans-serif"
                  font-size="28"
                  font-weight="600"
                  fill="#111827"
                >
                  1,247
                </text>
                <text x="746" y="163" font-family="sans-serif" font-size="10" fill="#10b981">
                  +15% vs periodo anterior
                </text>

                <rect
                  x="955"
                  y="80"
                  width="205"
                  height="88"
                  rx="8"
                  fill="#ffffff"
                  stroke="#e5e7eb"
                  stroke-width="1"
                />
                <text x="971" y="108" font-family="sans-serif" font-size="12" fill="#6b7280">
                  Prospectos
                </text>
                <text
                  x="971"
                  y="145"
                  font-family="sans-serif"
                  font-size="28"
                  font-weight="600"
                  fill="#111827"
                >
                  42
                </text>
                <text x="971" y="163" font-family="sans-serif" font-size="10" fill="#6b7280">
                  12 nuevos este periodo
                </text>

                <rect
                  x="280"
                  y="192"
                  width="429"
                  height="256"
                  rx="8"
                  fill="#ffffff"
                  stroke="#e5e7eb"
                  stroke-width="1"
                />
                <rect x="280" y="192" width="429" height="48" rx="8" fill="#ffffff" />
                <text
                  x="296"
                  y="223"
                  font-family="sans-serif"
                  font-size="14"
                  font-weight="600"
                  fill="#111827"
                >
                  Actividad (Ultimos 30 dias)
                </text>
                <rect x="280" y="240" width="429" height="1" fill="#e5e7eb" />

                <rect x="310" y="265" width="369" height="170" fill="#f9fafb" rx="4" />

                <path
                  d="M320 380 L350 360 L380 370 L410 340 L440 350 L470 330 L500 340 L530 320 L560 330 L590 310 L620 320 L650 300 L680 310"
                  stroke="#3b82f6"
                  stroke-width="2"
                  fill="none"
                />
                <path
                  d="M320 380 L350 360 L380 370 L410 340 L440 350 L470 330 L500 340 L530 320 L560 330 L590 310 L620 320 L650 300 L680 310 L680 420 L320 420 Z"
                  fill="url(#areaBlue)"
                />

                <path
                  d="M320 400 L350 390 L380 400 L410 380 L440 390 L470 370 L500 380 L530 360 L560 370 L590 350 L620 360 L650 340 L680 350"
                  stroke="#10b981"
                  stroke-width="2"
                  fill="none"
                />
                <path
                  d="M320 400 L350 390 L380 400 L410 380 L440 390 L470 370 L500 380 L530 360 L560 370 L590 350 L620 360 L650 340 L680 350 L680 420 L320 420 Z"
                  fill="url(#areaGreen)"
                />

                <rect
                  x="731"
                  y="192"
                  width="429"
                  height="256"
                  rx="8"
                  fill="#ffffff"
                  stroke="#e5e7eb"
                  stroke-width="1"
                />
                <text
                  x="747"
                  y="223"
                  font-family="sans-serif"
                  font-size="14"
                  font-weight="600"
                  fill="#111827"
                >
                  Distribucion de Clientes
                </text>
                <rect x="731" y="240" width="429" height="1" fill="#e5e7eb" />

                <circle cx="945" cy="320" r="60" fill="#10b981" opacity="0.9" />
                <circle cx="945" cy="320" r="40" fill="#ffffff" />
                <circle
                  cx="945"
                  cy="320"
                  r="60"
                  fill="none"
                  stroke="#3b82f6"
                  stroke-width="25"
                  stroke-dasharray="100 276"
                />
                <circle
                  cx="945"
                  cy="320"
                  r="60"
                  fill="none"
                  stroke="#f59e0b"
                  stroke-width="25"
                  stroke-dasharray="50 326"
                />
                <circle
                  cx="945"
                  cy="320"
                  r="60"
                  fill="none"
                  stroke="#6b7280"
                  stroke-width="25"
                  stroke-dasharray="30 346"
                />

                <text x="770" y="390" font-family="sans-serif" font-size="12" fill="#10b981">
                  ● Activos
                </text>
                <text x="770" y="410" font-family="sans-serif" font-size="12" fill="#3b82f6">
                  ● Prospectos
                </text>
                <text x="870" y="390" font-family="sans-serif" font-size="12" fill="#f59e0b">
                  ● Leads
                </text>
                <text x="870" y="410" font-family="sans-serif" font-size="12" fill="#6b7280">
                  ● Inactivos
                </text>

                <rect
                  x="280"
                  y="472"
                  width="429"
                  height="280"
                  rx="8"
                  fill="#ffffff"
                  stroke="#e5e7eb"
                  stroke-width="1"
                />
                <text
                  x="296"
                  y="503"
                  font-family="sans-serif"
                  font-size="14"
                  font-weight="600"
                  fill="#111827"
                >
                  Top Clientes por Actividad
                </text>
                <rect x="280" y="520" width="429" height="1" fill="#e5e7eb" />

                <rect x="310" y="545" width="200" height="20" rx="4" fill="#3b82f6" />
                <text x="520" y="560" font-family="sans-serif" font-size="12" fill="#111827">
                  Empresa Alpha
                </text>

                <rect x="310" y="580" width="160" height="20" rx="4" fill="#3b82f6" />
                <text x="480" y="595" font-family="sans-serif" font-size="12" fill="#111827">
                  TecnoSolutions
                </text>

                <rect x="310" y="615" width="140" height="20" rx="4" fill="#3b82f6" />
                <text x="460" y="630" font-family="sans-serif" font-size="12" fill="#111827">
                  GlobalCorp
                </text>

                <rect x="310" y="650" width="110" height="20" rx="4" fill="#3b82f6" />
                <text x="430" y="665" font-family="sans-serif" font-size="12" fill="#111827">
                  InnovateLab
                </text>

                <rect x="310" y="685" width="80" height="20" rx="4" fill="#3b82f6" />
                <text x="400" y="700" font-family="sans-serif" font-size="12" fill="#111827">
                  DataFlow
                </text>

                <rect
                  x="731"
                  y="472"
                  width="429"
                  height="280"
                  rx="8"
                  fill="#ffffff"
                  stroke="#e5e7eb"
                  stroke-width="1"
                />
                <text
                  x="747"
                  y="503"
                  font-family="sans-serif"
                  font-size="14"
                  font-weight="600"
                  fill="#111827"
                >
                  Tipos de Interaccion
                </text>
                <rect x="731" y="520" width="429" height="1" fill="#e5e7eb" />

                <rect x="761" y="545" width="369" height="44" rx="6" fill="#f9fafb" />
                <circle cx="785" cy="567" r="16" fill="#e5e7eb" />
                <text
                  x="780"
                  y="572"
                  font-family="sans-serif"
                  font-size="12"
                  font-weight="500"
                  fill="#6b7280"
                >
                  L
                </text>
                <text x="813" y="572" font-family="sans-serif" font-size="14" fill="#374151">
                  Llamadas
                </text>
                <text
                  x="1080"
                  y="572"
                  font-family="sans-serif"
                  font-size="14"
                  font-weight="500"
                  fill="#111827"
                >
                  342
                </text>

                <rect x="761" y="601" width="369" height="44" rx="6" fill="#f9fafb" />
                <circle cx="785" cy="623" r="16" fill="#e5e7eb" />
                <text
                  x="780"
                  y="628"
                  font-family="sans-serif"
                  font-size="12"
                  font-weight="500"
                  fill="#6b7280"
                >
                  E
                </text>
                <text x="813" y="628" font-family="sans-serif" font-size="14" fill="#374151">
                  Emails
                </text>
                <text
                  x="1080"
                  y="628"
                  font-family="sans-serif"
                  font-size="14"
                  font-weight="500"
                  fill="#111827"
                >
                  512
                </text>

                <rect x="761" y="657" width="369" height="44" rx="6" fill="#f9fafb" />
                <circle cx="785" cy="679" r="16" fill="#e5e7eb" />
                <text
                  x="780"
                  y="684"
                  font-family="sans-serif"
                  font-size="12"
                  font-weight="500"
                  fill="#6b7280"
                >
                  R
                </text>
                <text x="813" y="684" font-family="sans-serif" font-size="14" fill="#374151">
                  Reuniones
                </text>
                <text
                  x="1080"
                  y="684"
                  font-family="sans-serif"
                  font-size="14"
                  font-weight="500"
                  fill="#111827"
                >
                  128
                </text>

                <rect
                  x="280"
                  y="772"
                  width="205"
                  height="88"
                  rx="8"
                  fill="#ffffff"
                  stroke="#e5e7eb"
                  stroke-width="1"
                />
                <text x="296" y="800" font-family="sans-serif" font-size="12" fill="#6b7280">
                  Equipo Total
                </text>
                <text
                  x="296"
                  y="837"
                  font-family="sans-serif"
                  font-size="28"
                  font-weight="600"
                  fill="#111827"
                >
                  12
                </text>

                <rect
                  x="505"
                  y="772"
                  width="205"
                  height="88"
                  rx="8"
                  fill="#ffffff"
                  stroke="#e5e7eb"
                  stroke-width="1"
                />
                <text x="521" y="800" font-family="sans-serif" font-size="12" fill="#6b7280">
                  Usuarios Activos
                </text>
                <text
                  x="521"
                  y="837"
                  font-family="sans-serif"
                  font-size="28"
                  font-weight="600"
                  fill="#111827"
                >
                  8
                </text>

                <rect
                  x="730"
                  y="772"
                  width="205"
                  height="88"
                  rx="8"
                  fill="#ffffff"
                  stroke="#e5e7eb"
                  stroke-width="1"
                />
                <text x="746" y="800" font-family="sans-serif" font-size="12" fill="#6b7280">
                  Total Interacciones
                </text>
                <text
                  x="746"
                  y="837"
                  font-family="sans-serif"
                  font-size="28"
                  font-weight="600"
                  fill="#111827"
                >
                  8,542
                </text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              Funcionalidades principales
            </h2>
            <p className="text-neutral-500 max-w-2xl mx-auto">
              Un conjunto completo de herramientas para gestionar la relación con tus clientes y
              optimizar los procesos de negocio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Users className="h-6 w-6" />}
              title="Gestión de Clientes"
              description="Registro completo de clientes con información de contacto, segmentación, historial de interacciones y seguimiento personalizado."
            />
            <FeatureCard
              icon={<MessageSquare className="h-6 w-6" />}
              title="Registro de Interacciones"
              description="Documentación de llamadas, correos electrónicos, reuniones y notas. Sincronización en tiempo real con el equipo."
            />
            <FeatureCard
              icon={<BarChart2 className="h-6 w-6" />}
              title="Análisis y Reportes"
              description="Dashboard con métricas clave, KPIs personalizados y reportes exportables para seguimiento del rendimiento."
            />
            <FeatureCard
              icon={<Shield className="h-6 w-6" />}
              title="Control de Acceso"
              description="Sistema de roles y permisos (Owner, Admin, Manager, User) con auditoría completa de todas las acciones."
            />
            <FeatureCard
              icon={<Zap className="h-6 w-6" />}
              title="Multi-tenant"
              description="Arquitectura multi-tenant con aislamiento completo de datos por empresa. Escalabilidad garantizada."
            />
            <FeatureCard
              icon={<PieChart className="h-6 w-6" />}
              title="Notificaciones"
              description="Sistema de notificaciones en tiempo real para mantener al equipo informado sobre eventos importantes."
            />
          </div>
        </div>
      </section>

      <section id="architecture" className="py-24 bg-white border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Arquitectura técnica</h2>
            <p className="text-neutral-500 max-w-2xl mx-auto">
              Construido con tecnologías modernas y prácticas de desarrollo empresarial.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <TechItem
                title="Frontend"
                technologies={[
                  'React 18',
                  'TypeScript 5',
                  'Vite 5',
                  'Tailwind CSS',
                  'Zustand 4',
                  'TanStack Query 5',
                ]}
              />
              <TechItem
                title="Backend"
                technologies={['Node.js 20', 'Express 4', 'TypeScript 5', 'Jest', 'Supertest']}
              />
            </div>
            <div className="space-y-6">
              <TechItem
                title="Database"
                technologies={['MySQL 8', 'Prisma ORM', 'Migrations', 'Seed data']}
              />
              <TechItem
                title="Infrastructure"
                technologies={['Redis 7', 'Socket.IO', 'Docker', 'JWT Auth']}
              />
            </div>
          </div>
        </div>
      </section>

      <section id="security" className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Seguridad y Privacidad</h2>
            <p className="text-neutral-500 max-w-2xl mx-auto">
              Implementamos las mejores prácticas de seguridad para proteger los datos de tu
              empresa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <SecurityCard
              title="Encriptación"
              description="Comunicación HTTPS y encriptación de datos sensibles en reposo."
            />
            <SecurityCard
              title="JWT Authentication"
              description="Tokens JWT con refresh token y rotación automática."
            />
            <SecurityCard
              title="RBAC"
              description="Control de acceso basado en roles con permisos granulares."
            />
            <SecurityCard
              title="Auditoría"
              description="Registro completo de todas las acciones en el sistema."
            />
          </div>
        </div>
      </section>

      <section className="py-24 bg-neutral-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Comienza a gestionar hoy</h2>
          <p className="text-xl text-neutral-400 mb-10">
            Regístrate y comienza a usar el sistema de gestión de clientes para tu negocio local.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/register"
              className="bg-white text-neutral-900 px-8 py-4 rounded-xl text-lg font-bold hover:bg-neutral-100 transition-colors"
            >
              Crear cuenta
            </Link>
            <Link
              to="/login"
              className="bg-transparent border border-neutral-700 text-white px-8 py-4 rounded-xl text-lg font-medium hover:bg-neutral-800 transition-colors"
            >
              Iniciar sesión
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-white border-t border-neutral-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="h-5 w-5 text-neutral-900" />
            <span className="font-bold text-neutral-900">MiGestion</span>
          </div>
          <div className="text-sm text-neutral-500">&copy; 2026 eduard barrera</div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="p-8 rounded-2xl bg-white border border-neutral-100 hover:border-neutral-200 transition-all duration-300">
    <div className="w-12 h-12 bg-neutral-50 rounded-lg flex items-center justify-center text-neutral-900 mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-neutral-900 mb-3">{title}</h3>
    <p className="text-neutral-500 leading-relaxed">{description}</p>
  </div>
);

const TechItem = ({ title, technologies }: { title: string; technologies: string[] }) => (
  <div className="p-6 rounded-xl bg-white border border-neutral-100">
    <h3 className="text-lg font-bold text-neutral-900 mb-3">{title}</h3>
    <div className="flex flex-wrap gap-2">
      {technologies.map(tech => (
        <span key={tech} className="px-3 py-1 bg-neutral-100 text-neutral-700 text-sm rounded-full">
          {tech}
        </span>
      ))}
    </div>
  </div>
);

const SecurityCard = ({ title, description }: { title: string; description: string }) => (
  <div className="p-6 rounded-xl bg-white border border-neutral-100">
    <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center mb-4">
      <Shield className="h-5 w-5 text-neutral-900" />
    </div>
    <h3 className="text-lg font-bold text-neutral-900 mb-2">{title}</h3>
    <p className="text-neutral-500 text-sm leading-relaxed">{description}</p>
  </div>
);

export default LandingPage;
