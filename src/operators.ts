export enum Operator {
    Undefined,
    Sum,
    Diff,
    Mul,
    Div,
    Equals,
    Clear,
};

export type OperatorFunction = (op1: number, op2: number) => number;

export interface OperatorObject {
    symbol: string,
    callback: OperatorFunction | undefined, // undefined means caller has to implement it
}

export type OperatorMap = {
    [ operator in Operator ]: OperatorObject
}

export const operatorMap = new Map<Operator, OperatorObject>([
    [ Operator.Sum, {
        symbol: '+',
        callback: (op1, op2) => op1 + op2,
    } ],
    [ Operator.Diff, {
        symbol: '-',
        callback: (op1, op2) => op1 - op2,
    } ],
    [ Operator.Mul, {
        symbol: '*',
        callback: (op1, op2) => op1 * op2,
    } ],
    [ Operator.Div, {
        symbol: '/',
        callback: (op1, op2) => op1 / op2,
    } ],
    [ Operator.Equals, {
        symbol: '=',
        callback: undefined,
    } ],
    [ Operator.Clear, {
        symbol: 'C',
        callback: undefined,
    } ],
]);