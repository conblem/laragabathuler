module.exports = {
  async headers() {
    return [
      {
        source: "(\\.json$)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=60",
          },
        ],
      },
    ];
  },
};
