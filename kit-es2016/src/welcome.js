    
export class Welcome {
  heading = 'Welcome to the Aurelia calculator';
  numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  currentNumber = 0;
  states = [];
  operators = [
      {key: '*', operation: function(a, b) { return a * b}},
      {key: '/', operation: function(a, b) { return a / b}},
      {key: '-', operation: function(a, b) { return a - b}},
      {key: '+', operation: function(a, b) { return a + b}}];
  operatorIterator =  function(ops){
    var index = 0;
    var myops = ops;
    return function(){
      return myops[index++];
    }
  };
  
  addNumber(i){
    if (Number(this.currentNumber) && this.currentNumber > 0)
      this.currentNumber = this.currentNumber * 10;
    this.currentNumber += i;
  }

  pushState(state){
    this.states.push(this.currentNumber);
    this.states.push(state);
    this.currentNumber = 0;
  }

  calculate(){
    if (this.states.length <2)
      return;

    this.pushState('=');
    this.currentNumber = '';
    var workingStack = [];
    var operatorIterator = this.operatorIterator(this.operators);
    var currentOperation = operatorIterator();
    
    do
    {
      var i = 1;
      while (this.states.length > i){
        if (this.states[i] == currentOperation.key)
        {
          workingStack = [];
          for (var j = 0 ; j < i - 1; j ++)
            workingStack.push(this.states[j]);

          workingStack.push(
            currentOperation.operation(this.states[i - 1], this.states[i + 1])
          );

          for (var j = i + 2 ; j < this.states.length; j ++)
            workingStack.push(this.states[j]);
          this.states = workingStack;
          i = i - 2;
        }
        i = i + 2;
      }
      currentOperation = operatorIterator();
    } while(currentOperation !== undefined);

    this.currentNumber = workingStack[0];
    this.states = [];
  }
}