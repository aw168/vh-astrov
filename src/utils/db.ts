// 添加D1Database类型声明
interface D1Database {
  prepare: (query: string) => D1PreparedStatement;
}

interface D1PreparedStatement {
  bind: (...values: any[]) => D1PreparedStatement;
  first: <T = any>(column?: string) => Promise<T | null>;
  run: <T = any>() => Promise<D1Result<T>>;
  all: <T = any>() => Promise<D1Result<T>>;
}

interface D1Result<T> {
  results: T[];
  success: boolean;
  meta?: any;
}

export interface LinkItem {
  id?: number;
  name: string;
  link: string;
  avatar: string;
  descr: string;
}

export interface TalkingItem {
  id?: number;
  date: string;
  tags: string;
  content: string;
}

export interface FriendItem {
  id?: number;
  title: string;
  auther: string;
  date: string;
  link: string;
  content: string;
}

export interface ConfigItem {
  id?: number;
  key: string;
  value: string;
}

// 获取所有链接
export async function getLinks(db: D1Database) {
  const { results } = await db.prepare('SELECT * FROM links ORDER BY id ASC').all<LinkItem>();
  return results;
}

// 获取单个链接
export async function getLink(db: D1Database, id: number) {
  const result = await db.prepare('SELECT * FROM links WHERE id = ?').bind(id).first<LinkItem>();
  return result;
}

// 添加链接
export async function addLink(db: D1Database, data: LinkItem) {
  const { name, link, avatar, descr } = data;
  const result = await db
    .prepare('INSERT INTO links (name, link, avatar, descr) VALUES (?, ?, ?, ?)')
    .bind(name, link, avatar, descr)
    .run();
  return result;
}

// 更新链接
export async function updateLink(db: D1Database, id: number, data: LinkItem) {
  const { name, link, avatar, descr } = data;
  const result = await db
    .prepare('UPDATE links SET name = ?, link = ?, avatar = ?, descr = ? WHERE id = ?')
    .bind(name, link, avatar, descr, id)
    .run();
  return result;
}

// 删除链接
export async function deleteLink(db: D1Database, id: number) {
  const result = await db.prepare('DELETE FROM links WHERE id = ?').bind(id).run();
  return result;
}

// 获取所有说说
export async function getTalkings(db: D1Database) {
  const { results } = await db.prepare('SELECT * FROM talkings ORDER BY date DESC').all<TalkingItem>();
  return results.map(item => ({
    ...item,
    tags: JSON.parse(item.tags)
  }));
}

// 获取单个说说
export async function getTalking(db: D1Database, id: number) {
  const result = await db.prepare('SELECT * FROM talkings WHERE id = ?').bind(id).first<TalkingItem>();
  if (result) {
    return {
      ...result,
      tags: JSON.parse(result.tags)
    };
  }
  return null;
}

// 添加说说
export async function addTalking(db: D1Database, data: TalkingItem) {
  const { date, tags, content } = data;
  const tagsJson = typeof tags === 'string' ? tags : JSON.stringify(tags);
  const result = await db
    .prepare('INSERT INTO talkings (date, tags, content) VALUES (?, ?, ?)')
    .bind(date, tagsJson, content)
    .run();
  return result;
}

// 更新说说
export async function updateTalking(db: D1Database, id: number, data: TalkingItem) {
  const { date, tags, content } = data;
  const tagsJson = typeof tags === 'string' ? tags : JSON.stringify(tags);
  const result = await db
    .prepare('UPDATE talkings SET date = ?, tags = ?, content = ? WHERE id = ?')
    .bind(date, tagsJson, content, id)
    .run();
  return result;
}

// 删除说说
export async function deleteTalking(db: D1Database, id: number) {
  const result = await db.prepare('DELETE FROM talkings WHERE id = ?').bind(id).run();
  return result;
}

// 获取所有朋友圈
export async function getFriends(db: D1Database) {
  const { results } = await db.prepare('SELECT * FROM friends ORDER BY date DESC').all<FriendItem>();
  return results;
}

// 获取单个朋友圈
export async function getFriend(db: D1Database, id: number) {
  const result = await db.prepare('SELECT * FROM friends WHERE id = ?').bind(id).first<FriendItem>();
  return result;
}

// 添加朋友圈
export async function addFriend(db: D1Database, data: FriendItem) {
  const { title, auther, date, link, content } = data;
  const result = await db
    .prepare('INSERT INTO friends (title, auther, date, link, content) VALUES (?, ?, ?, ?, ?)')
    .bind(title, auther, date, link, content)
    .run();
  return result;
}

// 更新朋友圈
export async function updateFriend(db: D1Database, id: number, data: FriendItem) {
  const { title, auther, date, link, content } = data;
  const result = await db
    .prepare('UPDATE friends SET title = ?, auther = ?, date = ?, link = ?, content = ? WHERE id = ?')
    .bind(title, auther, date, link, content, id)
    .run();
  return result;
}

// 删除朋友圈
export async function deleteFriend(db: D1Database, id: number) {
  const result = await db.prepare('DELETE FROM friends WHERE id = ?').bind(id).run();
  return result;
}

// 获取配置
export async function getConfig(db: D1Database, key: string) {
  const result = await db.prepare('SELECT value FROM configs WHERE key = ?').bind(key).first<{value: string}>();
  return result ? result.value : null;
}

// 获取所有配置
export async function getAllConfigs(db: D1Database) {
  const { results } = await db.prepare('SELECT * FROM configs').all<ConfigItem>();
  return results;
}

// 更新配置
export async function updateConfig(db: D1Database, key: string, value: string) {
  const result = await db
    .prepare('INSERT OR REPLACE INTO configs (key, value) VALUES (?, ?)')
    .bind(key, value)
    .run();
  return result;
} 