// Name: Calvin Yap
// Using 2 array and stacks I was able to make a main stack of actions being done, then another for any removed actions
// 
class EventSourcer {
  constructor() {
    // Main stack of actions
    this.stack = [];
    // Stack for reuse
    this.undoStack =[];
    this.value = 0;
  }

  add(num){
    // regular positive number you would push to stack
    if(num>0){
      this.stack.push(num);
    }
    // Not nessesary for this project but can be added in later 
    //else{ 
      //check for a negative addition
      //var negnum = -1 *num;
      //this.stack.push(negnum);
   // }
    return this.value+=num;
    }
  subtract(num) {
    if(num>0){
      var negnum = -1* num;
      this.stack.push(negnum);
    }
    //else{ // check for negative subtraction so addition and properly insert into stack
     //this.stack.push(num);
    //}
    return this.value -=num;
  }

  undo() {
    //Check if stack is empty
    if(this.stack.length != 0 ){
      var undoElement = this.stack[this.stack.length-1];
      //undo Additon
      if(undoElement >0){
        // Push removed element into another stack for redo
        this.undoStack.push(undoElement);
        // Remove element from current stack
        this.stack.pop(this.stack.length-1);
        this.value -= undoElement;
      }
      // Undo Subtraction
      else if(undoElement<0){
        this.undoStack.push(undoElement);
        this.stack.pop(this.stack.length-1);
        this.value +=(-1*undoElement);
      }
    }
    return this.value 
  }
  redo() {
    //Check if stack is empty
    if(this.undoStack.length != 0){
      var redoElement = this.undoStack[this.undoStack.length-1];
      // Redo additon
      if(redoElement >0){
        this.undoStack.pop(this.undoStack.length-1);
        // Push back the element into main stack since we hit redo
        this.stack.push(redoElement);
        this.value += redoElement;
      }
      // Redo subtraction
      else if( redoElement <0){
        this.undoStack.pop(this.undoStack.length-1);
        // Push back the element into main stack since we hit redo
        this.stack.push(redoElement);
        this.value -= redoElement;
      }
    }
  }
  bulk_undo(num) {
    // For loop for the num of undo
    for(var i =num; i>= 1 ; i--){
      // check if stack is empty
      if(this.stack.length!=0){
        this.undo();
      }
    }
  
  }
  bulk_redo(num) {
    // For loop for the num of redo
    for(var i =num; i>= 1 ; i--){
      // check if stack is empty
      if(this.undoStack.length!=0){
        this.redo();
      }
    }
  }
}



// ----- Do not modify anything below this line (needed for test suite) ------
module.exports = EventSourcer;
