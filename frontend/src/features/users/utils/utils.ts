export function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString([], {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
