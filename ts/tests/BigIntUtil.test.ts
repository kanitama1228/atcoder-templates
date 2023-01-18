import { BigIntUtil } from "Main";

describe("bigint utils", () => {
  test("sqrt", () => {
    expect(BigIntUtil.sqrt(0n)).toBe(0n);
    expect(BigIntUtil.sqrt(1n)).toBe(1n);
    expect(BigIntUtil.sqrt(4n)).toBe(2n);
    expect(BigIntUtil.sqrt(BigInt("1000000000000000000000000000000"))).toBe(
      BigInt("1000000000000000")
    );

    expect(() => BigIntUtil.sqrt(-1n)).toThrowError();
  });
});
