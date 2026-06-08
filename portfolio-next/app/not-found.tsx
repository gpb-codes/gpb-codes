import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f] text-white">
      <div className="text-center">
        <h1 className="text-6xl font-black text-[#6366f1] mb-4">404</h1>
        <p className="text-neutral-400 mb-6">Page not found</p>
        <Link href="/" className="btn-primary">Go home</Link>
      </div>
    </div>
  );
}
