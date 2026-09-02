export default function Loading() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 animate-pulse">
      {/* Skeleton Hero */}
      <div className="h-64 sm:h-80 w-full bg-[#EAF4FC] rounded-2xl"></div>

      {/* Skeleton Header & Grid */}
      <div className="space-y-6">
        <div className="h-8 w-64 bg-[#DCEEFF] rounded-xl mx-auto"></div>
        <div className="h-4 w-96 bg-[#DCEEFF]/60 rounded-xl mx-auto"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl h-80 border border-[#DCEEFF] p-4 space-y-4">
              <div className="h-40 w-full bg-[#EAF4FC] rounded-xl"></div>
              <div className="h-6 w-3/4 bg-[#DCEEFF] rounded-lg"></div>
              <div className="h-4 w-full bg-[#DCEEFF]/50 rounded-lg"></div>
              <div className="h-4 w-1/2 bg-[#DCEEFF]/50 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
