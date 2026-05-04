/** 粗略阅读时间：中英混排按字数估算 */
export function estimateReadMinutes(text: string): number {
  const t = text.trim();
  if (!t) return 1;
  const wordsEn = t.split(/\s+/).filter(Boolean).length;
  const cjk = (t.match(/[\u4e00-\u9fff]/g) ?? []).length;
  const minutes = wordsEn / 220 + cjk / 450;
  return Math.max(1, Math.round(minutes));
}
