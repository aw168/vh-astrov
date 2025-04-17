import SITE_INFO from '@/config';

// 预定义的banner图片名称列表（你需要确保这些文件存在于public/assets/images/banner/目录中）
const BANNER_IMAGES = [
  'banner1.jpg',
  'banner2.jpg',
  'banner3.jpg',
  'banner4.jpg',
  'banner5.jpg',
  // 如果有更多图片，可以继续添加
];

/**
 * 随机打乱数组（Fisher-Yates 洗牌算法）
 * @param {any[]} array - 需要打乱的数组
 * @returns {any[]} - 打乱后的数组
 */
function shuffleArray(array: any[]) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// 随机获取一个banner图片
function getRandomBanner() {
  const shuffledImages = shuffleArray(BANNER_IMAGES);
  return shuffledImages[0];
}

export default async (filename: string | null | undefined) => {
  if (filename) return filename;
  
  // 随机获取一个banner图片
  const randomBanner = getRandomBanner();
  return SITE_INFO.Site + `/assets/images/banner/${randomBanner}`;
}
