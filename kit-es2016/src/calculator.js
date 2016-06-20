import {inject} from 'aurelia-framework';
import {OperatorsFactory} from './operators';

@inject(OperatorsFactory)
export class Welcome {
  heading = 'Welcome to the Aurelia calculator';
  numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  currentNumber = 0;
  states = [];

  operatorIterator =  function(ops){
    var index = 0;
    var myops = ops;
    return function(){
      return myops[index++];
    }
  };

  constructor(operatorsFactory) {
    this.operatorsFactory = operatorsFactory;
    this.operators = operatorsFactory.makeOpeators();
  }
  
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

    var nextOperator = this.operatorIterator(this.operators);
    var currentOperation = nextOperator();
    
    do
    {
      var i = 1;
      while (this.states.length > i){
        if (this.states[i] == currentOperation.key)
        {
          var workingStack = [];
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
      currentOperation = nextOperator();
    } while(currentOperation !== undefined);

    this.currentNumber = this.states[0];
    this.states = [];
  }
}