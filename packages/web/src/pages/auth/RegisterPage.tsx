import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Building, Eye, EyeOff } from 'lucide-react';
import { Button, Input, Card, Alert } from '@/components/ui';
import { authService } from '@/services';
import { useAuthStore } from '@/stores';
import { ApiRequestError } from '@/services/api';
import { ROUTES } from '@/lib/constants';

/**
 * Registration page component.
 * Creates a new tenant (company) with an owner user.
 */

const registerSchema = z.object({
  companyName: z
    .string()
    .min(2, 'El nombre de la empresa debe tener al menos 2 caracteres')
    .max(100),
  slug: z
    .string()
    .min(3, 'El identificador debe tener al menos 3 caracteres')
    .max(50)
    .regex(/^[a-z0-9-]+$/, 'Solo letras minúsculas, números y guiones'),
  firstName: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').max(100),
  lastName: z.string().min(2, 'El apellido debe tener al menos 2 caracteres').max(100),
  email: z.string().email('Ingresa un email válido'),
  password: z
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
    .regex(/[a-z]/, 'Debe contener al menos una minúscula')
    .regex(/\d/, 'Debe contener al menos un número'),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterPage() {
  const navigate = useNavigate();
  const setAuth = useAuthStore(state => state.setAuth);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  // Auto-generate slug from company name
  const handleCompanyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const slug = value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    setValue('slug', slug);
  };

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setError(null);
      const response = await authService.register(data);
      setAuth(response.user, response.tenant);
      navigate(ROUTES.DASHBOARD);
    } catch (err) {
      if (err instanceof ApiRequestError) {
        if (err.code === 'DUPLICATE_EMAIL') {
          setError('Este email ya está registrado');
        } else if (err.code === 'DUPLICATE_SLUG') {
          setError('Este identificador ya está en uso');
        } else {
          setError(err.message);
        }
      } else {
        setError('Ha ocurrido un error. Intenta de nuevo.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-neutral-900">MiGestion</h1>
          <p className="text-neutral-500 mt-2">Crea tu cuenta empresarial</p>
        </div>

        <Card>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 p-6">
            {error && (
              <Alert variant="error" onClose={() => setError(null)}>
                {error}
              </Alert>
            )}

            {/* Company Info */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-neutral-700">Información de la empresa</h3>

              <Input
                label="Nombre de la empresa"
                placeholder="Mi Empresa S.A."
                leftIcon={<Building className="h-4 w-4" />}
                error={errors.companyName?.message}
                {...register('companyName', {
                  onChange: handleCompanyNameChange,
                })}
              />

              <Input
                label="Identificador único"
                placeholder="mi-empresa"
                hint="Se usará en tu URL: mi-empresa.migestion.com"
                error={errors.slug?.message}
                {...register('slug')}
              />
            </div>

            {/* User Info */}
            <div className="space-y-4 pt-4 border-t border-neutral-200">
              <h3 className="text-sm font-medium text-neutral-700">Tu información</h3>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Nombre"
                  placeholder="Juan"
                  leftIcon={<User className="h-4 w-4" />}
                  error={errors.firstName?.message}
                  {...register('firstName')}
                />

                <Input
                  label="Apellido"
                  placeholder="Pérez"
                  error={errors.lastName?.message}
                  {...register('lastName')}
                />
              </div>

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
                autoComplete="new-password"
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
                hint="Mínimo 8 caracteres, una mayúscula, una minúscula y un número"
                error={errors.password?.message}
                {...register('password')}
              />
            </div>

            <Button type="submit" className="w-full" loading={isSubmitting}>
              Crear cuenta
            </Button>

            <p className="text-xs text-neutral-500 text-center">
              Al registrarte, aceptas nuestros{' '}
              <a href="#" className="underline">
                Términos de Servicio
              </a>{' '}
              y{' '}
              <a href="#" className="underline">
                Política de Privacidad
              </a>
            </p>
          </form>
        </Card>

        <p className="text-center text-sm text-neutral-600 mt-6">
          ¿Ya tienes una cuenta?{' '}
          <Link to={ROUTES.LOGIN} className="font-medium text-neutral-900 hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
