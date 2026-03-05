'use client';

import Navbar from '@/components/Navbar';

export default function AboutPage() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'>
      {/* Navbar */}
      <Navbar />
      
      {/* Main Content */}
      <main className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='bg-white dark:bg-gray-800 rounded-xl shadow-md p-8'>
          <h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-6'>关于我们</h1>
          
          <div className='space-y-6'>
            <section>
              <h2 className='text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3'>我们的使命</h2>
              <p className='text-gray-600 dark:text-gray-400 leading-relaxed'>
                工具导航网站致力于为用户提供一个精心策划的工具集合，帮助您发现和探索各类优质工具，提高工作效率和生活质量。我们相信，好的工具可以让复杂的任务变得简单，让创意得以自由发挥。
              </p>
            </section>
            
            <section>
              <h2 className='text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3'>我们的愿景</h2>
              <p className='text-gray-600 dark:text-gray-400 leading-relaxed'>
                成为用户首选的工具发现平台，连接用户与优质工具，构建一个高效、便捷的工具生态系统。我们希望通过我们的努力，让每个人都能找到适合自己的工具，发挥最大潜能。
              </p>
            </section>
            
            <section>
              <h2 className='text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3'>我们的团队</h2>
              <p className='text-gray-600 dark:text-gray-400 leading-relaxed'>
                我们是一个充满激情的团队，由来自不同领域的专业人士组成。我们热爱技术，热衷于发现和分享优质工具，致力于为用户提供最好的工具导航体验。
              </p>
            </section>
            
            <section>
              <h2 className='text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3'>如何使用</h2>
              <p className='text-gray-600 dark:text-gray-400 leading-relaxed'>
                您可以通过分类浏览、搜索功能或直接访问工具详情页来发现和使用工具。我们定期更新工具库，确保您能够获取到最新、最优质的工具资源。
              </p>
            </section>
            
            <section>
              <h2 className='text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3'>联系我们</h2>
              <p className='text-gray-600 dark:text-gray-400 leading-relaxed'>
                如果您有任何建议、反馈或合作意向，欢迎与我们联系。我们期待听到您的声音，不断改进我们的服务。
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
