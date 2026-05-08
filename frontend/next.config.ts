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

  // Proxy `/api/*` and `/admin/*` through the Next runtime to the
  // backend so the frontend can use relative URLs end-to-end.
  // `BACKEND_INTERNAL_URL` resolves differently per environment:
  //
  //   - compose dev (`make docker-up`): `http://django:8000` (the docker
  //     service DNS name; comes from `dev/dev.env`).
  //   - host dev (`make local-run-frontend`): `http://localhost:8000`
  //     (the Makefile target sources `dev.env` and overrides this
  //     value, parallel to how `BACKEND_RUN` overrides `SQL_HOST`).
  //   - local stage (`make stage-up`): the `next` container's compose
  //     env points it at the `django` container.
  //   - deployed stage: leaves it unset; the ALB does path-based
  //     routing at the load balancer instead, and this function
  //     returns `[]` so Next doesn't add a redundant proxy.
  //
  // Same-origin in dev / stage / prod means no CORS headers anywhere.
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
