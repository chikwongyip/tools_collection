'use client';

import Navbar from '@/components/Navbar';

export default function TermsPage() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'>
      {/* Navbar */}
      <Navbar />
      
      {/* Main Content */}
      <main className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='bg-white dark:bg-gray-800 rounded-xl shadow-md p-8'>
          <h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-6'>服务条款</h1>
          
          <div className='space-y-6'>
            <section>
              <h2 className='text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3'>1. 接受条款</h2>
              <p className='text-gray-600 dark:text-gray-400 leading-relaxed'>
                当您访问或使用工具导航网站（以下简称"本网站"）时，即表示您同意遵守本服务条款。如果您不同意本条款，请不要使用本网站。
              </p>
            </section>
            
            <section>
              <h2 className='text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3'>2. 网站使用</h2>
              <p className='text-gray-600 dark:text-gray-400 leading-relaxed'>
                您同意以合法方式使用本网站，不得：
              </p>
              <ul className='list-disc pl-6 mt-2 text-gray-600 dark:text-gray-400 space-y-2'>
                <li>违反任何适用的法律法规。</li>
                <li>侵犯他人的知识产权或其他权利。</li>
                <li>上传或传播任何恶意软件、病毒或其他有害内容。</li>
                <li>干扰网站的正常运行。</li>
                <li>尝试未经授权访问网站的任何部分或功能。</li>
              </ul>
            </section>
            
            <section>
              <h2 className='text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3'>3. 工具信息</h2>
              <p className='text-gray-600 dark:text-gray-400 leading-relaxed'>
                本网站提供的工具信息仅供参考，我们不保证工具的准确性、完整性或可靠性。使用任何工具时，您应自行评估其适用性和安全性。
              </p>
              <p className='text-gray-600 dark:text-gray-400 leading-relaxed mt-2'>
                本网站可能包含指向第三方网站的链接，这些链接仅为方便用户而提供。我们不对第三方网站的内容、隐私政策或安全性负责。
              </p>
            </section>
            
            <section>
              <h2 className='text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3'>4. 知识产权</h2>
              <p className='text-gray-600 dark:text-gray-400 leading-relaxed'>
                本网站及其内容（包括但不限于文本、图像、标志、图标等）的知识产权归我们所有或经许可使用。未经我们书面许可，您不得复制、修改、分发或使用这些内容。
              </p>
            </section>
            
            <section>
              <h2 className='text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3'>5. 免责声明</h2>
              <p className='text-gray-600 dark:text-gray-400 leading-relaxed'>
                本网站按"原样"提供，不提供任何形式的保证，包括但不限于适销性、特定用途适用性的默示保证。我们不保证网站的可用性、可靠性或无错误。
              </p>
              <p className='text-gray-600 dark:text-gray-400 leading-relaxed mt-2'>
                在法律允许的最大范围内，我们不对因使用或无法使用本网站而导致的任何直接、间接、偶然、特殊或后果性损害承担责任。
              </p>
            </section>
            
            <section>
              <h2 className='text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3'>6. 条款修改</h2>
              <p className='text-gray-600 dark:text-gray-400 leading-relaxed'>
                我们保留随时修改本服务条款的权利。修改后的条款将在网站上发布，并自发布之日起生效。继续使用本网站即表示您接受修改后的条款。
              </p>
            </section>
            
            <section>
              <h2 className='text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3'>7. 终止</h2>
              <p className='text-gray-600 dark:text-gray-400 leading-relaxed'>
                我们保留在任何时候终止或暂停您访问本网站的权利，无需事先通知，特别是如果我们认为您违反了本服务条款。
              </p>
            </section>
            
            <section>
              <h2 className='text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3'>8. 适用法律</h2>
              <p className='text-gray-600 dark:text-gray-400 leading-relaxed'>
                本服务条款受中华人民共和国法律管辖，任何与本条款相关的争议应提交至有管辖权的法院解决。
              </p>
            </section>
            
            <section>
              <h2 className='text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3'>9. 联系我们</h2>
              <p className='text-gray-600 dark:text-gray-400 leading-relaxed'>
                如果您对本服务条款有任何问题或疑虑，请联系我们。
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
