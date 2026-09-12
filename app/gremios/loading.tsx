export default function LoadingGremios() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 animate-pulse">
      <div className="space-y-3 border-b border-[#DCEEFF] pb-6">
        <div className="h-4 w-32 bg-[#DCEEFF] rounded-full" />
        <div className="h-10 w-80 bg-[#DCEEFF] rounded-xl" />
        <div className="h-4 w-96 bg-[#DCEEFF]/60 rounded-md" />
      </div>

      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-10 w-28 bg-[#EAF4FC] rounded-xl" />
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-[#DCEEFF] overflow-hidden flex flex-col h-96"
          >
            <div className="h-48 w-full bg-[#EAF4FC]" />
            <div className="p-6 space-y-3 flex-1">
              <div className="h-3 w-24 bg-[#DCEEFF] rounded-full" />
              <div className="h-6 w-3/4 bg-[#DCEEFF] rounded-lg" />
              <div className="h-4 w-full bg-[#DCEEFF]/50 rounded-lg" />
              <div className="h-4 w-2/3 bg-[#DCEEFF]/50 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
