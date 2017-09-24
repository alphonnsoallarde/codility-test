/*
  A non-empty zero-indexed array A consisting of N integers is given. A slice of that array is a pair of integers (P, Q) such that 0 ≤ P ≤ Q < N. Integer P is called the beginning of the slice; integer Q is called the end of the slice. The number Q - P + 1 is called the size of the slice. A slice (P, Q) of array A is called ascending if A[P] < A[P+1] < ... < A[Q−1] < A[Q].

  For example, consider array A such that:
  A[0] =  2  A[1] = 2  A[2] = 2  A[3] =  2  A[4] = 1  A[5] = 2   A[6] = -1  A[7] = 2  A[8] = 1  A[9] =  3

  Pair (0, 3) is a slice of array A of size 4 that is not ascending. Pair (2, 2) is a slice of size 1 that is ascending. Pair (4, 5) is a slice of size 2 that is ascending. Pairs (6, 7) and (8, 9) are other slices of size 2 that are ascending. There is no slice of array A that is ascending and has size greater than 2.

  Write a function:

    function solution(A);

  that, given a zero-indexed array A consisting of N integers, returns the beginning of any ascending slice of A of maximal size.

  For example, given array A such that:

    A[0] =  2  A[1] = 2  A[2] = 2
    A[3] =  2  A[4] = 1  A[5] = 2
    A[6] = -1  A[7] = 2  A[8] = 1
    A[9] =  3

  the function may return 4, 6 or 8, as explained above. Given array A such that

    A[0] = 30  A[1] = 20  A[2] = 10

  the function may return 0, 1 or 2, because all ascending slices of this array have size 1.

  Assume that:

    - N is an integer within the range [1..1,000,000];
    - each element of array A is an integer within the range [−2,147,483,648..2,147,483,647].

  Complexity:

    - expected worst-case time complexity is O(N);
    - expected worst-case space complexity is O(N), beyond input storage (not counting the storage required for input arguments).
*/

function App(A) {
    this.A = A;
    this.beginningSlice = A[0];
    this.endingSlice = A[0];
    this.currentIndexPosition = 0;
    this.pairIndexPosition = 0;
    this.currentPairSize = 0;
    this.maxPairSize = 0; // holds the maximal size of an ascending pair
    this.seeAll = [];
}

App.prototype.findAscSlice = function() {
    // 0 < P < Q < N
    for(var i = 0; i < this.A.length - 1; i++) {
        this.beginningSlice = this.A[i]; // A[P]
        this.endingSlice = this.A[i + 1]; // A[P + 1]

        if(this.isPair()) {
            if(this.isSequence()) {
                this.pairIndexPosition = this.currentIndexPosition;
            }

            this.seeAll.push(this.currentIndexPosition);
        } else {
            // if 'isPair()' fails, the count for the index position increases, next 'beginningSlice'
            this.currentIndexPosition = i + 1;
            this.currentPairSize = 1; // resets the count for the ascending pair size
        }
    }

    return this.pairIndexPosition;
}

App.prototype.isPair = function() {
    if(this.endingSlice > this.beginningSlice) {
        // size of the slice
        var pairSize = 1; // ahead of the index count by 1;

        pairSize += 1;
        this.currentPairSize = pairSize;
        this.maxPairSize = 1; // sets to value integer 1, starting the count for the size of thie slice

        return true;
    }

    return false;
}

App.prototype.isSequence = function() {
    if(this.currentPairSize > this.maxPairSize) {
        this.maxPairSize += 1; // increases the count for the 'maxPairSize', ascending pair size count

        return true;
    }

    return false;
}

const arr = [2, 2, 2, 2, 1, 2, -1, 2, 1, 3];
const a = [30, 20, 10];

function solution(A) {
    const app = new App(A);

    app.findAscSlice();
    console.log("List of Integers: ");
    console.log(arr);
    console.log("List of Ascending Slice - Indices: ");
    console.log(app.seeAll);
    console.log("Returns a value of ");

    return app.findAscSlice();
}

console.log(solution(arr));
