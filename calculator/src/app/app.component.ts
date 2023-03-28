import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'calculator';

  modeOptions: string[] = ['INFIX', 'RPN', 'Version 3']
  mode: any = 'INFIX'
  display = '';
  rows = [['7', '8', '9', '/'], ['4', '5', '6', '*'], ['1', '2', '3', '-'], ['0', 'Clear', '=', '+']];

  changeMode() {
     this.rows = [['7', '8', '9', '/'], ['4', '5', '6', '*'], ['1', '2', '3', '-'], ['0', 'Clear', '=', '+']];
    if (this.mode == 'RPN') {
      this.rows.push(['', '', 'Eval', '']);
    } else if (this.mode == 'Version 3') {
      this.rows.push(['(', ')', '', ''])
    }

    this.display = '';
  }

  input(symbol: string) {
    if (symbol != '') {
      if (this.display == 'Syntax Error' || !this.display) {
        this.display = '';
      }

      if (this.mode == 'RPN') { symbol = ' ' + symbol; }

      if (symbol == '=' || symbol == ' Eval') {
        try {
          if (this.mode == 'INFIX') {
            this.display = this.infixCalculation(this.display);
          } else if (this.mode == 'RPN') {
            this.display = this.rpnCalculation(this.display);
          } else if (this.mode == 'Version 3') {
            this.display = eval(this.display);
          }
        } catch (err) {
          this.display = 'Syntax Error'
        }
      } else if (symbol == ' =') {
        this.display += ' Enter';
      } else if (symbol == 'Clear' || symbol == ' Clear') {
        this.display = '';
      } else {
        this.display += symbol;
      }
    }
  }

  infixCalculation(expression: string) {
    let operand = 0;
    let operator = "+";
    let result = 0;

    for (let i = 0; i < expression.length; i++) {
      let currentChar = expression[i];
      // If the current character is a digit, add it to the current operand
      if (!isNaN(parseInt(currentChar))) {
        operand = operand * 10 + parseInt(currentChar);
      }
      // If the current character is an operator, perform the previous operation and update the operator and operand
      if (isNaN(parseInt(currentChar)) || i === expression.length - 1) {
        if (operator === "+") {
          result += operand;
        } else if (operator === "-") {
          result -= operand;
        } else if (operator === "*") {
          result *= operand;
        } else if (operator === "/") {
          result /= operand;
        }
        // Update the operator and reset the operand
        operator = currentChar;
        operand = 0;
      }
    }

    return result.toString();
  }

  rpnCalculation(input: string) {
    const stack: any[] = [];
    const tokens = input.split(" ");

    for (let i = 0; i < tokens.length; i++) {
      const stack: any[] = [];
      const tokens = input.split(" ");

      for (let i = 0; i < tokens.length; i++) {
        let token = tokens[i];
        if (token === "Enter") {
          // If the current token is Enter, skip it
          continue;
        } else if (token === "+") {
          let b = stack.pop();
          let a = stack.pop();
          stack.push(a + b);
        } else if (token === "-") {
          let b = stack.pop();
          let a = stack.pop();
          stack.push(a - b);
        } else if (token === "*") {
          let b = stack.pop();
          let a = stack.pop();
          stack.push(a * b);
        } else if (token === "/") {
          let b = stack.pop();
          let a = stack.pop();
          stack.push(a / b);
        } else {
          stack.push(parseFloat(token));
        }
      }

      return stack.pop();
    }
  }
}