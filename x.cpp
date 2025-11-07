#include <bits/stdc++.h>
using namespace std;

int getArtisticPhotographCount(int N, string C, int X, int Y) {
  set<array<int, 2>> a, p, b;
  int A = 0, P = 0, B = 0;
  for (int i = 0 ; i < N ; i++) {
    if (C[i] == 'A') a.insert ({i, ++A});
    if (C[i] == 'P') p.insert ({i, ++P});
    if (C[i] == 'B') b.insert ({i, ++B});
  }
  int count = 0;
  for (int i = 0 ; i < p.size () ; i++) {
	  auto ital = a.lower_bound (p[i]+X);
	  auto itau = a.upper_bound (p[i]+Y);
	  int a_diff = (*itau)[1]-(*ital)[1];

	  auto ital = b.lower_bound (p[i]+X);
	  auto itau = b.upper_bound (p[i]+Y);
	  int a_diff = (*itau)[1]-(*ital)[1];
  }
  return 0;
}
// .PBAAP.B 1 3
// P -> 1 5 -> (2, 4) (6, 8)
// (2, 4) -> A (3, 4) -> 2
// (6, 8) -> A -1
// A -> 3 4
// B -> 2 7 -> (-1, 1) (4, 6)
// (-1, 1) -> A -1
// (4, 6) -> A (4)
//
// PPAABB
// P -> 0 1
// A -> 2 3
// B -> 4 5
// P -> (1, 6)
