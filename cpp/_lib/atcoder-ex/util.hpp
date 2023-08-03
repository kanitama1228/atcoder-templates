#ifndef ATCODER_EX_UTIL
#define ATCODER_EX_UTIL 1

#include <bits/stdc++.h>

using namespace std;

#define endl "\n"
#define uint unsigned int
#define ll long long
#define ull unsigned long long
#define REP(i, N) for (int i = 0; i < (N); i++)
#define POW2(N) (1LL << (N))
#define echoYesNo(flag) cout << ((bool)(flag) ? "Yes" : "No") << endl

namespace atcoderex {

template <class T>
inline bool chmax(T &a, T b) {
  return ((a < b) ? (a = b, true) : (false));
}

template <class T>
inline bool chmin(T &a, T b) {
  return ((a > b) ? (a = b, true) : (false));
}

/*
 * 座標圧縮
 * O(NlogN)
 */
template <class T>
inline vector<T> coco(const vector<T> &A) {
  auto B = A;
  sort(B.begin(), B.end());
  B.erase(unique(B.begin(), B.end()), B.end());

  vector<T> R;
  for (auto a : A) {
    auto r = lower_bound(B.begin(), B.end(), a) - B.begin();
    R.emplace_back(r);
  }
  return R;
}

/**
 * 素因数分解
 * O(√N)
 */
template <class T>
inline vector<pair<T, int>> prime_factorize(T n) {
  vector<pair<T, int>> r;
  int c_2 = 0;
  while (n % 2 == 0) {
    n /= 2;
    c_2++;
  }
  r.emplace_back(2, c_2);

  for (T i = 3; i * i <= n; i += 2) {
    int c_i = 0;
    while (n % i == 0) {
      n /= i;
      c_i++;
    }
    r.emplace_back(i, c_i);
  }

  if (n > 1) r.emplace_back(n, 1);

  return r;
}

/**
 * 点
 */
template <typename T,
          typename = typename enable_if<is_arithmetic<T>::value, T>::type>
struct Point {
  T x;
  T y;
};

/**
 * 線分
 */
template <typename T>
struct Segment {
  Point<T> p1;
  Point<T> p2;
};

/**
 * 外積
 */
template <typename T>
ll outer_product(Point<T> &O, Point<T> &A, Point<T> &B) {
  return (O.x - A.x) * (B.y - O.y) + (O.y - A.y) * (O.x - B.x);
}

/**
 * 線分の交差判定
 */
template <typename T>
bool isCrossed(Segment<T> &AB, Segment<T> &CD) {
  return isOpposite(AB, CD.p1, CD.p2) && isOpposite(CD, AB.p1, AB.p2);
}
/**
 * 線分basisに対して2点a, bが反対の側に存在するか
 */
template <typename T>
bool isOpposite(Segment<T> &basis, Point<T> &a, Point<T> &b) {
  Point<T> p = basis.p1;
  Point<T> q = basis.p2;

  auto s = outer_product(p, q, a);
  auto t = outer_product(p, q, b);
  return s * t < 0;
}

}  // namespace atcoderex

#endif
