const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
  images: {
    formats: ["image/avif", "image/webp"],
  },
  swcMinify: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      oneOf: [
        {
          issuer: /\.(js|ts)x?$/,
          use: ["@svgr/webpack"],
        },
      ],
    });

    return config;
  },
  redirects() {
    // add the maintenance mode again
    if (process.env.NEXT_PUBLIC_MAINTENANCE !== "1") {
      return [];
    }
    return [
      {
        source: "(^(?!\/maintenance$)(?!.*\.\w+$).*)",
        destination: "/maintenance",
        permanent: false,
      },
    ];
  },
});
