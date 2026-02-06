import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('开始数据库初始化...');

  // 创建管理员账号
  const hashedPassword = await bcrypt.hash('admin123', 10);

  const admin = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: hashedPassword,
      email: 'admin@example.com',
      role: 'admin'
    }
  });

  console.log('✓ 创建管理员账号:', admin.username);

  // 创建示例分类
  const categories = [
    {
      name: '开发工具',
      slug: 'development',
      description: '编程和开发相关的工具'
    },
    {
      name: '设计工具',
      slug: 'design',
      description: 'UI/UX设计和图形设计工具'
    },
    {
      name: '效率工具',
      slug: 'productivity',
      description: '提高工作效率的工具'
    },
    {
      name: 'AI工具',
      slug: 'ai',
      description: '人工智能相关工具'
    }
  ];

  const createdCategories = [];
  for (const category of categories) {
    const created = await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category
    });
    createdCategories.push(created);
    console.log('✓ 创建分类:', created.name);
  }

  // 创建示例工具
  const tools = [
    {
      name: 'GitHub',
      url: 'https://github.com',
      description: '全球最大的代码托管平台，支持版本控制和协作开发',
      categoryId: createdCategories[0].id,
      featured: true
    },
    {
      name: 'VS Code',
      url: 'https://code.visualstudio.com',
      description: '微软开发的免费开源代码编辑器，功能强大且扩展丰富',
      categoryId: createdCategories[0].id,
      featured: true
    },
    {
      name: 'Figma',
      url: 'https://www.figma.com',
      description: '基于浏览器的协作式UI设计工具',
      categoryId: createdCategories[1].id,
      featured: true
    },
    {
      name: 'Notion',
      url: 'https://www.notion.so',
      description: '集笔记、知识库、任务管理于一体的协作工具',
      categoryId: createdCategories[2].id,
      featured: false
    },
    {
      name: 'ChatGPT',
      url: 'https://chat.openai.com',
      description: 'OpenAI开发的强大AI对话助手',
      categoryId: createdCategories[3].id,
      featured: true
    }
  ];

  for (const tool of tools) {
    const created = await prisma.tool.create({
      data: tool
    });
    console.log('✓ 创建工具:', created.name);
  }

  console.log('\n数据库初始化完成！');
  console.log('\n管理员登录信息:');
  console.log('用户名: admin');
  console.log('密码: admin123');
}

main()
  .catch((e) => {
    console.error('初始化失败:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
