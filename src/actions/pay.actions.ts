export const payRequest = async (email: string, cart: any[]) => {
  const res = await fetch("http://localhost:8081/api-v1/pay", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userEmail: email,
      items: cart.map(item => ({
        coffeeId: item.id,
        coffeeName: item.nombre,
        quantity: item.quantity,
        priceCLP: item.precioCLP
      }))
    })
  });

  if (!res.ok) throw new Error("Error en la transacción");
  return res.json();
};

