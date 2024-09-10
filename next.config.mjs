/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
            {
                protocol: "https",
                hostname: "unsplash.com",
            },
            {
                protocol: "https",
                hostname: "utfs.io",
            },
            {
                protocol: "https",
                hostname: "replicate.delivery"
            },
            {
                protocol: "https",
                hostname: "oaidalleapiprodscus.blob.core.windows.net"
            },
        ],
    },
};

export default nextConfig;
