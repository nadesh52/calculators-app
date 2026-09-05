"use client";
import { useEffect, useState } from "react";
import { Input } from "../interest/components/Input";

const inputInit = {
  id: 0,
  quantity: 0,
  price: 0,
  count: 0,
  average: 0,
};

export function InputForm({ formData }: any) {
  const [inputs, setInputs] = useState(inputInit);
  const [itemCount, setItemCount] = useState(() => {
    try {
      const stored: any = localStorage.getItem("items");
      const items = JSON.parse(stored) || [];
      if (items.length === 0) return 0;

      const latestItem = items.reduce(
        (max: any, item: any) => (item.number > max.number ? item : max),
        items[0],
      );

      return latestItem.number || 0;
    } catch (e) {
      console.error("Failed to load itemCount from localStorage:", e);
      return 0;
    }
  });

  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;

    const d = Date.now();
    const genId = d.toString().slice(-5);
    setInputs((values: any) => ({ ...values, [name]: value, id: genId }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const quantity = inputs.quantity * inputs.count;
    const price = inputs.price;
    const perUnit = quantity / price;
    const average = perUnit.toFixed(2);

    const newItem = {
      id: inputs.id,
      number: itemCount + 1,
      quantity: quantity,
      price: price,
      count: inputs.count,
      average: average,
    };

    formData(newItem);
    setInputs(inputInit);
    setItemCount(itemCount + 1);
  };

  useEffect(() => {
    function handleReset() {
      setItemCount(0);
    }
    window.addEventListener("itemsReset", handleReset);
    return () => window.removeEventListener("itemsReset", handleReset);
  }, []);

  return (
    <form
      className="flex flex-col gap-4 rounded-xl bg-white p-4"
      onSubmit={handleSubmit}
    >
      <Input
        label="Count"
        type="number"
        name="count"
        value={inputs.count || ""}
        onChange={handleChange}
        required
        placeholder="2"
      />

      <Input
        label="Quantity"
        type="number"
        name="quantity"
        value={inputs.quantity || ""}
        onChange={handleChange}
        required
        placeholder="1950"
      />

      <Input
        label="Price"
        type="number"
        name="price"
        value={inputs.price || ""}
        onChange={handleChange}
        required
        placeholder="37"
      />

      <button
        type="submit"
        className="bg-primary w-full cursor-pointer rounded p-2 text-white"
      >
        Add
      </button>
    </form>
  );
}
