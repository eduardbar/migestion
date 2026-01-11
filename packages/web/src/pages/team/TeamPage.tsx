import { useEffect, useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Users, 
  Pencil, 
  Trash2, 
  X,
  ShieldCheck,
  UserMinus,
  UserPlus,
} from 'lucide-react';
import {
  Button,
  Input,
  Card,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableEmpty,
  useTableSort,
  Modal,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ModalFooter,
  ConfirmDialog,
  Select,
  Badge,
  PaginationContainer,
} from '@/components/ui';
import { useUsersStore, useAuthStore } from '@/stores';
import type { UserRole } from '@/types';
import type { TeamMember, InviteUserInput } from '@/services/users.service';

/**
 * Team management page.
 * Allows inviting, editing roles, and managing team members.
 */

const STATUS_OPTIONS = [
  { value: '', label: 'All statuses' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'pending', label: 'Pending' },
];

const ROLE_OPTIONS = [
  { value: '', label: 'All roles' },
  { value: 'owner', label: 'Owner' },
  { value: 'admin', label: 'Admin' },
  { value: 'manager', label: 'Manager' },
  { value: 'user', label: 'User' },
];

const ROLE_BADGE_VARIANTS: Record<UserRole, 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info'> = {
  owner: 'primary',
  admin: 'warning',
  manager: 'info',
  user: 'default',
};

const STATUS_BADGE_VARIANTS: Record<string, 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info'> = {
  active: 'success',
  inactive: 'error',
  pending: 'warning',
};

