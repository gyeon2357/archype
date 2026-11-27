/**
 * Tina의 reference 필드는 아티스트를 파일 경로로 저장한다.
 * (예: content/artists/soon.md) 사이트에서는 슬러그만 필요하므로
 * 양쪽을 오가는 변환을 한곳에 둔다.
 */
export function refToSlug(reference: string): string {
  return reference.replace(/^.*\/artists\//, '').replace(/\.md$/, '');
}

export function pad(value: number): string {
  return String(value).padStart(2, '0');
}
