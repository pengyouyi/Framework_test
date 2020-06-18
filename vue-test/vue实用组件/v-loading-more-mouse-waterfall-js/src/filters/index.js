
// HTML变成text
export function html2text(string) {
  const div = document.createElement('div');
  div.innerHTML = string;
  return div.textContent || div.innerHTMl;
}


