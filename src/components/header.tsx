import { Logo } from 'components/icons';

export default function Header() {
  return (
    <header className="mt-1 flex justify-between">
      <div className="flex items-center w-full gap-1.5">
        <Logo className="w-8 h-8" />
        <h1 className="text-xl font-black">Price Guesser</h1>
      </div>
      <button className="inline-flex items-center justify-center whitespace-nowrap text-sm ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:pointer-events-none bg-zinc-900 text-white hover:bg-zinc-900/90 shadow-sm disabled:opacity-50 h-9 rounded-xl px-3 font-medium">
        Sign out
      </button>
    </header>
  );
}
