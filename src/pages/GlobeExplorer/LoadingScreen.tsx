export function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="absolute inset-0 border-4 border-blue-500/30 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
        </div>
        <h2 className="text-2xl font-semibold text-white mb-2">Loading Globe Explorer</h2>
        <p className="text-gray-400">Preparing high-quality Earth textures...</p>
      </div>
    </div>
  )
}
