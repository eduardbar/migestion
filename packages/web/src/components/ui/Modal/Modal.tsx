import {
  type ReactNode,
  type HTMLAttributes,
  forwardRef,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { Button } from '../Button';

/**
 * Modal component system.
 * Accessible dialog with backdrop, focus trap, and keyboard handling.
 * 
 * @example
 * ```tsx
 * <Modal open={isOpen} onClose={() => setIsOpen(false)}>
 *   <ModalHeader>
 *     <ModalTitle>Edit Client</ModalTitle>
 *   </ModalHeader>
 *   <ModalBody>
 *     <form>...</form>
 *   </ModalBody>
 *   <ModalFooter>
 *     <Button variant="secondary" onClick={onClose}>Cancel</Button>
 *     <Button>Save</Button>
 *   </ModalFooter>
 * </Modal>
 * ```
 */

// ─────────────────────────────────────────
// Types
// ─────────────────────────────────────────

type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  size?: ModalSize;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  className?: string;
}

const sizeStyles: Record<ModalSize, string> = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]',
};

// ─────────────────────────────────────────
// Modal Root
// ─────────────────────────────────────────

export function Modal({
  open,
  onClose,
  children,
  size = 'md',
  closeOnBackdrop = true,
  closeOnEscape = true,
  showCloseButton = true,
  className,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Handle escape key
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (closeOnEscape && event.key === 'Escape') {
        onClose();
      }
    },
    [closeOnEscape, onClose]
  );

  // Handle backdrop click
  const handleBackdropClick = useCallback(
    (event: React.MouseEvent) => {
      if (closeOnBackdrop && event.target === event.currentTarget) {
        onClose();
      }
    },
    [closeOnBackdrop, onClose]
  );

  // Focus management and body scroll lock
  useEffect(() => {
    if (open) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);

      // Focus the modal
      setTimeout(() => {
        const focusable = modalRef.current?.querySelector<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        focusable?.focus();
      }, 0);

      return () => {
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleKeyDown);
        previousActiveElement.current?.focus();
      };
    }
    return undefined;
  }, [open, handleKeyDown]);

  if (!open) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 animate-in fade-in duration-200" 
        aria-hidden="true" 
      />

      {/* Modal Content */}
      <div
        ref={modalRef}
        className={cn(
          'relative w-full bg-white rounded-lg shadow-xl',
          'animate-in fade-in zoom-in-95 duration-200',
          sizeStyles[size],
          className
        )}
      >
        {showCloseButton && (
          <button
            type="button"
            onClick={onClose}
            className={cn(
              'absolute right-4 top-4 p-1 rounded text-neutral-400',
              'hover:text-neutral-600 hover:bg-neutral-100',
              'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
              'transition-colors z-10'
            )}
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        )}
        {children}
      </div>
    </div>,
    document.body
  );
}

// ─────────────────────────────────────────
// Modal Header
// ─────────────────────────────────────────

export const ModalHeader = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('px-6 pt-6 pb-4', className)}
    {...props}
  />
));
ModalHeader.displayName = 'ModalHeader';

// ─────────────────────────────────────────
// Modal Title
// ─────────────────────────────────────────

export const ModalTitle = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn('text-lg font-semibold text-neutral-900', className)}
    {...props}
  />
));
ModalTitle.displayName = 'ModalTitle';

// ─────────────────────────────────────────
// Modal Description
// ─────────────────────────────────────────

export const ModalDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-neutral-500 mt-1', className)}
    {...props}
  />
));
ModalDescription.displayName = 'ModalDescription';

// ─────────────────────────────────────────
// Modal Body
// ─────────────────────────────────────────

export const ModalBody = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('px-6 py-4', className)}
    {...props}
  />
));
ModalBody.displayName = 'ModalBody';

// ─────────────────────────────────────────
// Modal Footer
// ─────────────────────────────────────────

export const ModalFooter = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'px-6 py-4 bg-neutral-50 rounded-b-lg',
      'flex items-center justify-end gap-3',
      className
    )}
    {...props}
  />
));
ModalFooter.displayName = 'ModalFooter';

// ─────────────────────────────────────────
// Confirm Dialog (Convenience Component)
// ─────────────────────────────────────────

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'primary';
  loading?: boolean;
}

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'primary',
  loading = false,
}: ConfirmDialogProps) {
  return (
    <Modal open={open} onClose={onClose} size="sm">
      <ModalHeader>
        <ModalTitle>{title}</ModalTitle>
        {description && <ModalDescription>{description}</ModalDescription>}
      </ModalHeader>
      <ModalFooter>
        <Button variant="secondary" onClick={onClose} disabled={loading}>
          {cancelText}
        </Button>
        <Button
          variant={variant === 'danger' ? 'danger' : 'primary'}
          onClick={onConfirm}
          loading={loading}
        >
          {confirmText}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
