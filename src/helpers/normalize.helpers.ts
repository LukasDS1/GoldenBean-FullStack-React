export function normalized (s:string):string { 
    return s
    .normalize('NFD') // Separa carácter de tilde
    .replace(/[\u0300-\u036f]/g, '') // quita 
    .trim(); // quita espacios delante y detrás del texto, no entremedio
  }