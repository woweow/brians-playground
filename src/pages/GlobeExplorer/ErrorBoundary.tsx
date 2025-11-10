import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Globe Explorer Error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="w-full h-screen flex items-center justify-center bg-slate-950 text-white">
          <div className="text-center p-8 max-w-md">
            <h2 className="text-2xl font-bold mb-4">Unable to Load Globe</h2>
            <p className="text-slate-400 mb-4">
              {this.state.error?.message || 'An error occurred while loading the 3D globe.'}
            </p>
            <p className="text-sm text-slate-500 mb-6">
              This may be due to network issues or browser compatibility. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
