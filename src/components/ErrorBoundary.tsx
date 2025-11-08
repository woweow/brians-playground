import { Component, ErrorInfo, ReactNode } from 'react'
import { Button } from './ui/Button'
import { AlertCircle } from 'lucide-react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo)
    this.setState({ error, errorInfo })
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-slate-300 flex items-center justify-center px-4">
          <div className="max-w-2xl w-full text-center">
            <div className="mb-8 flex justify-center">
              <div className="p-6 rounded-full bg-red-500/10 border border-red-500/20">
                <AlertCircle size={64} className="text-red-500" />
              </div>
            </div>

            <h1 className="text-4xl font-bold text-white mb-4">
              Oops! Something went wrong
            </h1>

            <p className="text-xl text-slate-400 mb-8">
              We encountered an unexpected error. Don&rsquo;t worry, this has been logged and we&rsquo;ll look into it.
            </p>

            {this.state.error && (
              <div className="mb-8 p-6 bg-slate-900 rounded-lg border border-slate-800 text-left">
                <h2 className="text-lg font-semibold text-red-400 mb-2">Error Details:</h2>
                <p className="text-sm font-mono text-slate-300 break-all">
                  {this.state.error.toString()}
                </p>
                {this.state.errorInfo && (
                  <details className="mt-4">
                    <summary className="cursor-pointer text-slate-400 hover:text-slate-300">
                      Stack trace
                    </summary>
                    <pre className="mt-2 text-xs text-slate-400 overflow-auto max-h-64">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </details>
                )}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={this.handleReset}>
                Go to Home
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => window.location.reload()}
              >
                Reload Page
              </Button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
