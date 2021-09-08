export function toClassList (...classes: string[]) {
  return classes.filter(c => c).join(' ')
}
