import { useState } from 'react';
import { Operator, OperatorFunction, operatorMap } from './operators';
import Button from './Button';
import './App.css';

function App() {
  const [ op1, setOp1 ] = useState("");
  const [ op2, setOp2 ] = useState("");
  const [ operator, setOperator ] = useState(Operator.Undefined);

  const customCallbacks = new Map<Operator, OperatorFunction>([
    [ Operator.Equals, (op1, op2) => {
      const operatorObject = operatorMap.get(operator);
      if (!operatorObject?.callback)
        return Number.NaN;

      return operatorObject.callback(op1, op2);
    } ],
    [ Operator.Clear, (_op1, _op2) => {
      setOp1("");
      setOp2("");
      setOperator(Operator.Undefined);

      return 0;
    }]
  ]);

  const setOperand = (value: number) => { operator == Operator.Undefined ? setOp1(op1 + value) : setOp2(op2 + value) };
  const getResultToDisplay = () => op1 ? op2 || op1 : ""

  const nums = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
  return (
    <div className="app">
      <div className="result">
        { getResultToDisplay() }
      </div>
      <div className="calculator">
        <div className="operand-btns">
          {
            nums.map(el => (
              <Button key={ `button-operand-${el}` } display={el.toString()} onClick={() => setOperand(el)}></Button>
            ))
          }
        </div>
        <div className="operator-btns">
          {
            Array.from(operatorMap).map(([ operator, { symbol, callback } ]) => (
              <Button
                key={`operator-${symbol}`}
                display={symbol}
                onClick={() => {
                  const operand1 = op1 ? parseFloat(op1) : 0;
                  const operand2 = op2 ? parseFloat(op2) : 0;
                  
                  let newResult: number;
                  if (callback) {
                    setOperator(operator);
                    newResult = callback(operand1, operand2);
                  } else {
                    const customCallback = customCallbacks.get(operator)
                    if (!customCallback) return;

                    newResult = customCallback(operand1, operand2);
                  }

                  setOp1(newResult.toString());
                  setOp2("");
                }}>
              </Button>   
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default App
