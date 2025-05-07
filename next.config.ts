
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'i.pravatar.cc',
      'images.unsplash.com',
      '49.13.208.14', 
    ],
  },
  devIndicators: false,
  env:{
    NEXT_PUBLIC_BASE_URL :"http://49.13.208.14:8000"
  } 
};

export default nextConfig;
