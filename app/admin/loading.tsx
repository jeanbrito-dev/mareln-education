export default function LoadingAdmin() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-pulse">
      <div className="flex justify-between items-center border-b border-[#DCEEFF] pb-6">
        <div className="space-y-2">
          <div className="h-4 w-36 bg-[#DCEEFF] rounded-full" />
          <div className="h-8 w-64 bg-[#DCEEFF] rounded-xl" />
        </div>
        <div className="h-10 w-28 bg-[#EAF4FC] rounded-xl" />
      </div>

      <div className="flex gap-3">
        <div className="h-10 w-36 bg-[#EAF4FC] rounded-xl" />
        <div className="h-10 w-36 bg-[#EAF4FC] rounded-xl" />
        <div className="h-10 w-36 bg-[#EAF4FC] rounded-xl" />
      </div>

      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-24 bg-white rounded-2xl border border-[#DCEEFF] p-4"
          />
        ))}
      </div>
    </div>
  );
}
