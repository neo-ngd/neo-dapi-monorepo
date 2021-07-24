const HTTP_REGEX = '^https?:';

const WS_REGEX = '^wss?:';

function getUrlProtocol(url: string): string | undefined {
  const matches = url.match(new RegExp(/^\w+:/, 'gi'));
  if (!matches || !matches.length) return;
  return matches[0];
}

function matchRegexProtocol(url: string, regex: string): boolean {
  const protocol = getUrlProtocol(url);
  if (!protocol) return false;
  return new RegExp(regex).test(protocol);
}

export function isHttpUrl(url: string): boolean {
  return matchRegexProtocol(url, HTTP_REGEX);
}

export function isWsUrl(url: string): boolean {
  return matchRegexProtocol(url, WS_REGEX);
}
