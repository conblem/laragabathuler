module.exports = {
  images: {
    formats: ['image/avif', 'image/webp'],
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
};
