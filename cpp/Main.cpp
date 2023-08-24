#include <bits/stdc++.h>
#include <gmpxx.h>

#include <Eigen/Core>
#include <atcoder/all>
#include <boost/range/algorithm.hpp>

#include "atcoder-ex/all.hpp"

using namespace std;
using namespace atcoder;
using namespace atcoderex;

int N;

void answer() {
  cin >> N;

  vector<int> A(N, 0);
  REP(i, N) cin >> A.at(i);
}

int main() {
  cin.tie(0);
  ios_base::sync_with_stdio(false);
  cout << fixed << setprecision(16);  // for decimal output

  answer();
}
