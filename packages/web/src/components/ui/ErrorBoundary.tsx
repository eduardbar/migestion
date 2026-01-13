import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * React Error Boundary Component.
 * Catches JavaScript errors anywhere in the child component tree
 * and displays a fallback UI instead of a blank screen.
 */
export class ErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({ hasError: true, error });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <div className="rounded-lg border border-error-200 bg-white p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-error-100 text-error-600">
                <AlertCircle className="h-6 w-6" />
              </div>

              <h1 className="mb-2 text-2xl font-semibold text-neutral-900">Algo salió mal</h1>

              <p className="mb-6 text-sm text-neutral-600">
                {this.state.error?.message || 'Ha ocurrido un error inesperado en la aplicación.'}
              </p>

              {this.state.error?.message && (
                <details className="mb-6 text-left">
                  <summary className="cursor-pointer text-sm font-medium text-primary-600 hover:text-primary-700">
                    Ver detalles del error
                  </summary>
                  <pre className="mt-3 overflow-auto rounded bg-neutral-50 p-3 text-xs text-neutral-700 border border-neutral-200">
                    {this.state.error?.stack}
                  </pre>
                </details>
              )}

              <div className="flex gap-3">
                <Button onClick={this.handleReset}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Recargar página
                </Button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
