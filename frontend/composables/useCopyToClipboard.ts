export async function useCopyToClipboard(value: string) {
  if (navigator.clipboard !== undefined) {
    return useNavigatorClipboard(value);
  }
  return useExecCommand(value);
}

async function useExecCommand(value: string) {
  const el = document.createElement('textarea');
  el.value = value;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-999999px';
  document.body.appendChild(el);
  const selrange = document.getSelection();
  const selected =
    selrange !== null ? (selrange.rangeCount > 0 ? selrange.getRangeAt(0) : false) : false;
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  if (selected && selrange) {
    selrange.removeAllRanges();
    selrange.addRange(selected);
  }
}

async function useNavigatorClipboard(value: string) {
  await navigator.clipboard.writeText(value);
}
