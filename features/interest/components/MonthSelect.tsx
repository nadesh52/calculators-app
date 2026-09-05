"use client";
import { useEffect, useRef, useState } from "react";

const months = [3, 6, 9, 12, 24, 36];

export function MonthSelect({ selectedValue, label }: any) {
  const [isHidden, setIsHidden] = useState(true);
  const [value, setValue] = useState(0);

  const listRef = useRef(null);
  const menuRef = useRef(null);

  const handleClick = (e: any) => {
    e.preventDefault();

    setValue(e.target.value);
    selectedValue(e);
  };

  useEffect(() => {
    const handleClick = (e: any) => {
      if (e.target !== listRef.current) {
        setIsHidden(true);
      }
    };
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <label className="relative">
      <p className="text-secondary-100 select-none">{label}</p>
      <button
        ref={listRef}
        onClick={(e) => {
          e.preventDefault();
          setIsHidden(!isHidden);
        }}
        className="peer border-secondary-200 relative flex h-10 w-full items-center justify-between rounded border bg-white px-3 focus:outline-hidden"
      >
        {value !== 0 ? (
          <>
            <p className="pointer-events-none">{value} month</p>
          </>
        ) : (
          <p className="text-accent-200 pointer-events-none">Total Month</p>
        )}

        {/* <ChevronDownIcon className="pointer-events-none size-6" /> */}
      </button>

      {!isHidden && (
        <div
          ref={menuRef}
          className="absolute top-full left-0 z-50 w-max min-w-full overflow-hidden rounded shadow-lg"
        >
          <ul className="bg-white shadow">
            {months.map((m: any, idx: number) => (
              <li
                key={idx}
                value={m}
                onClick={handleClick}
                className="text-accent-100 hover:bg-primary cursor-pointer bg-white px-4 py-2 select-none hover:text-white"
              >
                <p className="pointer-events-none">{`${m} month`}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </label>
  );
}
