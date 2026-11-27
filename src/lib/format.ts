export type Status = 'available' | 'preorder' | 'soldout' | 'archived';

/** 상태는 색이나 크기가 아니라 라틴 대문자 라벨로만 알린다. */
export const statusLabel: Record<Status, string> = {
  available: 'Available',
  preorder: 'Pre-order',
  soldout: 'Sold out',
  archived: 'Archived',
};

export function isPast(status: Status) {
  return status === 'soldout' || status === 'archived';
}

export function price(value?: number) {
  return typeof value === 'number' ? value.toLocaleString('ko-KR') : '';
}

export function pad(n: number) {
  return String(n).padStart(2, '0');
}
