import * as fs from "fs";
import * as readline from "readline";
import { Stack } from "tstl";

function main() {
  // const lines = AtCoderUtil.readAllInput();
  // console.log(lines);
}

/* ------ library ------ */
export module AtCoderUtil {
  export function readAllInput() {
    return fs.readFileSync("/dev/stdin", "utf8").trim().split("\n");
  }

  /**
   * @param func inputを受け取った際の処理
   */
  export function copeWithInteractiveInput(func: (line: string) => void) {
    const reader = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    reader.on("line", func);
  }
}
export module MathUtil {
  /**
   * 試し割り法による素数判定
   * @param n
   * @returns
   */
  export function isPrime(n: number) {
    assertNaturalNumber(n);

    if (n === 1) return false;
    if (n === 2) return true;

    if (n % 2 === 0) return false;

    for (let i = 3; i * i <= n; i += 2) {
      if (n % i === 0) return false;
    }

    return true;
  }

  /**
   * 最大公約数
   * @param a
   * @param b
   * @returns
   */
  export function gcd(a: number, b: number) {
    assertNaturalNumber(a);
    assertNaturalNumber(b);

    while (a >= 1 && b >= 1) {
      if (a < b) {
        b = b % a;
      } else {
        a = a % b;
      }
    }

    if (a >= 1) {
      return a;
    }
    return b;
  }

  type NewtonOption = Readonly<{
    /** 探索開始時のx */
    init_x: number;
    /**
     * 試行回数
     * @default 5
     */
    attempts?: number;
  }>;
  /**
   * ニュートン法による数値計算
   * @param fx f(x)
   * @param dx f'(x)
   * @param r 求めたい値をaとする時、fx(a) = rを満たすような値r
   * @param options
   * @returns fx(a) = rを満たすa
   */
  export function newton(
    fx: (x: number) => number,
    dx: (x: number) => number,
    r: number,
    options: NewtonOption
  ) {
    const { init_x, attempts = 5 } = options;
    let x = init_x;

    for (let i = 0; i < attempts; i++) {
      const y = fx(x);
      // y = ax + b
      const a = dx(x);
      const b = y - a * x;

      const next_x = (r - b) / a;
      x = next_x;
    }

    return x;
  }

  /**
   * 全ての数の和の剰余
   * @param nums
   * @param mod
   * @returns
   */
  export function sumMod(nums: number[], mod: number) {
    assertNaturalNumber(mod);

    return nums.reduce((r, a) => (r + a) % mod, 0);
  }

  /**
   * 繰り返し二乗法による積の剰余
   * @param base
   * @param exp
   * @param mod
   * @returns (base ^ exp) % mod
   */
  export function powMod(base: number, exp: number, mod: number) {
    assertNaturalNumber(mod);
    assertNaturalNumber(base);

    assertInteger(exp);
    assertNonNegative(exp);
    if (exp > Number.MAX_SAFE_INTEGER) {
      throw new Error(`Exp [${exp}] is over MAX_SAFE_INTEGER.`);
    }

    let current = base;
    let answer = 1;

    for (let i = 0; i < 52 /* Number.MAX_SAFE_INTEGER = 2^53 -1 */; i++) {
      if ((exp & (2 ** i)) !== 0) {
        answer = (answer * current) % mod;
      }
      current = (current * current) % mod;
    }

    return answer;
  }

  /**
   * 割り算の剰余
   * @param a
   * @param b
   * @param m
   * @returns a / b (mod m)
   */
  export function divMod(a: number, b: number, m: number) {
    assertNaturalNumber(a);
    assertNaturalNumber(b);
    assertNaturalNumber(m);

    return (a * invMod(b, m)) % m;
  }

  /**
   * モジュラ逆数
   * @note expect to be gcd(x, m) = 1
   * @param x
   * @param m 素数
   * @returns xy ≡ 1(mod m)を満たすy
   */
  export function invMod(x: number, m: number) {
    assertNaturalNumber(x);
    assertNaturalNumber(m);

    return powMod(x, m - 2, m);
  }

  function assertNaturalNumber(n: number) {
    assertPositive(n);
    assertInteger(n);
  }

  function assertPositive(n: number) {
    if (n <= 0) {
      throw new Error(`Not a positive number: ${n}`);
    }
  }

  function assertNonNegative(n: number) {
    if (n < 0) {
      throw new Error(`Negative number: ${n}`);
    }
  }

  function assertInteger(n: number) {
    if (!Number.isInteger(n)) {
      throw new Error(`Not an integer: ${n}`);
    }
  }
}
export module BigIntUtil {
  /**
   * bigintの平方根を計算する
   * @param val
   * @returns 戻り値はbigint(整数)となる
   */
  export function sqrt(val: bigint) {
    if (val < 0n) {
      throw new Error(`Not a positive number: ${val}`);
    }

    if (val <= 1n) return val;

    if (val <= Number.MAX_SAFE_INTEGER) {
      const _v = Number.parseInt(val.toString());
      return BigInt(Math.sqrt(_v));
    }

    function _sqrt(n: bigint, x0: bigint): bigint {
      const x1 = (n / x0 + x0) >> 1n;
      if (x0 === x1 || x0 === x1 - 1n) {
        return x0;
      }
      return _sqrt(n, x1);
    }

    return _sqrt(val, 1n);
  }
}

