export default function Footer() {
  return (
    <footer className="w-full bg-zinc-100 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-10 text-zinc-700 dark:text-zinc-200">
        {/* Company Overview */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-zinc-900 dark:text-zinc-50">
            Company Overview
          </h3>
          <ul className="space-y-2">
            <li>
              <a href="#about" className="hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="#values" className="hover:underline">
                Our values
              </a>
            </li>
            <li>
              <a href="#privacy" className="hover:underline">
                Privacy notice
              </a>
            </li>
            <li>
              <a href="#terms" className="hover:underline">
                Terms & conditions
              </a>
            </li>
            <li>
              <a href="#disclaimer" className="hover:underline">
                Disclaimer
              </a>
            </li>
            <li>
              <a href="#corporate" className="hover:underline">
                Corporate Information
              </a>
            </li>
            <li>
              <a href="#media" className="hover:underline">
                Media Outreach
              </a>
            </li>
            <li>
              <a href="#distributor" className="hover:underline">
                Distributor Queries
              </a>
            </li>
            <li>
              <a href="#grievance" className="hover:underline">
                Grievance Redressal
              </a>
            </li>
          </ul>
        </div>
        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-zinc-900 dark:text-zinc-50">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li>
              <a href="#knowledge" className="hover:underline">
                Knowledge
              </a>
            </li>
            <li>
              <a href="#faqs" className="hover:underline">
                FAQs
              </a>
            </li>
            <li>
              <a href="#shipping" className="hover:underline">
                Shipping Policy
              </a>
            </li>
            <li>
              <a href="#return" className="hover:underline">
                Return & refund policy
              </a>
            </li>
            <li>
              <a href="#payment" className="hover:underline">
                Payment Policy
              </a>
            </li>
            <li>
              <a href="#track" className="hover:underline">
                Track order
              </a>
            </li>
            <li>
              <a href="#download" className="hover:underline">
                Download App
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:underline">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
        {/* Branding, Contact & Copyright */}
        <div className="flex flex-col items-center justify-between h-full">
          <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
            BrandName
          </div>
          {/* Contact Section */}
          <div className="w-full flex flex-col items-center gap-2 mb-4">
            <div className="text-base text-zinc-700 dark:text-zinc-200 font-semibold">
              Contact
            </div>
            <a
              href="mailto:contact@brandname.com"
              className="text-sm text-zinc-600 dark:text-zinc-300 hover:underline"
            >
              contact@brandname.com
            </a>
            <a
              href="tel:+911234567890"
              className="text-sm text-zinc-600 dark:text-zinc-300 hover:underline"
            >
              +91 12345 67890
            </a>
            <div className="text-sm text-zinc-600 dark:text-zinc-300 text-center">
              123, Main Street, Mumbai, India
            </div>
          </div>
          <div className="flex-1" />
          <div className="text-sm text-zinc-500 dark:text-zinc-400 mt-8 md:mt-0">
            &copy; {new Date().getFullYear()} BrandName. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
