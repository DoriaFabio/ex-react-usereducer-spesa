import { useState } from 'react'
import { FaCartPlus } from "react-icons/fa";
import { FaTrash } from 'react-icons/fa';

function App() {
  const products = [ // Array di oggetti che rappresentano i prodotti disponibili
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
  ];

  const [addedProducts, setAddedProducts] = useState([]); // Stato per tenere traccia dei prodotti aggiunti al carrello

  function updateProductQuantity(name, quantity) { // Funzione per aggiornare la quantità di un prodotto nel carrello
    setAddedProducts(curr => curr.map(p => {
      if (p.name === name) {
        return { ...p, quantity }
      } else {
        return p;
      }
    }))
  }

  const addToCart = (product) => { // Funzione per aggiungere un prodotto al carrello
    const isProductInCart = addedProducts.find(p => p.name === product.name); // Controlla se il prodotto è già nel carrello 
    if (isProductInCart) {
      updateProductQuantity(isProductInCart.name, isProductInCart.quantity + 1)
      return; // Se il prodotto è già nel carrello, aumenta la sua quantità
    } else {
      setAddedProducts(curr => [...curr, {
        ...product,
        quantity: 1
      }]); // Aggiungi il prodotto al carrello con quantità 1
    }
  }

  const removeFromCart = (product) => {
    const isProductInCart = addedProducts.find(p => p.name === product.name); // Controlla se il prodotto è già nel carrello 
    if (isProductInCart) {
      const newQuantity = isProductInCart.quantity - 1;
      if (isProductInCart.quantity > 1) {
        updateProductQuantity(isProductInCart.name, newQuantity);
      } else {
        setAddedProducts(curr => curr.filter(p => p.name !== product.name));
      }
    }
  }

  const totalToPay = addedProducts.reduce((acc, p) => acc + (p.price * p.quantity), 0);

  return (
    <>
      <h1 className='font-bold text-2xl m-3'>Carrello della spesa</h1>
      <ul className='list-disc mx-3'>
        {products.map((p, i) => (
          <li key={i} className='mx-6'>
            <p>Nome: {p.name} - Prezzo: {p.price} €</p>
            <button onClick={() => addToCart(p)} className='py-2 px-2 bg-cyan-800 hover:bg-cyan-900 text-white my-2 rounded-2xl mx-2'><FaCartPlus /></button>
            <button onClick={() => removeFromCart(p)} className='py-2 px-2 bg-cyan-800 hover:bg-cyan-900 text-white my-2 rounded-2xl'><FaTrash /></button>
          </li> // Mostra il nome e il prezzo del prodotto, e un pulsante per aggiungerlo al carrello
        ))}
      </ul>
      {addedProducts.length > 0 && ( // Se ci sono prodotti nel carrello, mostra la lista dei prodotti aggiunti
        <>
          <h2 className='font-bold text-2xl m-3'>Prodotti nel carrello</h2>
          <ul>
            {addedProducts.map((p, i) => ( // Mappa attraverso i prodotti aggiunti al carrello e mostra il nome, la quantità e il prezzo
              <li key={i} className='mx-6'>
                <p>{p.quantity} x {p.name} ({p.price}€)</p>
              </li>
            ))}
          </ul>
          <p className='m-3'>Somma totale: {totalToPay.toFixed(2)}€</p>
        </>
      )}
    </>
  )
}

export default App