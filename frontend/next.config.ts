import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // SVGR handles `.svg` imports as React components for both the dev
  // (Turbopack) and production (Webpack) builds. With this in place,
  // `import Icon from "@/shared/icons/icon-arrow-down.svg"` yields a React
  // component; consumers render `<Icon />` instead of `<img src={icon} />`.
  turbopack: {
    rules: {
      "*.svg": {
        loaders: [
          {
            loader: "@svgr/webpack",
            options: { svgo: false },
          },
        ],
        as: "*.js",
      },
    },
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [{ loader: "@svgr/webpack", options: { svgo: false } }],
    });
    return config;
  },

  // When `BACKEND_INTERNAL_URL` is set (local stage compose points it at
  // the django service), proxy `/api/*` and `/admin/*` through the
  // Next runtime to the backend so the frontend can use relative
  // URLs end-to-end. Deployed stage leaves this unset - the ALB does
  // path-based routing instead. Local dev also leaves it unset; the
  // dev frontend calls django cross-origin via NEXT_PUBLIC_API_URL.
  async rewrites() {
    const backend = process.env.BACKEND_INTERNAL_URL;
    if (!backend) return [];
    return [
      { source: "/api/:path*", destination: `${backend}/api/:path*` },
      { source: "/admin/:path*", destination: `${backend}/admin/:path*` },
    ];
  },
};

export default nextConfig;
