import OrderCreate from "./OrderCreate";
import OrderList from "./OrderList";

export function OrderTab() {
  return (
    <section className="mx-auto w-full max-w-2xl space-y-6 p-4 sm:max-w-2xl">
      <OrderCreate />
      <OrderList />
    </section>
  );
}
