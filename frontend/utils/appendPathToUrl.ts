export default function (baseUrl: string, path: string): string {
  const cleanBaseUrl = baseUrl.replace(/\/$/, '');
  const cleanPath = path.replace(/^\//, '');
  const resultUrl = cleanBaseUrl + '/' + cleanPath;

  // Encode the result URL to handle special characters
  return encodeURI(resultUrl);
}
