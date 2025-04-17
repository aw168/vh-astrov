import * as cheerio from 'cheerio';

// 在Cloudflare环境中无法写入文件系统，改为返回数据
export default async (posts: any[]) => {
  const searchIndex = posts.map(i => {
    const $ = cheerio.load(`<body>${i.rendered?.html || ''}</body>`);
    return {
      title: i.data.title,
      url: `/article/${i.data.id}`,
      content: `${i.data.title} - ` + $('body').text().replace(/\n/g, '').replace(/<[^>]+>/g, '')
    };
  });

  try {
    // 无法直接写入文件，在控制台输出信息
    console.log('搜索索引已生成，包含', searchIndex.length, '条记录');
    
    // 返回生成的searchIndex对象，以便可以通过其他方式使用
    return searchIndex;
  } catch (error) {
    console.error('Error generating search index:', error);
    return [];
  }
};
