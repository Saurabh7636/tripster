import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Tripster</span>
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link href="/search" className="text-gray-700 hover:text-primary transition">
                Properties
              </Link>
              <Link href="/search" className="text-gray-700 hover:text-primary transition">
                Attractions
              </Link>
              <Link href="/search" className="text-gray-700 hover:text-primary transition">
                Popular
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            {session ? (
              <>
                <Link
                  href="/profile"
                  className="px-4 py-2 text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition"
                >
                  Profile
                </Link>
                <button
                  onClick={() => signOut()}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => signIn()}
                  className="px-4 py-2 text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition"
                >
                  Sign up
                </button>
                <button
                  onClick={() => signIn()}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
                >
                  Log in
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