export function TeamPage() {
  const { user: currentUser } = useAuthStore();
  const {
    users,
    pagination,
    filters,
    isLoading,
    isSubmitting,
    error,
    fetchUsers,
    fetchStats,
    inviteUser,
    updateUser,
    changeRole,
    deactivateUser,
    reactivateUser,
    removeUser,
    setFilters,
    setPage,
    clearError,
  } = useUsersStore();

  // Local state
  const [searchValue, setSearchValue] = useState(filters.search || '');
  const [showFilters, setShowFilters] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<TeamMember | null>(null);
  const [statusAction, setStatusAction] = useState<'activate' | 'deactivate'>('deactivate');

  // Table hooks
  const { sortConfig, handleSort } = useTableSort(
    filters.sortBy, 
    filters.sortOrder as 'asc' | 'desc'
  );

  // Initial data fetch
  useEffect(() => {
    fetchUsers();
    fetchStats();
  }, [fetchUsers, fetchStats]);

  // Handle sort changes
  useEffect(() => {
    if (sortConfig.key && sortConfig.direction) {
      setFilters({
        sortBy: sortConfig.key as 'firstName' | 'lastName' | 'email' | 'role' | 'createdAt',
        sortOrder: sortConfig.direction,
      });
    }
  }, [sortConfig, setFilters]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchValue !== filters.search) {
        setFilters({ search: searchValue || undefined });
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchValue, filters.search, setFilters]);

  // Permission checks
  const canManageUsers = currentUser?.role === 'owner' || currentUser?.role === 'admin';
  const canChangeRole = (targetUser: TeamMember) => {
    if (currentUser?.role === 'owner') return true;
    if (currentUser?.role === 'admin' && targetUser.role !== 'owner') return true;
    return false;
  };

  // Handlers
  const handleStatusFilter = (status: string) => {
    setFilters({ status: status as 'active' | 'inactive' | 'pending' | undefined });
  };

  const handleRoleFilter = (role: string) => {
    setFilters({ role: role as UserRole | undefined });
  };

  const openInviteModal = () => {
    setIsInviteModalOpen(true);
  };

  const openEditModal = (user: TeamMember) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const openRoleModal = (user: TeamMember) => {
    setSelectedUser(user);
    setIsRoleModalOpen(true);
  };

  const openDeleteDialog = (user: TeamMember) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  const openStatusDialog = (user: TeamMember, action: 'activate' | 'deactivate') => {
    setSelectedUser(user);
    setStatusAction(action);
    setIsStatusDialogOpen(true);
  };

  const closeModals = () => {
    setIsInviteModalOpen(false);
    setIsEditModalOpen(false);
    setIsRoleModalOpen(false);
    setIsDeleteDialogOpen(false);
    setIsStatusDialogOpen(false);
    setSelectedUser(null);
    clearError();
  };

  const handleDelete = async () => {
    if (selectedUser) {
      try {
        await removeUser(selectedUser.id);
        closeModals();
      } catch {
        // Error is handled by store
      }
    }
  };

  const handleStatusChange = async () => {
    if (selectedUser) {
      try {
        if (statusAction === 'deactivate') {
          await deactivateUser(selectedUser.id);
        } else {
          await reactivateUser(selectedUser.id);
        }
        closeModals();
      } catch {
        // Error is handled by store
      }
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900">Team</h1>
          <p className="text-sm text-neutral-500 mt-1">
            Manage your team members and their roles
          </p>
        </div>
        {canManageUsers && (
          <Button onClick={openInviteModal}>
            <Plus className="h-4 w-4 mr-2" />
            Invite Member
          </Button>
        )}
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <Input
                placeholder="Search team members..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button 
              variant="secondary" 
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {(filters.status || filters.role) && (
                <span className="ml-2 h-5 w-5 rounded-full bg-primary-600 text-white text-xs flex items-center justify-center">
                  {[filters.status, filters.role].filter(Boolean).length}
                </span>
              )}
            </Button>
          </div>

          {showFilters && (
            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-neutral-200">
              <div className="w-full sm:w-48">
                <Select
                  options={STATUS_OPTIONS}
                  value={filters.status || ''}
                  onChange={(e) => handleStatusFilter(e.target.value)}
                  placeholder="Status"
                />
              </div>
              <div className="w-full sm:w-48">
                <Select
                  options={ROLE_OPTIONS}
                  value={filters.role || ''}
                  onChange={(e) => handleRoleFilter(e.target.value)}
                  placeholder="Role"
                />
              </div>
              {(filters.status || filters.role) && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setFilters({ status: undefined, role: undefined })}
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear filters
                </Button>
              )}
            </div>
          )}
        </div>
      </Card>

      {/* Table */}
      <Card>
        <Table loading={isLoading}>
          <TableHeader>
            <TableRow>
              <TableHead 
                sortable 
                sortKey="firstName" 
                currentSort={sortConfig}
                onSort={handleSort}
              >
                Name
              </TableHead>
              <TableHead 
                sortable 
                sortKey="email" 
                currentSort={sortConfig}
                onSort={handleSort}
              >
                Email
              </TableHead>
              <TableHead 
                sortable 
                sortKey="role" 
                currentSort={sortConfig}
                onSort={handleSort}
              >
                Role
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead 
                sortable 
                sortKey="lastLoginAt" 
                currentSort={sortConfig}
                onSort={handleSort}
              >
                Last Login
              </TableHead>
              <TableHead className="w-16" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 && !isLoading ? (
              <TableEmpty
                colSpan={6}
                icon={<Users className="h-12 w-12" />}
                title="No team members found"
                description={
                  filters.search || filters.status || filters.role
                    ? "Try adjusting your search or filters"
                    : "Get started by inviting your first team member"
                }
                action={
                  canManageUsers && !filters.search && !filters.status && !filters.role && (
                    <Button onClick={openInviteModal}>
                      <Plus className="h-4 w-4 mr-2" />
                      Invite Member
                    </Button>
                  )
                }
              />
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-sm font-medium">
                        {user.firstName[0]}{user.lastName[0]}
                      </div>
                      <div>
                        <div>{user.firstName} {user.lastName}</div>
                        {user.id === currentUser?.id && (
                          <span className="text-xs text-neutral-500">(You)</span>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-neutral-500">{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={ROLE_BADGE_VARIANTS[user.role]}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={STATUS_BADGE_VARIANTS[user.status] || 'default'}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-neutral-500">
                    {formatDate(user.lastLoginAt)}
                  </TableCell>
                  <TableCell>
                    {canManageUsers && user.id !== currentUser?.id && (
                      <div className="flex items-center gap-1">
                        {canChangeRole(user) && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => openRoleModal(user)}
                            title="Change role"
                          >
                            <ShieldCheck className="h-4 w-4" />
                          </Button>
                        )}
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => openEditModal(user)}
                          title="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        {user.status === 'active' ? (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => openStatusDialog(user, 'deactivate')}
                            title="Deactivate"
                          >
                            <UserMinus className="h-4 w-4 text-warning-500" />
                          </Button>
                        ) : (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => openStatusDialog(user, 'activate')}
                            title="Activate"
                          >
                            <UserPlus className="h-4 w-4 text-success-500" />
                          </Button>
                        )}
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => openDeleteDialog(user)}
                          title="Remove"
                        >
                          <Trash2 className="h-4 w-4 text-error-500" />
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="p-4 border-t border-neutral-200">
            <PaginationContainer
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              pageSize={pagination.limit}
              totalItems={pagination.total}
              onPageChange={setPage}
            />
          </div>
        )}
      </Card>

      {/* Invite Modal */}
      <InviteUserModal
        open={isInviteModalOpen}
        onClose={closeModals}
        onSubmit={async (data) => {
          await inviteUser(data);
          closeModals();
        }}
        isSubmitting={isSubmitting}
        error={error}
      />

      {/* Edit Modal */}
      <EditUserModal
        open={isEditModalOpen}
        onClose={closeModals}
        onSubmit={async (data) => {
          if (selectedUser) {
            await updateUser(selectedUser.id, data);
            closeModals();
          }
        }}
        user={selectedUser}
        isSubmitting={isSubmitting}
        error={error}
      />

      {/* Change Role Modal */}
      <ChangeRoleModal
        open={isRoleModalOpen}
        onClose={closeModals}
        onSubmit={async (role) => {
          if (selectedUser) {
            await changeRole(selectedUser.id, role);
            closeModals();
          }
        }}
        user={selectedUser}
        currentUserRole={currentUser?.role || 'user'}
        isSubmitting={isSubmitting}
        error={error}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={isDeleteDialogOpen}
        onClose={closeModals}
        onConfirm={handleDelete}
        title="Remove Team Member"
        description={`Are you sure you want to remove "${selectedUser?.firstName} ${selectedUser?.lastName}" from your team? This action cannot be undone.`}
        confirmText="Remove"
        variant="danger"
        loading={isSubmitting}
      />

      {/* Status Change Confirmation */}
      <ConfirmDialog
        open={isStatusDialogOpen}
        onClose={closeModals}
        onConfirm={handleStatusChange}
        title={statusAction === 'deactivate' ? 'Deactivate User' : 'Activate User'}
        description={
          statusAction === 'deactivate'
            ? `Are you sure you want to deactivate "${selectedUser?.firstName} ${selectedUser?.lastName}"? They will no longer be able to access the system.`
            : `Are you sure you want to activate "${selectedUser?.firstName} ${selectedUser?.lastName}"? They will regain access to the system.`
        }
        confirmText={statusAction === 'deactivate' ? 'Deactivate' : 'Activate'}
        variant={statusAction === 'deactivate' ? 'danger' : 'primary'}
        loading={isSubmitting}
      />
    </div>
  );
}

