// admin/src/components/ErrorBoundary.tsx

import React from 'react';
import { AlertCircle } from 'lucide-react';

interface Props {
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="flex items-center justify-center p-6 bg-red-50 rounded-lg">
                    <AlertCircle className="w-6 h-6 text-red-500 mr-2" />
                    <div>
                        <h3 className="text-lg font-medium text-red-800">Something went wrong</h3>
                        <p className="text-sm text-red-600">
                            {this.state.error?.message || 'An unexpected error occurred'}
                        </p>
                        <button
                            onClick={() => this.setState({ hasError: false, error: null })}
                            className="mt-2 text-sm text-red-600 hover:text-red-800"
                        >
                            Try again
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

// Hook version for functional components
export function useErrorBoundary() {
    const [error, setError] = React.useState<Error | null>(null);

    const ErrorFallback = error ? (
        <div className="flex items-center justify-center p-6 bg-red-50 rounded-lg">
            <AlertCircle className="w-6 h-6 text-red-500 mr-2" />
            <div>
                <h3 className="text-lg font-medium text-red-800">Something went wrong</h3>
                <p className="text-sm text-red-600">{error.message}</p>
                <button
                    onClick={() => setError(null)}
                    className="mt-2 text-sm text-red-600 hover:text-red-800"
                >
                    Try again
                </button>
            </div>
        </div>
    ) : null;

    return {
        error,
        setError,
        ErrorFallback
    };
}