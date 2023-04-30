#include <bits/stdc++.h>

#include <atcoder/all>

using namespace std;
using namespace atcoder;

#define endl "\n"
#define uint unsigned int
#define ll long long
#define ull unsigned long long
#define REP(i, N) for (int i = 0; i < (N); i++)
#define POW2(N) (1LL << (N))
#define echoYesNo(flag) cout << ((bool)(flag) ? "Yes" : "No") << endl

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

int N;

void answer() {
  cin >> N;

  vector<int> A(N, 0);
  REP(i, N) cin >> A.at(i);
}

int main() {
  cin.tie(0);
  ios_base::sync_with_stdio(false);

  answer();
}
