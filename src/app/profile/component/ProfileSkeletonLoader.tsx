import React from 'react';

const ProfileSkeletonLoader: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 mt-15 space-y-8">
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        {/* Profile image skeleton */}
        <div className="w-full md:w-2/5 aspect-square rounded-3xl bg-gray-200 dark:bg-gray-700 animate-pulse" />
        
        <div className="w-full md:w-3/5 space-y-5">
          {/* Info card skeleton */}
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl">
            <div className="grid grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="bg-gray-200 dark:bg-gray-700 p-2.5 rounded-full w-10 h-10 animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-md w-16 animate-pulse" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-24 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Badges skeleton */}
          <div className="flex flex-wrap gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-8 bg-gray-200 dark:bg-gray-700 rounded-full w-24 animate-pulse" />
            ))}
          </div>
        </div>
      </div>
      
      {/* Details section skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 h-32 animate-pulse" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 h-40 animate-pulse" />
            <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 h-40 animate-pulse" />
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 h-40 animate-pulse" />
        </div>
        
        <div className="space-y-6">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 h-40 animate-pulse" />
          <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 h-32 animate-pulse" />
          <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 h-48 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeletonLoader;