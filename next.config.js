/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        swcPlugins: [["next-superjson-plugin", {}]],
    },
    images: {
        domains: ["res.cloundnary.com", "avatars.githubusercontent.com", "lh3.googleusercontent.com"],
    },
};

module.exports = nextConfig;
