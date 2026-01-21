import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button, Input, Card, Alert } from '@/components/ui';
import { authService } from '@/services';
import { useAuthStore } from '@/stores';
import { ApiRequestError } from '@/services/api';
import { ROUTES } from '@/lib/constants';

/**
 * Login page component.
 * Clean, minimal design following the design system.
 */

const loginSchema = z.object({
  email: z.string().email('Ingresa un email válido'),
  password: z.string().min(1, 'La contraseña es requerida'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginPage() {
  const navigate = useNavigate();
  const setAuth = useAuthStore(state => state.setAuth);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError(null);
      const response = await authService.login(data);
      setAuth(response.user, response.tenant);
      navigate(ROUTES.DASHBOARD);
    } catch (err) {
      if (err instanceof ApiRequestError) {
        setError(err.message);
      } else {
        setError('Ha ocurrido un error. Intenta de nuevo.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-neutral-900">MiGestion</h1>
          <p className="text-neutral-500 mt-2">Inicia sesión en tu cuenta</p>
        </div>

        <Card>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 p-6">
            {error && (
              <Alert variant="error" onClose={() => setError(null)}>
                {error}
              </Alert>
            )}

            <Input
              label="Email"
              type="email"
              placeholder="tu@email.com"
              autoComplete="email"
              leftIcon={<Mail className="h-4 w-4" />}
              error={errors.email?.message}
              {...register('email')}
            />

            <Input
              label="Contraseña"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              autoComplete="current-password"
              leftIcon={<Lock className="h-4 w-4" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="focus:outline-none"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              }
              error={errors.password?.message}
              {...register('password')}
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="rounded border-neutral-300 text-neutral-900 focus:ring-neutral-500"
                />
                <span className="text-neutral-600">Recordarme</span>
              </label>

              <Link to="/forgot-password" className="text-neutral-600 hover:text-neutral-900">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <Button type="submit" className="w-full" loading={isSubmitting}>
              Iniciar sesión
            </Button>
          </form>
        </Card>

        <p className="text-center text-sm text-neutral-600 mt-6">
          ¿No tienes una cuenta?{' '}
          <Link to={ROUTES.REGISTER} className="font-medium text-neutral-900 hover:underline">
            Regístrate gratis
          </Link>
        </p>
      </div>
    </div>
  );
}
