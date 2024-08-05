/**
 * カルタリストをフォーマットして文字列で返す
 * @param kartaList カルタの配列
 * @returns フォーマットされたカルタリストの文字列
 */
export const formatStringForList = (kartaList: Karta[]): string => {
  if (kartaList.length === 0) {
    return 'カルタが見つかりませんでした。';
  }
  
  // ひらがなでソート
  const sortedKartaList = kartaList.sort((a, b) => a.karta_char.localeCompare(b.karta_char, 'ja'));
  return sortedKartaList.map(({ karta_char, karta_content }) => `${karta_char}：${karta_content}`).join('\n');
};