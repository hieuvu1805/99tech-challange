import { useEffect, useMemo, useRef, useState } from "react";
import ArrowUp from '@assets/arrow-up.svg'
import ArrowDown from '@assets/arrow-down.svg'
import CURRENCIES from './currency.json'

interface ICurrency {
  currency: string;
  date: string;
  price: number;
}

const cIcon = (symbol: string) => {
  return `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${symbol}.svg`
}

const convertAmount = (a: number, b: number) => {
  let result = (a * b).toFixed(6); // Ensure 6 decimal places
  // Remove unnecessary trailing zeros but keep at least two decimal places
  result = result.replace(/(\.\d*?[1-9])0+$|\.0+$/, '$1');
  // Ensure at least 2 decimal places
  return result.includes('.') ? result.padEnd(result.indexOf('.') + 3, '0') : result + '.00';
};

export default function SwapCard() {
  const [showFromDropdown, setShowFromDropdown] = useState<boolean>(false);
  const [fromCurrency, setFromCurrency] = useState<ICurrency>(CURRENCIES[4]);
  const [amount, setAmount] = useState<string>("");

  const [showToDropdown, setShowToDropdown] = useState<boolean>(false);
  const [toCurrency, setToCurrency] = useState<ICurrency>(CURRENCIES[3]);

  const convertRate = useMemo(() => fromCurrency.price / toCurrency.price, [fromCurrency, toCurrency]);
  const toAmount = amount ? convertAmount(parseFloat(amount), convertRate) : '';

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) { // only allow number and dot
      setAmount(value);
    }
  };

  const fromDropdownRef = useRef<HTMLDivElement>(null);
  const fromDropdownBtnRef = useRef<HTMLButtonElement>(null);
  const toDropdownRef = useRef<HTMLDivElement>(null);
  const toDropdownBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!fromDropdownRef.current?.contains(event.target as Node)
        && !fromDropdownBtnRef.current?.contains(event.target as Node)
      ) {
        setShowFromDropdown(false);
      }
      if (!toDropdownRef.current?.contains(event.target as Node)
        && !toDropdownBtnRef.current?.contains(event.target as Node)
      ) {
        setShowToDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-120 max-w-full bg-gray-900 text-white p-5 rounded-2xl shadow relative m-auto md:m-0">
      <div className="text-lg font-medium mb-4">Swap</div>
      <div className="bg-gray-800 p-4 rounded-lg relative">
        <div className="flex justify-between items-center relative">
          <button
            className="flex items-center gap-2 bg-gray-700 px-3 py-1 rounded-lg relative cursor-pointer"
            onClick={() => setShowFromDropdown(!showFromDropdown)}
            ref={fromDropdownBtnRef}
          >
            <img src={cIcon(fromCurrency.currency)} alt={fromCurrency.currency} className="w-6 h-6" />
            <span>{fromCurrency.currency}</span>
            <img src={showFromDropdown ? ArrowUp : ArrowDown} alt="" className="w-4 h-4" />
          </button>
          {showFromDropdown && (
            <div className="absolute max-h-100 overflow-y-scroll top-10 left-0 bg-gray-700 shadow-lg w-32 z-50" ref={fromDropdownRef}>
              {CURRENCIES.map((item: ICurrency) => (
                <div
                  key={item.currency}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-600 cursor-pointer"
                  onClick={() => {
                    setFromCurrency(item);
                    setShowFromDropdown(false);
                  }}
                >
                  <img src={cIcon(item.currency)} alt={item.currency} className="w-6 h-6" />
                  <span>{item.currency}</span>
                </div>
              ))}
            </div>
          )}
          <input
            type="text"
            value={amount}
            onChange={handleAmountChange}
            className="flex-1 bg-transparent text-right text-2xl outline-none w-full px-2"
            placeholder="0.00"
          />
        </div>
        <div className="text-xs text-gray-400 mt-2">Balance: 102.6868 {fromCurrency.currency} (Max)</div>
      </div>
      <div className="mt-1 bg-gray-800 p-4 rounded-lg relative">
        <div className="flex justify-between items-center relative">
          <button
            className="flex cursor-pointer items-center gap-2 bg-gray-700 px-3 py-1 rounded-lg relative"
            onClick={() => setShowToDropdown(!showToDropdown)}
            ref={toDropdownBtnRef}
          >
            <img src={cIcon(toCurrency.currency)} alt={toCurrency.currency} className="w-6 h-6" />
            <span>{toCurrency.currency}</span>
            <img src={showToDropdown ? ArrowUp : ArrowDown} alt="" className="w-4 h-4" />
          </button>
          {showToDropdown && (
            <div className="absolute max-h-100 overflow-y-scroll top-10 left-0 bg-gray-700 shadow-lg w-32 z-50" ref={toDropdownRef}>
              {CURRENCIES.map((item: ICurrency) => (
                <div
                  key={item.currency}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-600 cursor-pointer"
                  onClick={() => {
                    setToCurrency(item);
                    setShowToDropdown(false);
                  }}
                >
                  <img src={cIcon(item.currency)} alt={item.currency} className="w-6 h-6" />
                  <span>{item.currency}</span>
                </div>
              ))}
            </div>
          )}
          <input
            type="text"
            value={toAmount}
            className="flex-1 bg-transparent text-right text-2xl outline-none w-full px-2"
            placeholder="0.00"
            disabled
          />
        </div>
        <div className="text-xs text-gray-400 mt-2">Balance: 123.8989 {toCurrency.currency}</div>
      </div>
      <div className="text-center text-xs text-gray-400 my-2">
        1 {fromCurrency.currency} = {convertRate.toFixed(6) || "-"} {toCurrency.currency}
      </div>
      <button className="w-full cursor-pointer bg-yellow-500 text-gray-900 py-3 rounded-lg font-medium text-lg mt-2"
        onClick={() => alert('Comming Soon')}
      >CONFIRM SWAP</button>
    </div>
  );
}
