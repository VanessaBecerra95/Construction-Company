import { Link } from "@remix-run/react";
import { Hammer } from "lucide-react";

export function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Hammer className="h-8 w-8 text-indigo-600 animate-bounce" aria-hidden="true" />
              <span className="ml-4 text-xl font-bold text-gray-900">Construction Company</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}