export default function Guess() {
  return (
    <div className="flex flex-col relative gap-1 mt-8 bg-orange-50 w-full p-3 rounded-xl">
      <h3 className="font-bold text-lg text-center text-zinc-700">
        Will the price go up or down in next minute or so?
      </h3>
      <div className="flex items-center mt-2 justify-center gap-4">
        <button className="inline-flex items-center justify-center whitespace-nowrap text-sm ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:pointer-events-none bg-zinc-900 text-white hover:bg-zinc-900/90 shadow-sm disabled:opacity-50 h-9 rounded-xl px-3 font-medium">
          Up
        </button>
        <button className="inline-flex items-center justify-center whitespace-nowrap text-sm ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:pointer-events-none bg-zinc-900 text-white hover:bg-zinc-900/90 shadow-sm disabled:opacity-50 h-9 rounded-xl px-3 font-medium">
          Down
        </button>
      </div>
    </div>
  );
}
