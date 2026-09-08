export default function Loading() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 animate-pulse">
      {/* Skeleton Hero */}
      <div className="h-64 sm:h-80 w-full bg-[#EAF4FC] rounded-2xl" />

      {/* Skeleton título e subtítulo */}
      <div className="space-y-3 border-b border-[#DCEEFF] pb-6">
        <div className="h-3 w-20 bg-[#DCEEFF] rounded-full" />
        <div className="h-8 w-72 bg-[#DCEEFF] rounded-xl" />
      </div>

      {/* Skeleton grid de cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-[#DCEEFF] overflow-hidden flex flex-col"
          >
            {/* Imagem */}
            <div className="h-48 w-full bg-[#EAF4FC]" />

            {/* Conteúdo */}
            <div className="p-6 space-y-3 flex-1">
              <div className="h-3 w-16 bg-[#DCEEFF] rounded-full" />
              <div className="h-5 w-4/5 bg-[#DCEEFF] rounded-lg" />
              <div className="h-4 w-full bg-[#DCEEFF]/50 rounded-lg" />
              <div className="h-4 w-3/4 bg-[#DCEEFF]/50 rounded-lg" />
            </div>

            {/* Botão */}
            <div className="p-6 pt-0">
              <div className="h-10 w-full bg-[#EAF4FC] rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
