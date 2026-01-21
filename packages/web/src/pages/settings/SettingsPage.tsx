import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { User, Building2, Shield, Eye, EyeOff, Check, AlertCircle } from 'lucide-react';
import { Card, Button, Input, Alert } from '@/components/ui';
import { useAuthStore } from '@/stores';
import { ROLE_LABELS } from '@/lib/constants';
import {
  updateProfile,
  changePassword,
  type UpdateProfileInput,
  type ChangePasswordInput,
} from '@/services/users.service';
import { STORAGE_KEYS } from '@/lib/constants';
import type { User as UserType, Tenant } from '@/types';

/**
 * Settings page.
 * User profile, security, and organization settings with tabbed interface.
 */

// ─────────────────────────────────────────
// Constants
// ─────────────────────────────────────────

type SettingsTab = 'profile' | 'security' | 'company';

const TABS: { id: SettingsTab; label: string; icon: typeof User }[] = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'company', label: 'Company', icon: Building2 },
];

// ─────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────

export function SettingsPage() {
  const { user, tenant, setAuth } = useAuthStore();
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900">Settings</h1>
        <p className="text-sm text-neutral-500 mt-1">Manage your account and preferences</p>
      </div>

      {/* User Info Card */}
      <Card className="p-6">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center text-xl font-medium text-primary-600">
            {user?.firstName.charAt(0)}
            {user?.lastName.charAt(0)}
          </div>
          <div>
            <h2 className="text-lg font-medium text-neutral-900">
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="text-sm text-neutral-500">{user?.email}</p>
            <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-primary-100 text-primary-700 rounded">
              {user?.role && ROLE_LABELS[user.role]}
            </span>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-neutral-200">
          <p className="text-sm text-neutral-500">
            <span className="font-medium text-neutral-700">Company:</span> {tenant?.name}
          </p>
        </div>
      </Card>

      {/* Tab Navigation */}
      <div className="border-b border-neutral-200">
        <nav className="flex gap-4">
          {TABS.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  isActive
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'profile' && user && tenant && (
          <ProfileTab user={user} tenant={tenant} setAuth={setAuth} />
        )}
        {activeTab === 'security' && <SecurityTab />}
        {activeTab === 'company' && tenant && <CompanyTab tenant={tenant} userRole={user?.role} />}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// Profile Tab
// ─────────────────────────────────────────

interface ProfileTabProps {
  user: UserType;
  tenant: Tenant;
  setAuth: (user: UserType, tenant: Tenant) => void;
}

function ProfileTab({ user, tenant, setAuth }: ProfileTabProps) {
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
  });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: (data: UpdateProfileInput) => updateProfile(data),
    onSuccess: updatedUser => {
      // Update local storage and store
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));
      setAuth(updatedUser, tenant);
      setSuccessMessage('Profile updated successfully');
      setTimeout(() => setSuccessMessage(null), 3000);
    },
  });

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const hasChanges = formData.firstName !== user.firstName || formData.lastName !== user.lastName;

  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium text-neutral-900 mb-6">Profile Information</h3>

      {successMessage && (
        <Alert variant="success" className="mb-6">
          <Check className="h-4 w-4" />
          <span>{successMessage}</span>
        </Alert>
      )}

      {mutation.isError && (
        <Alert variant="error" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <span>
            {mutation.error instanceof Error ? mutation.error.message : 'Failed to update profile'}
          </span>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Input
            label="First Name"
            value={formData.firstName}
            onChange={e => handleChange('firstName', e.target.value)}
            required
          />
          <Input
            label="Last Name"
            value={formData.lastName}
            onChange={e => handleChange('lastName', e.target.value)}
            required
          />
        </div>

        <Input
          label="Email"
          type="email"
          value={user.email}
          disabled
          hint="Email cannot be changed"
        />

        <div className="flex justify-end">
          <Button type="submit" disabled={!hasChanges} loading={mutation.isPending}>
            Save Changes
          </Button>
        </div>
      </form>
    </Card>
  );
}

// ─────────────────────────────────────────
// Security Tab
// ─────────────────────────────────────────

function SecurityTab() {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: (data: ChangePasswordInput) => changePassword(data),
    onSuccess: () => {
      setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setSuccessMessage('Password changed successfully');
      setTimeout(() => setSuccessMessage(null), 3000);
    },
  });

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setValidationError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate passwords match
    if (formData.newPassword !== formData.confirmPassword) {
      setValidationError('New passwords do not match');
      return;
    }

    // Validate password strength
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
    if (formData.newPassword.length < 8) {
      setValidationError('Password must be at least 8 characters');
      return;
    }
    if (!passwordRegex.test(formData.newPassword)) {
      setValidationError(
        'Password must contain at least one lowercase letter, one uppercase letter, and one number'
      );
      return;
    }

    mutation.mutate({
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword,
    });
  };

  const canSubmit = formData.currentPassword && formData.newPassword && formData.confirmPassword;

  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium text-neutral-900 mb-6">Change Password</h3>

      {successMessage && (
        <Alert variant="success" className="mb-6">
          <Check className="h-4 w-4" />
          <span>{successMessage}</span>
        </Alert>
      )}

      {(mutation.isError || validationError) && (
        <Alert variant="error" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <span>
            {validationError ||
              (mutation.error instanceof Error
                ? mutation.error.message
                : 'Failed to change password')}
          </span>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
        <div className="relative">
          <Input
            label="Current Password"
            type={showCurrentPassword ? 'text' : 'password'}
            value={formData.currentPassword}
            onChange={e => handleChange('currentPassword', e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            className="absolute right-3 top-9 text-neutral-400 hover:text-neutral-600"
          >
            {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>

        <div className="relative">
          <Input
            label="New Password"
            type={showNewPassword ? 'text' : 'password'}
            value={formData.newPassword}
            onChange={e => handleChange('newPassword', e.target.value)}
            hint="Minimum 8 characters with uppercase, lowercase, and number"
            required
          />
          <button
            type="button"
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute right-3 top-9 text-neutral-400 hover:text-neutral-600"
          >
            {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>

        <Input
          label="Confirm New Password"
          type="password"
          value={formData.confirmPassword}
          onChange={e => handleChange('confirmPassword', e.target.value)}
          required
        />

        <div className="flex justify-end">
          <Button type="submit" disabled={!canSubmit} loading={mutation.isPending}>
            Change Password
          </Button>
        </div>
      </form>
    </Card>
  );
}

// ─────────────────────────────────────────
// Company Tab
// ─────────────────────────────────────────

interface CompanyTabProps {
  tenant: Tenant;
  userRole?: string;
}

function CompanyTab({ tenant, userRole }: CompanyTabProps) {
  const isOwner = userRole === 'owner';

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-medium text-neutral-900 mb-6">Company Information</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Company Name</label>
            <Input
              value={tenant.name}
              disabled={!isOwner}
              hint={!isOwner ? 'Only the owner can modify company settings' : undefined}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Company Slug</label>
            <Input value={tenant.slug} disabled hint="The unique identifier for your company" />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Company ID</label>
            <div className="flex items-center gap-2">
              <Input value={tenant.id} disabled className="font-mono text-sm" />
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(tenant.id);
                }}
              >
                Copy
              </Button>
            </div>
          </div>
        </div>

        {isOwner && (
          <div className="mt-6 flex justify-end">
            <Button disabled>Save Changes</Button>
          </div>
        )}
      </Card>
    </div>
  );
}
