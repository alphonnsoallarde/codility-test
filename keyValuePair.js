/*

  if the number is divisible by 3, the key value pair will be 'fuzz'
  if the number is divisible by 5, the key value pair will be 'buzz'
  if the number is divisible by 15, the key value pair will be 'fuzzbuzz'
  else. the key value pair will be the number itself

  Output:

    0:0
    1:1
    2:2
    3:'fuzz'
    4:4
    5:'buzz'
    ...
    15:'fuzzbuzz'
    ...
    100:'buzz'

*/

function App(N) {
  this.N = N;
  this.fuzz = 'fuzz';
  this.buzz = 'buzz';
  this.value;
  this.array = [];
}

App.prototype.main = function () {
  this.generateArray();

  for(var i = 0; i < this.array.length; i++) {
    var element = this.array[i];

    if(element % 3 === 0 && element !== 0) {
      if(element % 15 === 0) {
        this.value = "'" + this.fuzz + this.buzz + "'";
        console.log(element + ":" + this.value);

        continue;
      }

      this.value = "'" + this.fuzz + "'";
      console.log(element + ":" + this.value);

    } else if(element % 5 === 0 & element !== 0) {
      if(element % 15 === 0) {
        this.value = "'" + this.fuzz + this.buzz + "'";
        console.log(element + ":" + this.value);
        
        continue;
      }

      this.value = "'" + this.buzz + "'";
      console.log(element + ":" + this.value);

    } else {
      console.log(element + ":" + element);
    }
  }

  return 0;
}

App.prototype.generateArray = function () {
  for(var i = 0; i <= 100; i++) {
    this.array.push(i);
  }
}

var number = 100;

function solution(N) {
  var app = new App(N);

  return app.main();
}

solution(number);
