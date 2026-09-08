export default function Loading() {
  return (
    <section className="max-w-4xl mx-auto p-4 space-y-6 animate-pulse">
      <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
      <div className="h-64 bg-gray-300 rounded mb-4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
      </div>
    </section>
  );
}
