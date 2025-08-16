export function timeAgo(date: string | number | Date) {
  const d = new Date(date).getTime()
  const diff = Date.now() - d
  const mins = Math.floor(diff/60000)
  if (mins < 60) return `${mins}m`
  const hrs = Math.floor(mins/60)
  if (hrs < 24) return `${hrs}h`
  const days = Math.floor(hrs/24)
  return `${days}d`
}