// ─────────────────────────────────────────
// Invite User Modal Component
// ─────────────────────────────────────────

interface InviteUserModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: InviteUserInput) => Promise<void>;
  isSubmitting: boolean;
  error: string | null;
}

function InviteUserModal({
  open,
  onClose,
  onSubmit,
  isSubmitting,
  error,
}: InviteUserModalProps) {
  const [formData, setFormData] = useState<InviteUserInput>({
    email: '',
    firstName: '',
    lastName: '',
    role: 'user',
  });

  useEffect(() => {
    if (open) {
      setFormData({
        email: '',
        firstName: '',
        lastName: '',
        role: 'user',
      });
    }
  }, [open]);

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const roleOptions = [
    { value: 'user', label: 'User' },
    { value: 'manager', label: 'Manager' },
    { value: 'admin', label: 'Admin' },
  ];

  return (
    <Modal open={open} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <ModalHeader>
          <ModalTitle>Invite Team Member</ModalTitle>
          <ModalDescription>
            Send an invitation to join your team.
          </ModalDescription>
        </ModalHeader>

        <ModalBody className="space-y-4">
          {error && (
            <div className="p-3 text-sm text-error-700 bg-error-50 rounded-md">
              {error}
            </div>
          )}

          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="First Name"
              value={formData.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              required
            />
            <Input
              label="Last Name"
              value={formData.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
              required
            />
          </div>

          <Select
            label="Role"
            options={roleOptions}
            value={formData.role}
            onChange={(e) => handleChange('role', e.target.value)}
          />
        </ModalBody>

        <ModalFooter>
          <Button variant="secondary" type="button" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" loading={isSubmitting}>
            Send Invitation
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}

// ─────────────────────────────────────────
// Edit User Modal Component
// ─────────────────────────────────────────

interface EditUserModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { firstName?: string; lastName?: string }) => Promise<void>;
  user: TeamMember | null;
  isSubmitting: boolean;
  error: string | null;
}

function EditUserModal({
  open,
  onClose,
  onSubmit,
  user,
  isSubmitting,
  error,
}: EditUserModalProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
  });

  useEffect(() => {
    if (open && user) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
      });
    }
  }, [open, user]);

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <ModalHeader>
          <ModalTitle>Edit Team Member</ModalTitle>
          <ModalDescription>
            Update team member information.
          </ModalDescription>
        </ModalHeader>

        <ModalBody className="space-y-4">
          {error && (
            <div className="p-3 text-sm text-error-700 bg-error-50 rounded-md">
              {error}
            </div>
          )}

          <Input
            label="First Name"
            value={formData.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            required
          />
          <Input
            label="Last Name"
            value={formData.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            required
          />
        </ModalBody>

        <ModalFooter>
          <Button variant="secondary" type="button" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" loading={isSubmitting}>
            Save Changes
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}

// ─────────────────────────────────────────
// Change Role Modal Component
// ─────────────────────────────────────────

interface ChangeRoleModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (role: UserRole) => Promise<void>;
  user: TeamMember | null;
  currentUserRole: UserRole;
  isSubmitting: boolean;
  error: string | null;
}

