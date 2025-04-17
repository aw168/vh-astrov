import { getTalkings } from '../utils/db';

export default {
  // API 接口请求优先，数据格式保持和 data 一致
  api: '',
  // api 为空则使用 data 静态数据 
  // 注意：图片请用 vh-img-flex 类包裹
  data: [], // 将静态数据置空，从数据库读取
  
  // 从数据库获取数据
  async fromDatabase(env: any) {
    if (!env.DB) return [];
    try {
      const talkings = await getTalkings(env.DB);
      return talkings;
    } catch (error) {
      console.error('Failed to fetch talkings from database:', error);
      // 兜底数据，数据库连接失败时使用
      return [
        {
          "date": "2025-02-12 19:36:16",
          "tags": [
            "树",
            "夕阳"
          ],
          "content": "好美🌲<p class=\"vh-img-flex\"><img src=\"https://i0.wp.com/shp.qpic.cn/collector/1655466387/937ec070-8448-4c7b-9c8b-abd41ce892cb/0\"></p>"
        },
        {
          "date": "2024-10-08 18:18:18",
          "tags": [
            "日常",
            "工作"
          ],
          "content": "下班！"
        },
        {
          "date": "2024-10-05 16:16:06",
          "tags": [
            "日常"
          ],
          "content": "记录第一条说说"
        }
      ];
    }
  }
}