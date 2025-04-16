import createMDX from '@next/mdx';

import createNextIntlPlugin from 'next-intl/plugin';
import { withNextVideo } from 'next-video/process';

const withNextIntl = createNextIntlPlugin();
const withMDX = createMDX({
    // Add markdown plugins here, as desired
})

/** @type {import('next').NextConfig} */
const nextConfig = {// Configure `pageExtensions` to include markdown and MDX files
    // FIXME: remove this line until this issue is resolved: https://github.com/hashicorp/next-mdx-remote/issues/467 
    transpilePackages: ['next-mdx-remote'],
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'pub-89e9920648c44264b2116fe675041bf5.r2.dev',
                pathname: '/**'
            },
        ],
    }
};

export default withNextVideo(withMDX(withNextIntl(nextConfig)));
