export class OperatorsFactory {
    makeOpeators(){
        return [
      {key: '*', operation: function(a, b) { return a * b}},
      {key: '/', operation: function(a, b) { return a / b}},
      {key: '-', operation: function(a, b) { return a - b}},
      {key: '+', operation: function(a, b) { return a + b}}];
    }
}