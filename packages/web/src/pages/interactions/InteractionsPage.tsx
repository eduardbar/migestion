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
  useTableSelection,
  Modal,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ModalFooter,
  Select,
  Badge,
  PaginationContainer,
} from '@/components/ui';
import { useInteractionsStore } from '@/stores';
import type { Interaction, InteractionType } from '@/types';
import type { CreateInteractionInput } from '@/services/interactions.service';

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
  }, [fetchInteractions, fetchStats]);

  // Handle sort changes
  useEffect(() => {
    if (sortConfig.key && sortConfig.direction) {
      setFilters({
        sortBy: sortConfig.key as 'createdAt' | 'type',
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
    if (!notes || typeof notes !== 'string') return '—';
    if (notes.length <= 100) return notes;
    return notes.substring(0, 100) + '...';
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

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <Input
              placeholder="Search interactions..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="pl-10"
            />
            <Button
              variant="secondary"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {showFilters && (
            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-neutral-200">
              <div className="w-full sm:w-48">
                <Select
                  options={TYPE_OPTIONS}
                  value={filters.type || ''}
                  onChange={(e) => handleTypeFilter(e.target.value)}
                  placeholder="Type"
                />
              </div>
              {filters.type && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setFilters({ type: undefined })}
                  >
                  <X className="h-4 w-4 mr-1" />
                  Clear filters
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Table */}
      <Card>
        <Table loading={isLoading}>
          <TableHeader>
            <TableRow>
              <TableHead
                sortable
                sortKey="type"
                currentSort={sortConfig}
                onSort={handleSort}
              >
                Type
              </TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead>Created By</TableHead>
              <TableHead
                sortable
                sortKey="createdAt"
                currentSort={sortConfig}
                onSort={handleSort}
                >
                Date
              </TableHead>
              <TableHead className="w-16"></TableHead>
              <TableHead />
            </TableRow>
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
                      <div className="h-6 w-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-xs font-medium">
                        {interaction.user?.firstName && interaction.user.lastName
                          ? `${interaction.user.firstName.charAt(0)}${interaction.user.lastName.charAt(0)}`
                          : '?'
                        }
                      </div>
                      <span className="text-sm text-neutral-600">
                        {interaction.user ? (
                          <>{interaction.user.firstName} {interaction.user.lastName}</>
                        ) : (
                          <span className="text-neutral-400">Unknown User</span>
                        )}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    {/* Client info would come from joined data */}
                    Client #{interaction.clientId.slice(0, 8)}
                  </TableCell>
                  <TableCell className="text-neutral-500 max-w-xs">
                    {truncateNotes(interaction.notes)}
                  </TableCell>
                  <TableCell className="text-neutral-500">
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditModal(interaction)}
                        >
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
                  <TableCell className="text-neutral-500">
                    {formatDate(interaction.createdAt)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditModal(interaction)}
                        >
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
        clients={[]}
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
        clients={[]}
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