function ChangeRoleModal({
  open,
  onClose,
  onSubmit,
  user,
  currentUserRole,
  isSubmitting,
  error,
}: ChangeRoleModalProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole>('user');

  useEffect(() => {
    if (open && user) {
      setSelectedRole(user.role);
    }
  }, [open, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(selectedRole);
  };

  // Build role options based on current user's permissions
  const roleOptions = [
    { value: 'user', label: 'User', description: 'Basic access to view and manage assigned clients' },
    { value: 'manager', label: 'Manager', description: 'Can manage clients and view team reports' },
    { value: 'admin', label: 'Admin', description: 'Full access except owner-level actions' },
  ];

  if (currentUserRole === 'owner') {
    roleOptions.push({ 
      value: 'owner', 
      label: 'Owner', 
      description: 'Complete system access and control' 
    });
  }

  return (
    <Modal open={open} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <ModalHeader>
          <ModalTitle>Change Role</ModalTitle>
          <ModalDescription>
            Update the role for {user?.firstName} {user?.lastName}.
          </ModalDescription>
        </ModalHeader>

        <ModalBody className="space-y-4">
          {error && (
            <div className="p-3 text-sm text-error-700 bg-error-50 rounded-md">
              {error}
            </div>
          )}

          <div className="space-y-2">
            {roleOptions.map((option) => (
              <label
                key={option.value}
                className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedRole === option.value
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value={option.value}
                  checked={selectedRole === option.value}
                  onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                  className="mt-1"
                />
                <div>
                  <div className="font-medium text-neutral-900">{option.label}</div>
                  <div className="text-sm text-neutral-500">{option.description}</div>
                </div>
              </label>
            ))}
          </div>
        </ModalBody>

        <ModalFooter>
          <Button variant="secondary" type="button" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" loading={isSubmitting} disabled={selectedRole === user?.role}>
            Update Role
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}
