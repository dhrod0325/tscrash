export function $(selector: string): HTMLElement {
  return <HTMLElement>document.querySelector(selector);
}

export function getUnixTimestamp(date: number | string | Date) {
  return new Date(date).getTime();
}
