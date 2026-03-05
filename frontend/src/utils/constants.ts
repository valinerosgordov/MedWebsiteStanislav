export const API_BASE = import.meta.env.DEV ? 'http://localhost:5134' : '';

export function formatMemberNumber(num: number): string {
  return `ID ${String(num).padStart(5, '0')}`;
}

export function formatDate(dateStr: string | null): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${dd}.${mm}.${yyyy}`;
}
