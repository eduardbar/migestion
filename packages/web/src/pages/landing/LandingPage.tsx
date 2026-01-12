import React from 'react';
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

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="bg-black text-white p-1.5 rounded-lg">
                <LayoutDashboard className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold tracking-tight">MiGestion</span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
              <a href="#features" className="hover:text-black transition-colors">
                Características
              </a>
              <a href="#pricing" className="hover:text-black transition-colors">
                Precios
              </a>
              <a href="#testimonials" className="hover:text-black transition-colors">
                Clientes
              </a>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
              >
                Iniciar Sesión
              </Link>
              <Link
                to="/register"
                className="bg-black text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Prueba Gratis
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-xs font-medium text-gray-600 mb-6">
              <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
              v1.0 Ahora disponible para empresas
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-6 leading-tight">
              Gestión empresarial <br />
              <span className="text-gray-400">sin fricción.</span>
            </h1>
            <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
              El CRM diseñado para negocios que valoran la claridad. Centraliza clientes,
              interacciones y métricas en una plataforma minimalista y potente.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 bg-black text-white px-8 py-4 rounded-xl text-lg font-medium hover:bg-gray-800 transition-all hover:scale-105"
              >
                Comenzar ahora <ArrowRight className="h-5 w-5" />
              </Link>
              <a
                href="#demo"
                className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 border border-gray-200 px-8 py-4 rounded-xl text-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Ver Demo
              </a>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="mt-20 relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-2xl blur opacity-30"></div>
            <div className="relative bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 bg-gray-50/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
              </div>
              <img
                src="https://placehold.co/1200x800/f3f4f6/1f2937?text=MiGestion+Dashboard+Preview"
                alt="Dashboard Preview"
                className="w-full h-auto opacity-90"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Todo lo que necesitas, nada que sobre.
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Hemos eliminado el ruido para que puedas concentrarte en lo que importa: tus clientes
              y tu crecimiento.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Users className="h-6 w-6" />}
              title="Gestión de Clientes"
              description="Perfiles detallados, historial completo y segmentación inteligente para entender mejor a tu audiencia."
            />
            <FeatureCard
              icon={<MessageSquare className="h-6 w-6" />}
              title="Interacciones Reales"
              description="Registro fluido de llamadas, correos y reuniones. Todo sincronizado en tiempo real con tu equipo."
            />
            <FeatureCard
              icon={<BarChart2 className="h-6 w-6" />}
              title="Analítica Accionable"
              description="Dashboards limpios que transforman datos crudos en decisiones estratégicas claras."
            />
            <FeatureCard
              icon={<Shield className="h-6 w-6" />}
              title="Seguridad Enterprise"
              description="Tus datos protegidos con encriptación de nivel bancario, roles granulares y auditoría completa."
            />
            <FeatureCard
              icon={<Zap className="h-6 w-6" />}
              title="Performance Extremo"
              description="Construido con tecnología moderna para cargas instantáneas. No pierdas ni un segundo esperando."
            />
            <FeatureCard
              icon={<PieChart className="h-6 w-6" />}
              title="Reportes Automatizados"
              description="Genera y exporta informes de rendimiento con un solo clic. Mantén a todos informados."
            />
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-md">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Confiado por empresas que lideran el mercado.
              </h2>
              <p className="text-gray-500 mb-8">
                "MiGestion transformó cómo nuestro equipo de ventas opera. La claridad de la
                interfaz y la velocidad del sistema son incomparables."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-200"></div>
                <div>
                  <p className="font-bold text-gray-900">Carlos Méndez</p>
                  <p className="text-sm text-gray-500">CEO, TechSolutions</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8 grayscale opacity-60">
              {/* Placeholders for logos */}
              <div className="h-12 w-32 bg-gray-100 rounded flex items-center justify-center font-bold text-gray-400">
                ACME Corp
              </div>
              <div className="h-12 w-32 bg-gray-100 rounded flex items-center justify-center font-bold text-gray-400">
                Globex
              </div>
              <div className="h-12 w-32 bg-gray-100 rounded flex items-center justify-center font-bold text-gray-400">
                Soylent
              </div>
              <div className="h-12 w-32 bg-gray-100 rounded flex items-center justify-center font-bold text-gray-400">
                Initech
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Listo para profesionalizar tu gestión?</h2>
          <p className="text-xl text-gray-400 mb-10">
            Únete a cientos de empresas que ya han simplificado sus operaciones con MiGestion.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/register"
              className="bg-white text-black px-8 py-4 rounded-xl text-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Crear cuenta gratis
            </Link>
            <Link
              to="/contact"
              className="bg-transparent border border-gray-700 text-white px-8 py-4 rounded-xl text-lg font-medium hover:bg-gray-900 transition-colors"
            >
              Contactar ventas
            </Link>
          </div>
          <p className="mt-8 text-sm text-gray-500">
            Sin tarjeta de crédito requerida • 14 días de prueba • Cancelación en cualquier momento
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="h-5 w-5 text-gray-900" />
            <span className="font-bold text-gray-900">MiGestion</span>
          </div>
          <div className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} MiGestion SaaS. Todos los derechos reservados.
          </div>
          <div className="flex gap-6 text-gray-400">
            <a href="#" className="hover:text-black transition-colors">
              Privacidad
            </a>
            <a href="#" className="hover:text-black transition-colors">
              Términos
            </a>
            <a href="#" className="hover:text-black transition-colors">
              Soporte
            </a>
          </div>
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
  <div className="p-8 rounded-2xl bg-white border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300">
    <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center text-gray-900 mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-500 leading-relaxed">{description}</p>
  </div>
);

export default LandingPage;
