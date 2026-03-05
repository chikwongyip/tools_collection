'use client';

import Navbar from '@/components/Navbar';

export default function PrivacyPage() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'>
      {/* Navbar */}
      <Navbar />
      
      {/* Main Content */}
      <main className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='bg-white dark:bg-gray-800 rounded-xl shadow-md p-8'>
          <h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-6'>隐私政策</h1>
          
          <div className='space-y-6'>
            <section>
              <h2 className='text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3'>1. 引言</h2>
              <p className='text-gray-600 dark:text-gray-400 leading-relaxed'>
                欢迎访问工具导航网站。我们重视您的隐私，致力于保护您的个人信息。本隐私政策解释了我们如何收集、使用、存储和保护您的信息，以及您对这些信息的权利。
              </p>
            </section>
            
            <section>
              <h2 className='text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3'>2. 我们收集的信息</h2>
              <p className='text-gray-600 dark:text-gray-400 leading-relaxed'>
                当您访问我们的网站时，我们可能会收集以下信息：
              </p>
              <ul className='list-disc pl-6 mt-2 text-gray-600 dark:text-gray-400 space-y-2'>
                <li>设备信息：包括您的IP地址、浏览器类型、操作系统、设备标识符等。</li>
                <li>使用信息：包括您访问的页面、停留时间、点击链接等。</li>
                <li>搜索信息：包括您在我们网站上的搜索查询。</li>
                <li> cookies和类似技术：我们使用cookies来改善您的浏览体验，跟踪网站使用情况。</li>
              </ul>
            </section>
            
            <section>
              <h2 className='text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3'>3. 我们如何使用您的信息</h2>
              <p className='text-gray-600 dark:text-gray-400 leading-relaxed'>
                我们使用收集的信息用于以下目的：
              </p>
              <ul className='list-disc pl-6 mt-2 text-gray-600 dark:text-gray-400 space-y-2'>
                <li>提供和改进我们的服务：包括个性化内容、优化用户体验。</li>
                <li>分析网站使用情况：了解用户如何使用我们的网站，以便改进。</li>
                <li>显示广告：根据您的兴趣和浏览行为显示相关广告。</li>
                <li>安全目的：保护我们的网站和用户免受欺诈和滥用。</li>
              </ul>
            </section>
            
            <section>
              <h2 className='text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3'>4. 信息共享</h2>
              <p className='text-gray-600 dark:text-gray-400 leading-relaxed'>
                我们不会向第三方出售您的个人信息。但我们可能会与以下各方共享您的信息：
              </p>
              <ul className='list-disc pl-6 mt-2 text-gray-600 dark:text-gray-400 space-y-2'>
                <li>服务提供商：我们可能会与帮助我们运营网站、分析数据或提供其他服务的第三方共享信息。</li>
                <li>广告合作伙伴：我们可能会与广告合作伙伴共享匿名化的使用数据，以提供相关广告。</li>
                <li>法律要求：当法律要求或为了保护我们的权利、财产或安全时，我们可能会披露信息。</li>
              </ul>
            </section>
            
            <section>
              <h2 className='text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3'>5. 信息安全</h2>
              <p className='text-gray-600 dark:text-gray-400 leading-relaxed'>
                我们采取合理的安全措施来保护您的个人信息，防止未授权访问、使用或披露。然而，请注意，没有任何数据传输或存储方法是100%安全的，我们不能保证您信息的绝对安全。
              </p>
            </section>
            
            <section>
              <h2 className='text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3'>6. 您的权利</h2>
              <p className='text-gray-600 dark:text-gray-400 leading-relaxed'>
                根据适用法律，您可能有权：
              </p>
              <ul className='list-disc pl-6 mt-2 text-gray-600 dark:text-gray-400 space-y-2'>
                <li>访问您的个人信息。</li>
                <li>更正或删除您的个人信息。</li>
                <li>限制或反对我们处理您的个人信息。</li>
                <li>数据可移植性：获取您提供给我们的个人信息的副本。</li>
                <li>撤回同意：如果您之前同意我们处理您的信息，您可以撤回同意。</li>
              </ul>
            </section>
            
            <section>
              <h2 className='text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3'>7. Cookie政策</h2>
              <p className='text-gray-600 dark:text-gray-400 leading-relaxed'>
                我们使用cookies来改善您的浏览体验。您可以通过浏览器设置管理或禁用cookies，但这可能会影响网站的某些功能。
              </p>
            </section>
            
            <section>
              <h2 className='text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3'>8. 政策更新</h2>
              <p className='text-gray-600 dark:text-gray-400 leading-relaxed'>
                我们可能会不时更新本隐私政策。当我们进行重大更改时，我们会在网站上发布更新后的政策，并在可能的情况下通知您。
              </p>
            </section>
            
            <section>
              <h2 className='text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3'>9. 联系我们</h2>
              <p className='text-gray-600 dark:text-gray-400 leading-relaxed'>
                如果您对本隐私政策有任何问题或疑虑，请联系我们。
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
