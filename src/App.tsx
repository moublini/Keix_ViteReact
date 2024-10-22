import { useState } from 'react';
import Button from './Button';
import './App.css';

enum Operator {
    Sum,
    Diff,
    Mul,
    Div,
    Undefined,
};

interface OperatorObject {
  [ key: string ]: () => Operator|undefined,
}

function App() {
  const [ result, setResult ] = useState(-1);
  const [ op1, setOp1 ] = useState("");
  const [ op2, setOp2 ] = useState("");
  const [ operator, setOperator ] = useState(Operator.Undefined);

  function setOperand(value: number) {
    if (operator == Operator.Undefined)
      setOp1(op1 + value);
    else
      setOp2(op2 + value);
  }

  function getResultToDisplay() {
    if (result !== -1)
      return result;

    if (op1)
      return op2 || op1;

    return "";
  }

  const nums = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
  const operators: OperatorObject = {
    '+': () => Operator.Sum,
    '-': () => Operator.Diff,
    '*': () => Operator.Mul,
    '/': () => Operator.Div,
    '=': () => {
      if (!op1 || !op2)
        return undefined;

      if (operator === Operator.Undefined)
        return undefined;

      const numOp1 = parseFloat(op1);
      const numOp2 = parseFloat(op2);
      let newResult: number;

      switch (operator) {
        case Operator.Sum:
          newResult = numOp1 + numOp2;
          break;

        case Operator.Diff:
          newResult = numOp1 - numOp2;
          break;

        case Operator.Mul:
          newResult = numOp1 * numOp2;
          break;

        case Operator.Div:
          newResult = numOp1 / numOp2;
          break;
      }
      
      setOp1(newResult.toString());
      setOp2("");
      setResult(newResult);

      return undefined;
    },
    'C': () => {
      setOp1("");
      setOp2("");
      setOperator(Operator.Undefined);
      setResult(-1);

      return undefined;
    },
  }
  return (
    <div className="app">
      <div className="result">
        {getResultToDisplay()}
      </div>
      <div className="calculator">
        {/* Operand buttons */}
        <div className="operand-btns">
          {
            nums.map(el => (
              <Button key={ `button-operand-${el}` } display={el.toString()} onClick={() => setOperand(el)}></Button>
            ))
          }
        </div>

        {/* Operator buttons */}
        <div className="operator-btns">
          {
            Object.entries(operators).map(([key, callback]) => (
              <Button key={`operator-${key}`} display={key} onClick={() => {
                const result = callback();
                setOperator(result || Operator.Undefined);
              }}></Button>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default App
