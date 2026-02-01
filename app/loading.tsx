export default function Loading() {
    return (
      <div className="fixed inset-0 z-50 grid place-items-center bg-white/60 backdrop-blur-sm">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900" />
      </div>
    );
  }
  