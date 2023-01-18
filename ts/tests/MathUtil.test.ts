import { MathUtil } from "Main";

describe("Prime", () => {
  test("isPrime", () => {
    expect(MathUtil.isPrime(1)).toBe(false);
    expect(MathUtil.isPrime(2)).toBe(true);
    expect(MathUtil.isPrime(3)).toBe(true);
    expect(MathUtil.isPrime(4)).toBe(false);
    expect(MathUtil.isPrime(9)).toBe(false);
    expect(MathUtil.isPrime(1000000007)).toBe(true);

    expect(() => MathUtil.isPrime(0)).toThrowError();
    expect(() => MathUtil.isPrime(1.1)).toThrowError();
    expect(() => MathUtil.isPrime(-1)).toThrowError();
  });
});

describe("gcd", () => {
  test("works", () => {
    expect(MathUtil.gcd(12, 18)).toBe(6);
    expect(MathUtil.gcd(30, 15)).toBe(15);
    expect(MathUtil.gcd(121, 22)).toBe(11);
    expect(MathUtil.gcd(1, 24)).toBe(1);
    expect(MathUtil.gcd(1, 1)).toBe(1);

    expect(() => MathUtil.gcd(1.1, 18)).toThrowError();
    expect(() => MathUtil.gcd(18, 0)).toThrowError();
  });
});

describe("newton", () => {
  test("√2", () => {
    expect(
      MathUtil.newton(
        (x) => x * x,
        (x) => 2 * x,
        2,
        { init_x: 2 }
      )
    ).toBeCloseTo(1.41421356);
  });

  test("4の3乗根", () => {
    expect(
      MathUtil.newton(
        (x) => x * x * x,
        (x) => 3 * x * x,
        4,
        { init_x: 3 }
      )
    ).toBeCloseTo(1.58740105);
  });

  test("custom attempts", () => {
    expect(
      MathUtil.newton(
        (x) => x * x,
        (x) => 2 * x,
        2,
        { init_x: 2, attempts: 2 }
      )
    ).toBeCloseTo(1.416);
  });
});

describe("mod", () => {
  test("mod for sum", () => {
    expect(MathUtil.sumMod([1, 2, 3], 7)).toBe(6);
    expect(MathUtil.sumMod([7, 8, 9], 7)).toBe(3);
    expect(MathUtil.sumMod([1], 9)).toBe(1);
    expect(MathUtil.sumMod([1, 3], 1)).toBe(0);
    expect(MathUtil.sumMod([], 9)).toBe(0);

    expect(() => MathUtil.sumMod([1, 3, 5], -2)).toThrowError();
    expect(() => MathUtil.sumMod([1, 3, 5], 0)).toThrowError();
    expect(() => MathUtil.sumMod([1, 3, 5], 1.1)).toThrowError();
  });

  test("mod for pow", () => {
    expect(MathUtil.powMod(2, 4, 3)).toBe(1);
    expect(MathUtil.powMod(3, 5, 7)).toBe(5);
    expect(MathUtil.powMod(6, 10, 13)).toBe(4);
    expect(MathUtil.powMod(2, 0, 10)).toBe(1);
    expect(MathUtil.powMod(6, 10, 7)).toBe(1);
    expect(MathUtil.powMod(3, Number.MAX_SAFE_INTEGER, 10)).toBe(7);
    expect(MathUtil.powMod(1, 100, 7)).toBe(1);

    expect(() => MathUtil.powMod(3, 5, -2)).toThrowError();
    expect(() => MathUtil.powMod(3, 5, 0)).toThrowError();
    expect(() => MathUtil.powMod(0, 100, 10)).toThrowError();
    expect(() => MathUtil.powMod(-1, 2, 1)).toThrowError();
    expect(() => MathUtil.powMod(3, -1, 1)).toThrowError();
    expect(() =>
      MathUtil.powMod(3, Number.MAX_SAFE_INTEGER + 1, 10)
    ).toThrowError();
  });

  test("modular inverse", () => {
    expect(MathUtil.invMod(3, 7)).toBe(5);
    expect(MathUtil.invMod(5, 11)).toBe(9);

    expect(() => MathUtil.invMod(0, 13)).toThrowError();
    expect(() => MathUtil.invMod(11, 0)).toThrowError();
  });

  test("mod for div", () => {
    expect(MathUtil.divMod(7, 9, 11)).toBe(2);
    expect(MathUtil.divMod(13, 5, 7)).toBe(4);

    expect(() => MathUtil.divMod(0, 13, 11)).toThrowError();
    expect(() => MathUtil.divMod(29, 0, 3)).toThrowError();
    expect(() => MathUtil.divMod(5, 19, 0)).toThrowError();
  });
});
