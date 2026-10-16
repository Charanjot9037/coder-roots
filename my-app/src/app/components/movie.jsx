
import { useState } from "react";

export default function BookingForm() {
  const [passType, setPassType] = useState("daily");
  const [quantity, setQuantity] = useState(1);

  const rate = passType === "daily" ? 800 : 150;
  const subtotal = rate * Number(quantity);
  const discount = subtotal > 3000 ? subtotal * 0.1 : 0;
  const total = subtotal - discount;

  const handleBooking=async(e)=> {
    e.preventDefault();

const response=  await fetch("/api/auth/login",{  
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
         
                passType:passType,
                quantity:quantity
            
          }),
    })
    alert(`Booking total: ₹${total}`);
  }

  return (
    <form onSubmit={handleBooking} className=" justify-center bg-red-400 p-5 ">
      <h2>Book a Workspace</h2>

      <label>Pass Type</label>
      <select
       className="border"
        value={passType}
        onChange={(e) => {
          setPassType(e.target.value);
          setQuantity(1);
        }}
      >
        <option value="daily">Dedicated Desk (₹800/day)</option>
        <option value="hourly">Hot Desk (₹150/hour)</option>
      </select>

      <label>
        Number of {passType === "daily" ? "days" : "hours"}
      </label>
      <input
        type="number"
        min="1"
        step="1"
        value={quantity}
        onChange={(e) =>
          setQuantity(Math.max(1, Number(e.target.value) || 1))
        }
        required
        className="border"
      />

      <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
      <p>Discount: ₹{discount.toFixed(2)}</p>
      <h3>Total: ₹{total.toFixed(2)}</h3>

      <button type="submit" className="bg-black text-white p-2 rounded-2xl">Book Workspace</button>
    </form>
  );
}
