import {
  getApiTokenFromHeader,
  parseHrtimeToMilliSeconds,
} from './apiHelpers';

describe('parseHrtimeToMilliSeconds', () => {
  it('should convert [seconds, nanoseconds] to milliseconds string', () => {
    // 1 second + 500_000 nanoseconds = 1000.5 ms
    const result = parseHrtimeToMilliSeconds([1, 500_000]);
    expect(result).toBe('1000.500');
  });

  it('should handle zero hrtime', () => {
    expect(parseHrtimeToMilliSeconds([0, 0])).toBe('0.000');
  });

  it('should handle fractional nanoseconds correctly', () => {
    // 0 seconds + 1_234_567 nanoseconds = 1.234567 ms -> toFixed(3) = '1.235'
    expect(parseHrtimeToMilliSeconds([0, 1_234_567])).toBe('1.235');
  });
});

describe('getApiTokenFromHeader', () => {
  it('should return undefined when req is undefined', () => {
    expect(getApiTokenFromHeader(undefined)).toBeUndefined();
  });

  it('should return undefined when headers are missing', () => {
    expect(getApiTokenFromHeader({})).toBeUndefined();
  });

  it('should extract xc-token header', () => {
    expect(getApiTokenFromHeader({ headers: { 'xc-token': 'my-token' } })).toBe(
      'my-token',
    );
  });

  it('should trim xc-token value', () => {
    expect(
      getApiTokenFromHeader({ headers: { 'xc-token': '  spaced  ' } }),
    ).toBe('spaced');
  });

  it('should return undefined for empty xc-token', () => {
    expect(
      getApiTokenFromHeader({ headers: { 'xc-token': '   ' } }),
    ).toBeUndefined();
  });

  it('should fall back to Authorization Bearer when xc-token is absent', () => {
    expect(
      getApiTokenFromHeader({
        headers: { authorization: 'Bearer secret' },
      }),
    ).toBe('secret');
  });

  it('should trim bearer token value', () => {
    expect(
      getApiTokenFromHeader({
        headers: { authorization: 'Bearer   padded   ' },
      }),
    ).toBe('padded');
  });

  it('should be case-insensitive for Bearer prefix', () => {
    expect(
      getApiTokenFromHeader({
        headers: { authorization: 'bearer lower' },
      }),
    ).toBe('lower');
  });

  it('should prefer xc-token over Authorization Bearer', () => {
    expect(
      getApiTokenFromHeader({
        headers: { 'xc-token': 'primary', authorization: 'Bearer fallback' },
      }),
    ).toBe('primary');
  });

  it('should return undefined for non-Bearer Authorization', () => {
    expect(
      getApiTokenFromHeader({
        headers: { authorization: 'Basic dXNlcjpwYXNz' },
      }),
    ).toBeUndefined();
  });

  it('should return undefined when authorization header is not a string', () => {
    expect(
      getApiTokenFromHeader({ headers: { authorization: 123 as any } }),
    ).toBeUndefined();
  });
});
