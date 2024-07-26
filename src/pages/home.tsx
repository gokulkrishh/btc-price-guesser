import { Logo } from '../components/icons';

export default function Home() {
  return (
    <div className="flex p-2 px-4 min-h-full flex-col w-full md:max-w-lg md:p-2 m-auto">
      <header className="mt-1 flex justify-between">
        <div className="flex items-center w-full gap-1.5">
          <Logo className="w-8 h-8" />
          <h1 className="text-xl font-black">Price Guesser</h1>
        </div>
        <button className="inline-flex items-center justify-center whitespace-nowrap text-sm ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:pointer-events-none bg-zinc-900 text-white hover:bg-zinc-900/90 shadow-sm disabled:opacity-50 h-9 rounded-xl px-3 font-medium">
          Sign out
        </button>
      </header>
      <main className="flex h-full flex-col w-full">
        <div className="flex gap-4 mt-10">
          <div className="flex flex-col relative gap-1 bg-zinc-100 w-full p-3 rounded-xl">
            <h3 className="font-medium text-zinc-700">BTC/USD</h3>
            <span className="text-2xl font-black">$100</span>
          </div>
          <div className="flex flex-col relative gap-1 bg-zinc-100 w-full p-3 rounded-xl border-2">
            <h3 className="font-medium text-zinc-700">Current Score</h3>
            <span className="text-2xl font-black">0</span>
          </div>
        </div>
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
      </main>
    </div>
  );
}
