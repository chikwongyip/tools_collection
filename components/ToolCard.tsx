import Link from 'next/link';

interface Tool {
  id: string;
  name: string;
  url: string;
  description: string;
  icon?: string | null;
  category: {
    name: string;
  };
}

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <div className='group relative bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700'>
      <div className='p-6'>
        <div className='flex items-start gap-4'>
          {/* Icon */}
          <div className='flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-xl font-bold group-hover:scale-110 transition-transform duration-300'>
            {tool.icon ? (
              <img
                src={tool.icon}
                alt={tool.name}
                className='w-full h-full object-cover rounded-lg'
              />
            ) : (
              tool.name.charAt(0).toUpperCase()
            )}
          </div>

          {/* Content */}
          <div className='flex-1 min-w-0'>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-1 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors'>
              {tool.name}
            </h3>
            <span className='inline-block px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full mb-2'>
              {tool.category.name}
            </span>
            <p className='text-sm text-gray-600 dark:text-gray-300 line-clamp-2'>
              {tool.description}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className='mt-4 pt-4 border-t border-gray-200 dark:border-gray-700'>
          <a
            href={tool.url}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors'
          >
            访问工具
            <svg
              className='ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M13 7l5 5m0 0l-5 5m5-5H6'
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Hover Effect Overlay */}
      <div className='absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none' />
    </div>
  );
}
