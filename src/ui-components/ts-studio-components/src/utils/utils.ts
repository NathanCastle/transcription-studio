export function format(first: string, middle: string, last: string): string {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}

export function formatSecondsToTimestamp(seconds:number){
  var hours   = Math.floor(seconds/ 3600);
  var minutes = Math.floor((seconds- (hours * 3600)) / 60);
  var seconds = seconds- (hours * 3600) - (minutes * 60);

  return `${hours.toFixed().padStart(2, "0")}:${minutes.toFixed().padStart(2, "0")}:${seconds.toFixed().padStart(2, "0")}`;
}