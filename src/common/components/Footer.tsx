import {
  Camera,
  Headset,
  Music2,
  Package,
  Store,
  Wallet,
  X,
} from "lucide-react";

import upiLogo from "@/assets/img/unified-payment-interface-upi-logo.png";
import rupayLogo from "@/assets/img/india-rupay-logo.png";
import visaLogo from "@/assets/img/visa-logo.jpg";
import gPayLogo from "@/assets/img/g-pay-logo.png";

const features = [
  {
    icon: Store,
    title: "Free in-store pick up",
    subtitle: "24/7 Amazing services",
  },
  {
    icon: Package,
    title: "Free Shipping",
    subtitle: "24/7 Amazing services",
  },
  {
    icon: Wallet,
    title: "Flexible Payment",
    subtitle: "24/7 Amazing services",
  },
  {
    icon: Headset,
    title: "Convenient help",
    subtitle: "24/7 Amazing services",
  },
];

const linkColumns = [
  {
    title: "About E-COM",
    links: [
      "Contact Us",
      "About Us",
      "Careers",
      "Policies",
      "Investors",
      "Advertise with us",
    ],
  },
  {
    title: "Order & Purchases",
    links: [
      "Check order Status",
      "Shipping, Delivery & Pickup",
      "Returns & Exchanges",
      "Price Match Guarantee",
      "Product Recalls",
      "Trade In Program",
      "Gift Cards",
    ],
  },
  {
    title: "Popular Categories",
    links: [
      "Electronics",
      "Fasion",
      "Luxury",
      "Home Decor",
      "Health & Beauty",
      "Sneakers",
      "Gift Items",
    ],
  },
  {
    title: "Support & Services",
    links: [
      "Seller Center",
      "Contact Us",
      "eBay Returns",
      "eBay Money Back Guarantee",
    ],
  },
];

const socialLinks = [
  { label: "Facebook", content: "f" },
  { label: "X", content: <X className="size-4" /> },
  { label: "Instagram", content: <Camera className="size-4" /> },
  { label: "LinkedIn", content: "in" },
  { label: "TikTok", content: <Music2 className="size-4" /> },
];

const Footer = () => {
  return (
    <footer className="w-full bg-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Feature cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, subtitle }) => (
            <div
              key={title}
              className="flex items-center gap-3 rounded-lg bg-white px-5 py-5 shadow-sm"
            >
              <Icon className="size-6 shrink-0 text-blue-600" />
              <div>
                <p className="text-sm font-semibold text-slate-900">{title}</p>
                <p className="text-xs text-slate-500">{subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Link columns */}
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {linkColumns.map(({ title, links }) => (
            <div key={title}>
              <h3 className="mb-3 text-sm font-semibold text-slate-900">
                {title}
              </h3>
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-slate-500 hover:text-slate-700 hover:underline"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* App / payment / social */}
        <div className="mt-10 flex justify-between">
          <div>
            <h3 className="mb-3 text-sm font-semibold text-slate-900">
              Download Our App
            </h3>
            <div className="flex gap-2">
              <button
                type="button"
                className="flex h-10 items-center gap-2 rounded-md bg-slate-900 px-3 text-white transition-opacity hover:opacity-90"
              >
                <Store className="size-5" />
                <span className="text-left leading-tight">
                  <span className="block text-[10px] text-slate-300">
                    Download on the
                  </span>
                  <span className="block text-sm font-semibold">App Store</span>
                </span>
              </button>
              <button
                type="button"
                className="flex h-10 items-center gap-2 rounded-md bg-slate-900 px-3 text-white transition-opacity hover:opacity-90"
              >
                <Store className="size-5" />
                <span className="text-left leading-tight">
                  <span className="block text-[10px] text-slate-300">
                    GET IT ON
                  </span>
                  <span className="block text-sm font-semibold">
                    Google Play
                  </span>
                </span>
              </button>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-slate-900">
              Payment Method
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="flex h-8 items-center rounded-md border border-slate-200 bg-white px-2.5">
                <img
                  src={visaLogo}
                  alt="VISA"
                  className="h-4 w-auto object-contain"
                />
              </span>
              <span className="flex h-8 w-11 items-center justify-center rounded-md border border-slate-200 bg-white">
                <span className="relative flex items-center">
                  <span className="size-4 rounded-full bg-red-500" />
                  <span className="-ml-1.5 size-4 rounded-full bg-orange-400" />
                </span>
              </span>

              <span className="flex h-8 items-center rounded-md border border-slate-200 bg-white px-2.5">
                <img
                  src={gPayLogo}
                  alt="Google Pay"
                  className="h-4 w-auto object-contain"
                />
              </span>
              <span className="flex h-8 items-center rounded-md border border-slate-200 bg-white px-1">
                <img
                  src={upiLogo}
                  alt="UPI"
                  className="h-5 w-auto object-contain"
                />
              </span>
              <span className="flex h-8 items-center rounded-md border border-slate-200 bg-white px-1">
                <img
                  src={rupayLogo}
                  alt="RuPay"
                  className="h-5 w-auto object-contain"
                />
              </span>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-slate-900">
              Stay Connected
            </h3>
            <div className="flex gap-2">
              {socialLinks.map(({ label, content }) => (
                <button
                  key={label}
                  type="button"
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-full bg-slate-600 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
                >
                  {content}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-200">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-4 text-xs text-slate-500 sm:flex-row">
          <p>© E-Com All Rights Reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-700 hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-slate-700 hover:underline">
              Terms of Use
            </a>
            <a href="#" className="hover:text-slate-700 hover:underline">
              Warranty Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
