export default function SignupLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8 animate-pulse">
          {/* Logo skeleton */}
          <div className="flex justify-center mb-8">
            <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
          </div>

          {/* Title skeleton */}
          <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-8"></div>

          {/* Form fields skeleton */}
          <div className="space-y-4 mb-6">
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>

          {/* Button skeleton */}
          <div className="h-10 bg-gray-200 rounded mb-4"></div>

          {/* Link skeleton */}
          <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
        </div>
      </div>
    </div>
  )
}
