/*
  Integer V lies strictly between integers U and W if U < V < W or if U > V > W.

  A non-empty zero-indexed array A consisting of N integers is given. A pair of indices (P, Q), where 0 < P < Q < N,
  is said to have adjacent values if no value in the array lies strictly between A[P] and A[Q].

  For example, in array A such that:

    A[0] = 0
    A[1] = 3
    A[2] = 3
    A[3] = 7
    A[4] = 5
    A[5] = 3
    A[6] = 11
    A[7] = 1

  the following pairs of indices have adjacent values:

  (0, 7), (1, 2), (1, 4),
  (1, 5), (1, 7), (2, 4),
  (2, 5), (2, 7), (3, 4),
  (3, 6), (4, 5), (5, 7) .

  For example, indices 4 and 5 have adjacent values because there is no value in array A that lies strictly between A[4] = 5 and A[5] =3;
  the only such value could be the number 4, and it is not present in the array.

  Given two indices P and Q, their distance is defined as abs(A[P] - A[Q]),
  where abs(X) = X for X >= 0, and abs(X) = -X for X < 0.
  For example, the distance between indices 4 and 5 is 2 because (A[4] - A[5]) = (5 - 3) = 2.

  Write a function:

    function solution(A);

  that, given a non-empty zero-indexed array A consisting of N integers, returns the minimum distance between indices of this array that have adjacent values.
  The function should return -1 if the minimum distance is greater than 100,000,000. The function should return -2  if no adjacent indices exist.

  Assume that:

    - N is an integer whithin the range [1..40,000];
    - each element of array A is an integer within the range [-2,147,483,648..2,147,483,647].

  For example, given array A such that:

    A[0] = 0
    A[1] = 3
    A[2] = 3
    A[3] = 7
    A[4] = 5
    A[5] = 3
    A[6] = 11
    A[7] = 1

  the function should return 0 because:

    - indices 1 and 2 are adjacent, because the array does not contain any value that lies strictly between A[1] = 3 and A[2] = 3;
    - the distance between these indices is (A[1] - A[2]) = (3 - 3) = 0;
    - no other pair of adjacent indices that has smaller distance exists.

  Complexity:

    - expected worst-case time Complexity is O(N*log(N));
    - expected worst-case space Complexity is O(N), beyond input storage (not counting the storage required for input arguments).

  Elements of input arrays can be modified.
*/

function App(A) {
  this.A = A;
  this.indexA = A[0];
  this.indexB = A[0];
  this.pointA = 0;
  this.pointB = 0;
  this.distance = 0;
  this.minDistance = 0;
  this.listAll = [];
}

App.prototype.findAdjacentVal = function () {
  // 0 < P < Q < N
  for(var i = 0; i < this.A.length - 1; i++) {
    for(var j = i + 1; j < this.A.length; j++) {
      this.indexA = this.A[i];
      this.indexB = this.A[j];
      this.pointA = i;
      this.pointB = j;

      if(this.isPair()) {
        if(this.hasAdjacent(this.A, this.indexA, this.indexB)) {
          console.log("Adjacent Values: " + this.indexA + ", " + this.indexB);
          console.log("Indices: " + this.pointA + ", " + this.pointB);

          this.calcDistance(this.indexA, this.indexB);

          console.log("Distance: " + this.distance);
          console.log("==============================");
        }
      }
    }
  }

  console.log("List of Integers: ");
  console.log(this.A);
  console.log("List of Distances: ");
  console.log(this.listAll);
  return this.minDistance;
}

App.prototype.isPair = function() {
  if(this.indexA <= this.indexB || this.indexA >= this.indexB) {
    return true;
  }

  return false;
}

App.prototype.hasAdjacent = function (array, a, b) {
  var upperLimit = 0,
      lowerLimit = 0;

  if(a === b) {
    return true;
  }

  if(a < b) {
    upperLimit = b;
    lowerLimit = a;
  } else {
    upperLimit = a;
    lowerLimit = b;
  }

  //console.log(lowerLimit + " " + upperLimit);

  var retVal = true;

  for(var element = lowerLimit + 1; element < upperLimit; element++) {
    var number = element;

    for(var i = 0; i < array.length; i++) {
      if(array[i] === number) {
        retVal = false;
      }
    }
  }

  return retVal;
}

App.prototype.calcDistance = function (beginningIndex, endingIndex) {
  //console.log(beginningIndex + " " + endingIndex);
  this.distance = Math.abs(beginningIndex - endingIndex);
  this.listAll.push(this.distance);
  this.minDistance = Math.min(...this.listAll);

  return this.distance;
}

const arr = [0, 3, 3, 7, 5, 3, 11, 1];

function solution(A) {
  const app = new App(A);

  console.log("List of Integers: ");
  console.log(arr);
  //console.log("Minimum Distance: " + app.minDistance);
  console.log("==============================");
  return app.findAdjacentVal();
}

console.log("Minimum Distance: " + solution(arr));
