import type { FC, ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
}

export const Card: FC<CardProps> = ({ children, className = '', title }) => {
  return (
    <div className={`glass rounded-3xl p-8 card-hover border-2 border-white/50 ${className} group relative overflow-hidden`}>
      {/* Colorful gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {title && (
        <div className="relative mb-6 pb-4 border-b-2 border-gradient-to-r from-purple-300 via-pink-300 to-blue-300">
          <h3 className="text-2xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent flex items-center">
            <span className="h-2 w-12 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full mr-4 shadow-lg"></span>
            {title}
          </h3>
        </div>
      )}
      <div className="relative">
        {children}
      </div>
    </div>
  );
};