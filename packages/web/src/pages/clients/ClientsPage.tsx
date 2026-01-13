import { useEffect, useState } from 'react';
import { Plus, Search, Filter, Users, Pencil, Trash2, X } from 'lucide-react';
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
  TableCheckbox,
  TableEmpty,
  useTableSort,
  useTableSelection,
  Modal,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ModalFooter,
  ConfirmDialog,
  Select,
  StatusBadge,
  PaginationContainer,
} from '@/components/ui';
import { useClientsStore } from '@/stores';
import type { Client, ClientStatus, CreateClientInput } from '@/types';

/**
 * Clients page.
 * Full CRUD functionality with search, filters, sorting, and bulk actions.
 */

const CLIENT_STATUS_OPTIONS = [
  { value: '', label: 'All statuses' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'prospect', label: 'Prospect' },
  { value: 'churned', label: 'Churned' },
];

const STATUS_OPTIONS = [
  { value: 'prospect', label: 'Prospect' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'churned', label: 'Churned' },
];

export function ClientsPage() {
  const {
    clients,
    pagination,
    filters,
    segments,
    isLoading,
    isSubmitting,
    error,
    fetchClients,
    fetchSegments,
    fetchStats,
    createClient,
    updateClient,
    deleteClient,
    setFilters,
    setPage,
    clearError,
  } = useClientsStore();

  // Local state
  const [searchValue, setSearchValue] = useState(filters.search || '');
  const [showFilters, setShowFilters] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedClientForAction, setSelectedClientForAction] = useState<Client | null>(null);

  // Table hooks
  const { sortConfig, handleSort } = useTableSort(
    filters.sortBy,
    filters.sortOrder as 'asc' | 'desc'
  );
  const selection = useTableSelection(clients);

  // Initial data fetch
  useEffect(() => {
    fetchClients();
    fetchSegments();
    fetchStats();
  }, [fetchClients, fetchSegments, fetchStats]);

  // Handle sort changes
  useEffect(() => {
    if (sortConfig.key && sortConfig.direction) {
      setFilters({
        sortBy: sortConfig.key as
          | 'companyName'
          | 'contactName'
          | 'createdAt'
          | 'updatedAt'
          | 'status',
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

  // Handlers
  const handleStatusFilter = (status: string) => {
    setFilters({ status: (status as ClientStatus) || undefined });
  };

  const handleSegmentFilter = (segment: string) => {
    setFilters({ segment: segment || undefined });
  };

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const openEditModal = (client: Client) => {
    setSelectedClientForAction(client);
    setIsEditModalOpen(true);
  };

  const openDeleteDialog = (client: Client) => {
    setSelectedClientForAction(client);
    setIsDeleteDialogOpen(true);
  };

  const closeModals = () => {
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteDialogOpen(false);
    setSelectedClientForAction(null);
    clearError();
  };

  const handleDelete = async () => {
    if (selectedClientForAction) {
      try {
        await deleteClient(selectedClientForAction.id);
        closeModals();
      } catch {
        // Error is handled by store
      }
    }
  };

  const segmentOptions = [
    { value: '', label: 'All segments' },
    ...segments.map(s => ({ value: s, label: s })),
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900">Clients</h1>
          <p className="text-sm text-neutral-500 mt-1">Manage your client portfolio</p>
        </div>
        <Button onClick={openCreateModal}>
          <Plus className="h-4 w-4 mr-2" />
          New Client
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <Input
                placeholder="Search clients..."
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="secondary" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {(filters.status || filters.segment) && (
                <span className="ml-2 h-5 w-5 rounded-full bg-primary-600 text-white text-xs flex items-center justify-center">
                  {[filters.status, filters.segment].filter(Boolean).length}
                </span>
              )}
            </Button>
          </div>

          {showFilters && (
            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-neutral-200">
              <div className="w-full sm:w-48">
                <Select
                  options={CLIENT_STATUS_OPTIONS}
                  value={filters.status || ''}
                  onChange={e => handleStatusFilter(e.target.value)}
                  placeholder="Status"
                />
              </div>
              <div className="w-full sm:w-48">
                <Select
                  options={segmentOptions}
                  value={filters.segment || ''}
                  onChange={e => handleSegmentFilter(e.target.value)}
                  placeholder="Segment"
                />
              </div>
              {(filters.status || filters.segment) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setFilters({ status: undefined, segment: undefined })}
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear filters
                </Button>
              )}
            </div>
          )}
        </div>
      </Card>

      {/* Bulk Actions */}
      {selection.selectedIds.size > 0 && (
        <Card className="p-4 bg-primary-50 border-primary-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-primary-700">
              {selection.selectedIds.size} client{selection.selectedIds.size > 1 ? 's' : ''}{' '}
              selected
            </span>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" onClick={selection.clearSelection}>
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Table */}
      <Card>
        <Table loading={isLoading}>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <TableCheckbox
                  checked={selection.isAllSelected}
                  indeterminate={selection.isSomeSelected}
                  onChange={selection.toggleAll}
                />
              </TableHead>
              <TableHead
                sortable
                sortKey="companyName"
                currentSort={sortConfig}
                onSort={handleSort}
              >
                Company
              </TableHead>
              <TableHead
                sortable
                sortKey="contactName"
                currentSort={sortConfig}
                onSort={handleSort}
              >
                Contact
              </TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead sortable sortKey="status" currentSort={sortConfig} onSort={handleSort}>
                Status
              </TableHead>
              <TableHead>Segment</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead className="w-16" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.length === 0 && !isLoading ? (
              <TableEmpty
                colSpan={9}
                icon={<Users className="h-12 w-12" />}
                title="No clients found"
                description={
                  filters.search || filters.status || filters.segment
                    ? 'Try adjusting your search or filters'
                    : 'Get started by adding your first client'
                }
                action={
                  !filters.search &&
                  !filters.status &&
                  !filters.segment && (
                    <Button onClick={openCreateModal}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Client
                    </Button>
                  )
                }
              />
            ) : (
              clients.map(client => (
                <TableRow key={client.id} selected={selection.isSelected(client.id)} clickable>
                  <TableCell>
                    <TableCheckbox
                      checked={selection.isSelected(client.id)}
                      onChange={() => selection.toggleItem(client.id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{client.companyName}</TableCell>
                  <TableCell>{client.contactName}</TableCell>
                  <TableCell className="text-neutral-500">{client.email || '—'}</TableCell>
                  <TableCell className="text-neutral-500">{client.phone || '—'}</TableCell>
                  <TableCell>
                    <StatusBadge status={client.status} />
                  </TableCell>
                  <TableCell className="text-neutral-500">{client.segment || '—'}</TableCell>
                  <TableCell className="text-neutral-500">
                    {client.assignedTo?.firstName && client.assignedTo?.lastName
                      ? `${client.assignedTo.firstName} ${client.assignedTo.lastName}`
                      : '—'}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" onClick={() => openEditModal(client)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => openDeleteDialog(client)}>
                        <Trash2 className="h-4 w-4 text-error-500" />
                      </Button>
                    </div>
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

      {/* Create Modal */}
      <ClientFormModal
        open={isCreateModalOpen}
        onClose={closeModals}
        onSubmit={async data => {
          await createClient(data);
          closeModals();
        }}
        isSubmitting={isSubmitting}
        error={error}
      />

      {/* Edit Modal */}
      <ClientFormModal
        open={isEditModalOpen}
        onClose={closeModals}
        onSubmit={async data => {
          if (selectedClientForAction) {
            await updateClient(selectedClientForAction.id, data);
            closeModals();
          }
        }}
        client={selectedClientForAction}
        isSubmitting={isSubmitting}
        error={error}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={isDeleteDialogOpen}
        onClose={closeModals}
        onConfirm={handleDelete}
        title="Delete Client"
        description={`Are you sure you want to delete "${selectedClientForAction?.companyName}"? This action cannot be undone.`}
        confirmText="Delete"
        variant="danger"
        loading={isSubmitting}
      />
    </div>
  );
}

// ─────────────────────────────────────────
// Client Form Modal Component
// ─────────────────────────────────────────

interface ClientFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateClientInput) => Promise<void>;
  client?: Client | null;
  isSubmitting: boolean;
  error: string | null;
}

function ClientFormModal({
  open,
  onClose,
  onSubmit,
  client,
  isSubmitting,
  error,
}: ClientFormModalProps) {
  const [formData, setFormData] = useState<CreateClientInput>({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    status: 'prospect',
    segment: '',
    address: '',
    notes: '',
  });

  // Reset form when modal opens/closes or client changes
  useEffect(() => {
    if (open) {
      if (client) {
        setFormData({
          companyName: client.companyName,
          contactName: client.contactName,
          email: client.email || '',
          phone: client.phone || '',
          status: client.status,
          segment: client.segment || '',
          address: client.address || '',
          notes: client.notes || '',
        });
      } else {
        setFormData({
          companyName: '',
          contactName: '',
          email: '',
          phone: '',
          status: 'prospect',
          segment: '',
          address: '',
          notes: '',
        });
      }
    }
  }, [open, client]);

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const isEditing = !!client;

  return (
    <Modal open={open} onClose={onClose} size="lg">
      <form onSubmit={handleSubmit}>
        <ModalHeader>
          <ModalTitle>{isEditing ? 'Edit Client' : 'New Client'}</ModalTitle>
          <ModalDescription>
            {isEditing
              ? 'Update client information below.'
              : 'Fill in the details to create a new client.'}
          </ModalDescription>
        </ModalHeader>

        <ModalBody className="space-y-4">
          {error && (
            <div className="p-3 text-sm text-error-700 bg-error-50 rounded-md">{error}</div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Company Name"
              value={formData.companyName}
              onChange={e => handleChange('companyName', e.target.value)}
              required
            />
            <Input
              label="Contact Name"
              value={formData.contactName}
              onChange={e => handleChange('contactName', e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={e => handleChange('email', e.target.value)}
            />
            <Input
              label="Phone"
              value={formData.phone}
              onChange={e => handleChange('phone', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Status"
              options={STATUS_OPTIONS}
              value={formData.status}
              onChange={e => handleChange('status', e.target.value)}
            />
            <Input
              label="Segment"
              value={formData.segment}
              onChange={e => handleChange('segment', e.target.value)}
              placeholder="e.g., Enterprise, SMB"
            />
          </div>

          <Input
            label="Address"
            value={formData.address}
            onChange={e => handleChange('address', e.target.value)}
          />

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-neutral-700">Notes</label>
            <textarea
              className="w-full px-3 py-2 text-sm rounded border border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:border-primary-500 focus:ring-primary-500 hover:border-neutral-400 transition-colors duration-150 resize-none"
              rows={3}
              value={formData.notes}
              onChange={e => handleChange('notes', e.target.value)}
              placeholder="Additional notes about this client..."
            />
          </div>
        </ModalBody>

        <ModalFooter>
          <Button variant="secondary" type="button" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" loading={isSubmitting}>
            {isEditing ? 'Save Changes' : 'Create Client'}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}
