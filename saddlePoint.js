/*
  A two-dimensional zero-indexed matrix consisting of N rows and M columns is given. A saddle point of that matrix is any pair of integers,
  (P, Q) such that:

    - 0 < P < N - 1;
    - 0 < Q < M - 1;
    - either element (P, Q) is local minimum in its row and a local maximum in its column, i.e. A[P][Q - 1] > A[P][Q] < A[P][Q + 1] and.
      A[P - 1][Q] < A[P][Q] > A[P + 1][Q];
    - or element (P, Q), is a local maximum in its row and a local minimum in its column, i.e. A[P][Q - 1] < A[P][Q] > A[P][Q + 1] and,
      A[P - 1][Q] > A[P][Q] < A[P + 1][Q].

  For example, matrix 'A' such that:

    [0, 1, 9 ,3],
    [7, 5, 8, 3],
    [9, 2, 9, 4],
    [4, 6, 7, 1]

  has two saddle points because:

    - element (1, 1) is a local minimum in its row and a local maximum in its column, so it is a saddle point;
    - element (1, 2) is a local maximum in its row and a local minimum in its column, so it is a saddle point.

  Write a function:

    function solution(A);

  that, given two-dimensional zero-indexed matrix of size N rows and M columns, returns its number of saddle points.

  For example, given matrux 'A' such that:

    [0, 1, 9 ,3],
    [7, 5, 8, 3],
    [9, 2, 9, 4],
    [4, 6, 7, 1]

  the function should return 2, as explained in the example above.

  Assume that:

    - N and M are intergers within a range [1..500];
    - each element of matrix 'A' is an integer within the range [-2,147,483,648..2,147,483,647].
*/

function App(A) {
  this.A = A;
  this.localMinRowNumber = A[0][0];
  this.localMaxRowNumber = A[0][0];
  this.localMinColNumber = A[0][0];
  this.localMaxColNumber = A[0][0];
  this.saddlePointCount = 0;
  this.holderA = 0;
  this.holderB = 0;
}

App.prototype.findSaddlePoint = function () {
  for(var x = 0; x < this.A.length - 1; x++) {
    this.localMinRowNumber = this.A[x][0];
    this.localMaxRowNumber = this.A[x][0];

    // reading items by row
    for(var y = x; y < this.A[x].length; y++) {
      var rowCount = x,
          colCount = y;

      //console.log(this.A[x][y]);
      if(this.isLocalMinRow(rowCount, colCount)) {
        this.localMinRowNumber = this.A[rowCount][colCount];
        console.log("Local Min Row: "+rowCount + " " + colCount);
        this.holderA = colCount;
      } else if(this.isLocalMaxRow(rowCount, colCount)) {
        console.log("Local Max Row: " + rowCount + " " + colCount);
        this.localMaxRowNumber = this.A[rowCount][colCount];
        this.holderB = colCount;
      }
    }

    console.log("==================================");

    this.localColMaxNumber = this.A[0][this.holderA];
    this.localColMinNumber = this.A[0][this.holderB];

    // reading items by column
    for(var z = 0; z < this.A.length - 1; z++) {
      var rowIndex = z,
          colIndexA = this.holderA,
          colIndexB = this.holderB;

      if(this.isLocalMaxCol(rowIndex, colIndexA)) {
        this.localMaxColNumber = this.A[rowIndex][colIndexA];
        console.log("Local Max Column: " + rowIndex + " " + colIndexA);
        this.saddlePointCount += 1;
      } else if(this.isLocalMinCol(rowIndex, colIndexB)) {
        this.localMinColNumber = this.A[rowIndex][colIndexB];
        console.log("Local Min Column: " + rowIndex + " " + colIndexB);
        this.saddlePointCount += 1;
      }
    }
  }

  return this.saddlePointCount;
}

App.prototype.isLocalMinRow = function (x, y) {
  if(this.localMinRowNumber > this.A[x][y]) {
    return true;
  }

  return false;
}

App.prototype.isLocalMaxRow = function (x, y) {
  if(this.localMaxRowNumber < this.A[x][y]) {
    return true;
  }

  return false;
}

App.prototype.isLocalMaxCol = function (x, y) {
  if(this.localMaxColNumber < this.A[x][y]) {
    return true;
  }

  return false;
}

App.prototype.isLocalMinCol = function (x, y) {
  if(this.localMinColNumber > this.A[x][y]) {
    return true;
  }

  return false;
}

const arr = [
                [0, 1, 9 ,3],
                [7, 5, 8, 3],
                [9, 2, 9, 4],
                [4, 6, 7, 1]
            ];

function solution(A) {
  const app = new App(A);

  return app.findSaddlePoint();
}

console.log("Saddle Point/(s): " + solution(arr));
