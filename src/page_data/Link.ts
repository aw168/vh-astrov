import { getLinks } from '../utils/db';

export default {
  // API 接口请求优先，数据格式保持和 data 一致
  api: '',
  // api 为空则使用 data 静态数据
  data: [], // 将静态数据置空，从数据库读取
  
  // 从数据库获取数据
  async fromDatabase(env: any) {
    if (!env.DB) return [];
    try {
      const links = await getLinks(env.DB);
      return links;
    } catch (error) {
      console.error('Failed to fetch links from database:', error);
      // 兜底数据，数据库连接失败时使用
      return [
        {
          "name": "韩小韩博客",
          "link": "https://www.vvhan.com",
          "avatar": "https://q1.qlogo.cn/g?b=qq&nk=1655466387&s=640",
          "descr": "运气是计划之外的东西."
        },
        {
          "name": "韩小韩API",
          "link": "https://api.vvhan.com",
          "avatar": "https://api.vvhan.com/static/images/logo.webp",
          "descr": "免费Web API数据接口调用服务平台."
        }
      ];
    }
  }
}