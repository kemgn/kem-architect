/** @type {import('next').NextConfig} */
import path from 'path';

const nextConfig = {
    reactStrictMode: true,
    env: {
        BASE_URL: process.env.BASE_URL
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                fs: false,
                module: false,
                path: false
            };
        }

        return config;
    },
};

export default nextConfig;
