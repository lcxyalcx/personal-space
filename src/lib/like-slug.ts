/** 由文章外链生成稳定短 key，供点赞 Cookie 与 Redis 使用 */
export function likeSlugFromHref(href: string): string {
  let h = 5381;
  for (let i = 0; i < href.length; i++) {
    h = Math.imul(h, 33) ^ href.charCodeAt(i);
  }
  return "p" + (h >>> 0).toString(36);
}
