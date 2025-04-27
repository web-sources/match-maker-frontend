import { Heart, Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="backdrop-blur-md bg-white/10 border-t border-white/20 shadow-lg w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo + tagline */}
          <div>
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-rose-500 fill-rose-500 animate-pulse" />
              <span className="text-xl font-bold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
                Matchmaker
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-4 max-w-xs">
              Bringing hearts together, one match at a time. Your story begins
              here. 💞
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-md font-semibold text-gray-700 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-rose-500 transition">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-rose-500 transition">
                  Members
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-rose-500 transition">
                  Love Stories
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-rose-500 transition">
                  Reviews
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-rose-500 transition">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Social and newsletter */}
          <div>
            <h4 className="text-md font-semibold text-gray-700 mb-4">
              Connect with us
            </h4>
            <div className="flex space-x-4 mb-4">
              <a
                href="#"
                className="text-gray-500 hover:text-rose-500 transition"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-rose-500 transition"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-rose-500 transition"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
            <p className="text-sm text-gray-600">
              Made with ❤️ for love seekers.
            </p>
          </div>
        </div>

        {/* Bottom note */}
        <div className="mt-12 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Matchmaker. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
