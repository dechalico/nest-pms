export function validEmail(value: string): boolean {
  const re = /\S+@\S+\.\S+/;
  return re.test(value);
}
