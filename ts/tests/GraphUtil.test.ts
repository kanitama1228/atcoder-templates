import { GraphUtil } from "Main";

describe("DFS NonDirectedGraph", () => {
  test("works", () => {
    const graph = GraphUtil.NonDirectedGraph.of([
      [1, 3],
      [5, 3],
      [3, 7],
      [5, 9],
      [7, 10],
      [10, 11],
    ]);

    let result = -1;
    const onVisited = (n: number) => {
      if (n > result) {
        result = n;
      }
    };

    GraphUtil.dfs(graph, 1, onVisited);
    expect(result).toBe(11);
  });

  test("handles breakIf", () => {
    const graph = GraphUtil.NonDirectedGraph.of([
      [1, 3],
      [5, 3],
      [3, 7],
      [5, 9],
      [7, 10],
      [10, 11],
    ]);

    let result = -1;
    const onVisited = (n: number) => {
      if (n > result) {
        result = n;
      }
    };
    // 偶数の場合は探索を打ち切る
    const breakIf = (n: number) => n % 2 === 0;

    GraphUtil.dfs(graph, 1, onVisited, breakIf);
    expect(result).toBe(10);
  });

  test("handles nonexist node", () => {
    const graph = GraphUtil.NonDirectedGraph.of<number>([
      [2, 4],
      [4, 3],
      [3, 10],
    ]);

    let result = -1;
    const onVisited = (n: number) => {
      if (n > result) {
        result = n;
      }
    };

    GraphUtil.dfs(graph, 1, onVisited);
    expect(result).toBe(1);
  });
});

describe("DFS DirectedGraph", () => {
  test.each`
    start | expected
    ${3}  | ${11}
    ${5}  | ${5}
  `("works", ({ start, expected }) => {
    let result = -1;
    const onVisited = (n: number) => {
      if (n > result) {
        result = n;
      }
    };

    const graph = GraphUtil.DirectedGraph.of([
      [1, 3],
      [3, 5],
      [3, 7],
      [7, 10],
      [10, 11],
    ]);
    GraphUtil.dfs(graph, start, onVisited);
    expect(result).toBe(expected);
  });

  test("handles breakIf", () => {
    const graph = GraphUtil.DirectedGraph.of([
      [1, 3],
      [3, 7],
      [5, 9],
      [7, 10],
      [10, 11],
    ]);

    let result = -1;
    const onVisited = (n: number) => {
      if (n > result) {
        result = n;
      }
    };
    // 偶数の場合は探索を打ち切る
    const breakIf = (n: number) => n % 2 === 0;

    GraphUtil.dfs(graph, 1, onVisited, breakIf);
    expect(result).toBe(10);
  });

  test("handles nonexist node", () => {
    const graph = GraphUtil.DirectedGraph.of<number>([
      [2, 4],
      [4, 3],
      [3, 10],
    ]);

    let result = -1;
    const onVisited = (n: number) => {
      if (n > result) {
        result = n;
      }
    };

    GraphUtil.dfs(graph, 1, onVisited);
    expect(result).toBe(1);
  });
});

describe("Union-Find", () => {
  test("works", () => {
    const uf = new GraphUtil.UnionFindTree(5);
    expect(uf.isUnited(1, 2)).toBe(false);

    uf.connect(1, 2);
    uf.connect(3, 4);
    uf.connect(2, 5);

    expect(uf.isUnited(1, 2)).toBe(true);
    expect(uf.isUnited(1, 5)).toBe(true);
    expect(uf.isUnited(3, 4)).toBe(true);
    expect(uf.isUnited(2, 3)).toBe(false);
    expect(uf.isUnited(1, 4)).toBe(false);
  });

  test("works2", () => {
    const uf = new GraphUtil.UnionFindTree(5);
    expect(uf.isUnited(1, 5)).toBe(false);

    uf.connect(1, 2);
    uf.connect(3, 2);
    uf.connect(4, 3);
    uf.connect(5, 4);

    expect(uf.isUnited(1, 5)).toBe(true);
  });

  test("error case", () => {
    const uf = new GraphUtil.UnionFindTree(5);
    expect(() => uf.assertNodeExists(0)).toThrowError();
    expect(() => uf.assertNodeExists(6)).toThrowError();
  });
});
