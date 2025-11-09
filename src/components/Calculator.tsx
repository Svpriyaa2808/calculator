'use client';

import { useState } from 'react';

type OperatorType = '+' | '-' | '×' | '÷' | '';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operator, setOperator] = useState<OperatorType>('');
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [memory, setMemory] = useState(0);

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDot = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperator('');
    setWaitingForOperand(false);
  };

  const clearEntry = () => {
    setDisplay('0');
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperator: OperatorType) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(String(inputValue));
    } else if (operator) {
      const currentValue = previousValue || '0';
      const newValue = calculate(parseFloat(currentValue), inputValue, operator);
      setDisplay(String(newValue));
      setPreviousValue(String(newValue));
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (firstValue: number, secondValue: number, operator: OperatorType): number => {
    switch (operator) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      default:
        return secondValue;
    }
  };

  const equals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operator) {
      const currentValue = parseFloat(previousValue);
      const newValue = calculate(currentValue, inputValue, operator);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperator('');
      setWaitingForOperand(true);
    }
  };

  const toggleSign = () => {
    const value = parseFloat(display);
    setDisplay(String(value * -1));
  };

  const percentage = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  const scientificOperation = (operation: string) => {
    const value = parseFloat(display);
    let result: number;

    switch (operation) {
      case 'sin':
        result = Math.sin(value * (Math.PI / 180));
        break;
      case 'cos':
        result = Math.cos(value * (Math.PI / 180));
        break;
      case 'tan':
        result = Math.tan(value * (Math.PI / 180));
        break;
      case 'ln':
        result = Math.log(value);
        break;
      case 'log':
        result = Math.log10(value);
        break;
      case 'sqrt':
        result = Math.sqrt(value);
        break;
      case 'square':
        result = value * value;
        break;
      case 'cube':
        result = Math.pow(value, 3);
        break;
      case 'power':
        setPreviousValue(display);
        setOperator('');
        setWaitingForOperand(true);
        return;
      case 'exp':
        result = Math.exp(value);
        break;
      case '1/x':
        result = 1 / value;
        break;
      case 'factorial':
        result = factorial(value);
        break;
      case 'abs':
        result = Math.abs(value);
        break;
      default:
        return;
    }

    setDisplay(String(result));
    setWaitingForOperand(true);
  };

  const factorial = (n: number): number => {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
  };

  const addPi = () => {
    setDisplay(String(Math.PI));
    setWaitingForOperand(true);
  };

  const addE = () => {
    setDisplay(String(Math.E));
    setWaitingForOperand(true);
  };

  const memoryAdd = () => {
    setMemory(memory + parseFloat(display));
  };

  const memorySubtract = () => {
    setMemory(memory - parseFloat(display));
  };

  const memoryRecall = () => {
    setDisplay(String(memory));
    setWaitingForOperand(true);
  };

  const memoryClear = () => {
    setMemory(0);
  };

  const Button = ({
    label,
    onClick,
    className = '',
    variant = 'default'
  }: {
    label: string;
    onClick: () => void;
    className?: string;
    variant?: 'default' | 'operator' | 'equals' | 'clear' | 'scientific';
  }) => {
    const baseClasses = "h-14 rounded-xl font-semibold text-lg transition-all duration-200 ease-in-out transform active:scale-95 shadow-md hover:shadow-lg";

    const variantClasses = {
      default: "bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 text-gray-800 dark:text-gray-100 hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-600 dark:hover:to-gray-700",
      operator: "bg-gradient-to-br from-orange-400 to-orange-500 text-white hover:from-orange-500 hover:to-orange-600 hover:scale-105",
      equals: "bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 hover:scale-105",
      clear: "bg-gradient-to-br from-red-400 to-red-500 text-white hover:from-red-500 hover:to-red-600",
      scientific: "bg-gradient-to-br from-purple-400 to-purple-500 text-white hover:from-purple-500 hover:to-purple-600 text-sm"
    };

    return (
      <button
        onClick={onClick}
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-black dark:via-gray-900 dark:to-black rounded-3xl shadow-2xl p-6 backdrop-blur-sm border border-gray-700">
        {/* Display */}
        <div className="mb-6 bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-950 dark:to-black rounded-2xl p-6 shadow-inner">
          <div className="text-right">
            <div className="text-gray-400 text-sm mb-1 h-6">
              {previousValue && operator && `${previousValue} ${operator}`}
            </div>
            <div className="text-white text-5xl font-bold overflow-hidden overflow-ellipsis">
              {display}
            </div>
            {memory !== 0 && (
              <div className="text-purple-400 text-xs mt-2">M: {memory}</div>
            )}
          </div>
        </div>

        {/* Scientific Functions Row 1 */}
        <div className="grid grid-cols-6 gap-2 mb-2">
          <Button label="sin" onClick={() => scientificOperation('sin')} variant="scientific" />
          <Button label="cos" onClick={() => scientificOperation('cos')} variant="scientific" />
          <Button label="tan" onClick={() => scientificOperation('tan')} variant="scientific" />
          <Button label="ln" onClick={() => scientificOperation('ln')} variant="scientific" />
          <Button label="log" onClick={() => scientificOperation('log')} variant="scientific" />
          <Button label="√" onClick={() => scientificOperation('sqrt')} variant="scientific" />
        </div>

        {/* Scientific Functions Row 2 */}
        <div className="grid grid-cols-6 gap-2 mb-2">
          <Button label="x²" onClick={() => scientificOperation('square')} variant="scientific" />
          <Button label="x³" onClick={() => scientificOperation('cube')} variant="scientific" />
          <Button label="xʸ" onClick={() => scientificOperation('power')} variant="scientific" />
          <Button label="eˣ" onClick={() => scientificOperation('exp')} variant="scientific" />
          <Button label="1/x" onClick={() => scientificOperation('1/x')} variant="scientific" />
          <Button label="x!" onClick={() => scientificOperation('factorial')} variant="scientific" />
        </div>

        {/* Memory and Constants Row */}
        <div className="grid grid-cols-6 gap-2 mb-2">
          <Button label="MC" onClick={memoryClear} variant="scientific" />
          <Button label="MR" onClick={memoryRecall} variant="scientific" />
          <Button label="M+" onClick={memoryAdd} variant="scientific" />
          <Button label="M-" onClick={memorySubtract} variant="scientific" />
          <Button label="π" onClick={addPi} variant="scientific" />
          <Button label="e" onClick={addE} variant="scientific" />
        </div>

        {/* Basic Calculator */}
        <div className="grid grid-cols-4 gap-3">
          <Button label="C" onClick={clear} variant="clear" />
          <Button label="CE" onClick={clearEntry} variant="clear" />
          <Button label="±" onClick={toggleSign} variant="default" />
          <Button label="÷" onClick={() => performOperation('÷')} variant="operator" />

          <Button label="7" onClick={() => inputDigit('7')} variant="default" />
          <Button label="8" onClick={() => inputDigit('8')} variant="default" />
          <Button label="9" onClick={() => inputDigit('9')} variant="default" />
          <Button label="×" onClick={() => performOperation('×')} variant="operator" />

          <Button label="4" onClick={() => inputDigit('4')} variant="default" />
          <Button label="5" onClick={() => inputDigit('5')} variant="default" />
          <Button label="6" onClick={() => inputDigit('6')} variant="default" />
          <Button label="-" onClick={() => performOperation('-')} variant="operator" />

          <Button label="1" onClick={() => inputDigit('1')} variant="default" />
          <Button label="2" onClick={() => inputDigit('2')} variant="default" />
          <Button label="3" onClick={() => inputDigit('3')} variant="default" />
          <Button label="+" onClick={() => performOperation('+')} variant="operator" />

          <Button label="0" onClick={() => inputDigit('0')} variant="default" className="col-span-2" />
          <Button label="." onClick={inputDot} variant="default" />
          <Button label="=" onClick={equals} variant="equals" />
        </div>
      </div>
    </div>
  );
}
