import Link from "next/link"
import { BSA_LOGO_PATH } from "@/components/bsa-logo-path"

export default function NotFound() {
  return (
    <div className="min-h-[70dvh] flex flex-col items-center justify-center px-6 text-center">
      <svg viewBox="0 0 200 215" className="w-20 h-20 mb-lg opacity-20" fill="none">
        <path d={BSA_LOGO_PATH} fill="#fafafa" fillRule="evenodd" />
      </svg>
      <p className="text-eyebrow font-mono text-zinc-500 uppercase mb-sm">
        404
      </p>
      <h1 className="text-display-1 font-display text-zinc-50 mb-sm">
        Page not found
      </h1>
      <p className="text-zinc-400 mb-lg max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="text-zinc-950 bg-zinc-50 text-sm font-medium rounded-full px-md py-2.5 hover:bg-zinc-300 active:scale-[0.98] transition-all duration-200"
      >
        Back to home
      </Link>
    </div>
  )
}
