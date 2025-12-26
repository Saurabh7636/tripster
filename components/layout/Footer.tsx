import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Tripster</h3>
            <p className="text-gray-600 text-sm mb-2">
              Your favorite hotel booking experience since 1991
            </p>
            <p className="text-gray-500 text-xs">Uizard © 2022</p>
          </div>
          <div className="flex flex-col space-y-2">
            <Link href="/help" className="text-gray-600 hover:text-primary text-sm">
              Help
            </Link>
            <Link href="/faq" className="text-gray-600 hover:text-primary text-sm">
              FAQ
            </Link>
            <Link href="/customer-service" className="text-gray-600 hover:text-primary text-sm">
              Customer service
            </Link>
            <Link href="/how-to-guide" className="text-gray-600 hover:text-primary text-sm">
              How to guide
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-primary text-sm">
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