export module GraphUtil {
  type NodeType = string | number | symbol;
  type Nodes<Node extends NodeType> = Record<Node, Node[]>;
  interface Graph<T extends NodeType> {
    readonly findNeighbours: (current: T) => T[];
  }

  /**
   * 無向グラフ
   */
  export class NonDirectedGraph<T extends NodeType> implements Graph<T> {
    readonly nodes: Nodes<T>;

    static of<T extends NodeType>(edges: T[][]) {
      const graph = {} as Nodes<T>;

      for (const e of edges) {
        if (!graph[e[0]]) {
          graph[e[0]] = [];
        }
        if (!graph[e[1]]) {
          graph[e[1]] = [];
        }

        graph[e[0]].push(e[1]);
        graph[e[1]].push(e[0]);
      }
      return new NonDirectedGraph(graph);
    }

    public findNeighbours(current: T): T[] {
      if (!this.nodes[current]) {
        return [];
      }
      return this.nodes[current];
    }

    private constructor(nodes: Nodes<T>) {
      this.nodes = nodes;
    }
  }

  /**
   * 有向グラフ
   */
  export class DirectedGraph<T extends NodeType> implements Graph<T> {
    readonly nodes: Nodes<T>;

    /**
     * @param edges [a, b] ならば a -> bの辺を張る
     * @returns
     */
    static of<T extends NodeType>(edges: T[][]) {
      const graph = {} as Nodes<T>;

      for (const e of edges) {
        if (!graph[e[0]]) {
          graph[e[0]] = [];
        }
        if (!graph[e[1]]) {
          graph[e[1]] = [];
        }

        graph[e[0]].push(e[1]);
      }
      return new DirectedGraph(graph);
    }

    public findNeighbours(current: T): T[] {
      if (!this.nodes[current]) {
        return [];
      }
      return this.nodes[current];
    }

    private constructor(nodes: Nodes<T>) {
      this.nodes = nodes;
    }
  }

  /**
   * 深さ優先探索
   * @param graph グラフ
   * @param start 探索開始ノード
   * @param onVisited ノード到達時に実行される関数。
   * @param breakIf trueを返すと探索を打ち切る。onVisitiedの評価後に評価される。
   */
  export function dfs<T extends NodeType>(
    graph: Graph<T>,
    start: T,
    onVisited: (node: T) => void,
    breakIf?: (node: T) => boolean
  ) {
    const visited = new Set<T>();
    const queue = new Stack<T>();

    const _dfs = () => {
      while (!queue.empty()) {
        const current = queue.top();
        queue.pop();

        visited.add(current);
        onVisited(current);
        if (breakIf && breakIf(current)) {
          break;
        }

        const neighbours = graph.findNeighbours(current);
        neighbours.forEach((n) => {
          if (!visited.has(n)) {
            queue.push(n);
          }
        });
      }
    };

    queue.push(start);
    _dfs();
  }

  /**
   * UnionFind木
   */
  export class UnionFindTree {
    private readonly leaders: Record<number, number>;

    /**
     * 1-nまでのノードを作成する。
     * @param n
     */
    constructor(n: number) {
      if (n <= 0 && !Number.isInteger(n)) {
        throw new Error(`Union-Find expects natural number, but [${n}] `);
      }
      this.leaders = {} as Record<number, number>;
      for (let i = 1; i <= n; i++) {
        this.leaders[i] = i;
      }
    }

    /**
     * 与えられたノードのルートノードを検索する。
     * @param n
     * @returns
     */
    public root(n: number) {
      let leader = this.leaders[n];
      while (this.leaders[leader] !== leader) {
        leader = this.leaders[leader];
      }

      this.leaders[n] = leader; // 経路圧縮
      return leader;
    }

    /**
     * 与えられた2つのノードが同じ連結成分にあるかどうかを判別する。
     * @param a
     * @param b
     * @returns
     */
    public isUnited(a: number, b: number) {
      return this.root(a) === this.root(b);
    }

    /**
     * 与えられた2つのノードを接続する。
     * @param a
     * @param b
     * @returns
     */
    public connect(a: number, b: number) {
      const rootA = this.root(a);
      const rootB = this.root(b);

      if (rootA === rootB) {
        return;
      }

      this.leaders[rootB] = rootA;
    }

    public assertNodeExists(node: number) {
      if (!this.leaders[node]) {
        throw new Error(`Node [${node}] doesn't exist.`);
      }
    }
  }
}
/* --------------------------------------------- */

main();
