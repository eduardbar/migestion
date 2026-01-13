import { useEffect, useState } from 'react';
import {
  Plus,
  Search,
  Filter,
  MessageSquare,
  Pencil,
  Trash2,
  X,
  Phone,
  Mail,
  Calendar,
  FileText,
  CheckSquare,
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
import { useInteractionsStore, useClientsStore } from '@/stores';
import type { Interaction, InteractionType } from '@/types';
import type { CreateInteractionInput } from '@/services/interactions.service';

/**
 * Interactions page.
 * Full activity log with filtering, search, and CRUD.
 */

const TYPE_OPTIONS = [
  { value: '', label: 'All types' },
  { value: 'call', label: 'Call' },
  { value: 'email', label: 'Email' },
  { value: 'meeting', label: 'Meeting' },
  { value: 'note', label: 'Note' },
  { value: 'task', label: 'Task' },
];

const TYPE_ICONS: Record<InteractionType, React.ReactNode> = {
  call: <Phone className="h-4 w-4" />,
  email: <Mail className="h-4 w-4" />,
  meeting: <Calendar className="h-4 w-4" />,
  note: <FileText className="h-4 w-4" />,
  task: <CheckSquare className="h-4 w-4" />,
};

const TYPE_BADGE_VARIANTS: Record<
  InteractionType,
  'default' | 'primary' | 'success' | 'warning' | 'error' | 'info'
> = {
  call: 'primary',
  email: 'info',
  meeting: 'success',
  note: 'default',
  task: 'warning',
};

export function InteractionsPage() {
  const {
    interactions,
    pagination,
    filters,
    stats,
    isLoading,
    isSubmitting,
    error,
    fetchInteractions,
    fetchStats,
    createInteraction,
    updateInteraction,
    deleteInteraction,
    setFilters,
    setPage,
    clearError,
  } = useInteractionsStore();

  const { clients, fetchClients } = useClientsStore();

  // Local state
  const [searchValue, setSearchValue] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedInteraction, setSelectedInteraction] = useState<Interaction | null>(null);

  // Table hooks
  const { sortConfig, handleSort } = useTableSort(
    filters.sortBy,
    filters.sortOrder as 'asc' | 'desc'
  );

  // Initial data fetch
  useEffect(() => {
    fetchInteractions();
    fetchStats();
    fetchClients();
  }, [fetchInteractions, fetchStats, fetchClients]);

  // Handle sort changes
  useEffect(() => {
    if (sortConfig.key && sortConfig.direction) {
      setFilters({
        sortBy: sortConfig.key as 'createdAt' | 'type',
        sortOrder: sortConfig.direction,
      });
    }
  }, [sortConfig, setFilters]);

  // Handlers
  const handleTypeFilter = (type: string) => {
    setFilters({ type: (type as InteractionType) || undefined });
  };

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const openEditModal = (interaction: Interaction) => {
    setSelectedInteraction(interaction);
    setIsEditModalOpen(true);
  };

  const openDeleteDialog = (interaction: Interaction) => {
    setSelectedInteraction(interaction);
    setIsDeleteDialogOpen(true);
  };

  const closeModals = () => {
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteDialogOpen(false);
    setSelectedInteraction(null);
    clearError();
  };

  const handleDelete = async () => {
    if (selectedInteraction) {
      try {
        await deleteInteraction(selectedInteraction.id);
        closeModals();
      } catch {
        // Error is handled by store
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const truncateNotes = (notes: string | null) => {
    if (!notes) return '—';
    if (notes.length <= 100) return notes;
    return notes.slice(0, 100) + '...';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900">Interactions</h1>
          <p className="text-sm text-neutral-500 mt-1">Activity log and communication history</p>
        </div>
        <Button onClick={openCreateModal}>
          <Plus className="h-4 w-4 mr-2" />
          New Interaction
        </Button>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card className="p-4">
            <div className="text-2xl font-semibold text-neutral-900">{stats.total}</div>
            <div className="text-sm text-neutral-500">Total</div>
          </Card>
          {Object.entries(stats.byType || {}).map(([type, count]) => (
            <Card key={type} className="p-4">
              <div className="flex items-center gap-2">
                <span className="text-neutral-400">{TYPE_ICONS[type as InteractionType]}</span>
                <div>
                  <div className="text-xl font-semibold text-neutral-900">{count}</div>
                  <div className="text-sm text-neutral-500 capitalize">{type}s</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <Input
                placeholder="Search interactions..."
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="secondary" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {filters.type && (
                <span className="ml-2 h-5 w-5 rounded-full bg-primary-600 text-white text-xs flex items-center justify-center">
                  1
                </span>
              )}
            </Button>
          </div>

          {showFilters && (
            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-neutral-200">
              <div className="w-full sm:w-48">
                <Select
                  options={TYPE_OPTIONS}
                  value={filters.type || ''}
                  onChange={e => handleTypeFilter(e.target.value)}
                  placeholder="Type"
                />
              </div>
              {filters.type && (
                <Button variant="ghost" size="sm" onClick={() => setFilters({ type: undefined })}>
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
              <TableHead sortable sortKey="type" currentSort={sortConfig} onSort={handleSort}>
                Type
              </TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead>Created By</TableHead>
              <TableHead sortable sortKey="createdAt" currentSort={sortConfig} onSort={handleSort}>
                Date
              </TableHead>
              <TableHead className="w-16" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {interactions.length === 0 && !isLoading ? (
              <TableEmpty
                colSpan={6}
                icon={<MessageSquare className="h-12 w-12" />}
                title="No interactions found"
                description={
                  filters.type
                    ? 'Try adjusting your filters'
                    : 'Get started by logging your first interaction'
                }
                action={
                  !filters.type && (
                    <Button onClick={openCreateModal}>
                      <Plus className="h-4 w-4 mr-2" />
                      Log Interaction
                    </Button>
                  )
                }
              />
            ) : (
              interactions.map(interaction => (
                <TableRow key={interaction.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-neutral-400">{TYPE_ICONS[interaction.type]}</span>
                      <Badge variant={TYPE_BADGE_VARIANTS[interaction.type]}>
                        {interaction.type.charAt(0).toUpperCase() + interaction.type.slice(1)}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    {/* Client info would come from joined data */}
                    Client #{interaction.clientId.slice(0, 8)}
                  </TableCell>
                  <TableCell className="text-neutral-500 max-w-xs">
                    {truncateNotes(interaction.notes)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-xs font-medium">
                        {interaction.user?.firstName && interaction.user.lastName
                          ? `${interaction.user.firstName.charAt(0)}${interaction.user.lastName.charAt(0)}`
                          : '?'}
                      </div>
                      <span className="text-sm text-neutral-600">
                        {interaction.user?.firstName || ''} {interaction.user?.lastName || ''}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-neutral-500">
                    {formatDate(interaction.createdAt)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" onClick={() => openEditModal(interaction)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openDeleteDialog(interaction)}
                      >
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
      <InteractionFormModal
        open={isCreateModalOpen}
        onClose={closeModals}
        onSubmit={async data => {
          await createInteraction(data);
          closeModals();
        }}
        clients={clients}
        isSubmitting={isSubmitting}
        error={error}
      />

      {/* Edit Modal */}
      <InteractionFormModal
        open={isEditModalOpen}
        onClose={closeModals}
        onSubmit={async data => {
          if (selectedInteraction) {
            await updateInteraction(selectedInteraction.id, {
              type: data.type,
              notes: data.notes,
              metadata: data.metadata,
            });
            closeModals();
          }
        }}
        interaction={selectedInteraction}
        clients={clients}
        isSubmitting={isSubmitting}
        error={error}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={isDeleteDialogOpen}
        onClose={closeModals}
        onConfirm={handleDelete}
        title="Delete Interaction"
        description="Are you sure you want to delete this interaction? This action cannot be undone."
        confirmText="Delete"
        variant="danger"
        loading={isSubmitting}
      />
    </div>
  );
}

// ─────────────────────────────────────────
// Interaction Form Modal Component
// ─────────────────────────────────────────

interface InteractionFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateInteractionInput) => Promise<void>;
  interaction?: Interaction | null;
  clients: { id: string; companyName: string }[];
  isSubmitting: boolean;
  error: string | null;
}

function InteractionFormModal({
  open,
  onClose,
  onSubmit,
  interaction,
  clients,
  isSubmitting,
  error,
}: InteractionFormModalProps) {
  const [formData, setFormData] = useState<CreateInteractionInput>({
    clientId: '',
    type: 'call',
    notes: '',
  });

  useEffect(() => {
    if (open) {
      if (interaction) {
        setFormData({
          clientId: interaction.clientId,
          type: interaction.type,
          notes: interaction.notes || '',
        });
      } else {
        setFormData({
          clientId: '',
          type: 'call',
          notes: '',
        });
      }
    }
  }, [open, interaction]);

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const isEditing = !!interaction;

  const typeOptions = [
    { value: 'call', label: 'Phone Call' },
    { value: 'email', label: 'Email' },
    { value: 'meeting', label: 'Meeting' },
    { value: 'note', label: 'Note' },
    { value: 'task', label: 'Task' },
  ];

  const clientOptions = clients.map(c => ({
    value: c.id,
    label: c.companyName,
  }));

  return (
    <Modal open={open} onClose={onClose} size="lg">
      <form onSubmit={handleSubmit}>
        <ModalHeader>
          <ModalTitle>{isEditing ? 'Edit Interaction' : 'New Interaction'}</ModalTitle>
          <ModalDescription>
            {isEditing
              ? 'Update the interaction details below.'
              : 'Log a new interaction with a client.'}
          </ModalDescription>
        </ModalHeader>

        <ModalBody className="space-y-4">
          {error && (
            <div className="p-3 text-sm text-error-700 bg-error-50 rounded-md">{error}</div>
          )}

          {!isEditing && (
            <Select
              label="Client"
              options={clientOptions}
              value={formData.clientId}
              onChange={e => handleChange('clientId', e.target.value)}
              required
            />
          )}

          <Select
            label="Type"
            options={typeOptions}
            value={formData.type}
            onChange={e => handleChange('type', e.target.value as InteractionType)}
          />

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-neutral-700">Notes</label>
            <textarea
              className="w-full px-3 py-2 text-sm rounded border border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:border-primary-500 focus:ring-primary-500 hover:border-neutral-400 transition-colors duration-150 resize-none"
              rows={4}
              value={formData.notes}
              onChange={e => handleChange('notes', e.target.value)}
              placeholder="Add notes about this interaction..."
            />
          </div>
        </ModalBody>

        <ModalFooter>
          <Button variant="secondary" type="button" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" loading={isSubmitting} disabled={!isEditing && !formData.clientId}>
            {isEditing ? 'Save Changes' : 'Log Interaction'}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}
