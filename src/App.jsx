import { useState } from 'react'

function App() {
  const products = [ // Array di oggetti che rappresentano i prodotti disponibili
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
  ];

  const [addedProducts, setAddedProducts] = useState([]); // Stato per tenere traccia dei prodotti aggiunti al carrello
  
  const addToCart = (product) => { // Funzione per aggiungere un prodotto al carrello
    const isProductInCart = addedProducts.some(p => p.name === product.name); // Controlla se il prodotto è già nel carrello 
    if (isProductInCart) {
      return; // Se il prodotto è già nel carrello, non fare nulla
    } else {
      setAddedProducts(curr => [...curr, {
        ...product, 
        quantity: 1 
      }]); // Aggiungi il prodotto al carrello con quantità 1
    }
  }

  return (
    <>
      <h1 className='font-bold text-2xl m-2'>Carrello della spesa</h1>
      <ul className='list-disc mx-3'>
        {products.map((p, i) => (
          <li key={i} className='mx-6'>
            <p>Nome: {p.name} - Prezzo: {p.price} €</p>
            <button onClick={() => addToCart(p)} className='font-bold py-1 px-3 bg-blue-400 hover:bg-blue-500 my-2 rounded-2xl'>Aggiungi al carrello</button>
          </li> // Mostra il nome e il prezzo del prodotto, e un pulsante per aggiungerlo al carrello
        ))}
      </ul>
      {addedProducts.length > 0 && ( // Se ci sono prodotti nel carrello, mostra la lista dei prodotti aggiunti
        <>
          <h2 className='font-bold text-2xl m-2'>Prodotti nel carrello</h2> 
          <ul>
            {addedProducts.map((p, i) => ( // Mappa attraverso i prodotti aggiunti al carrello e mostra il nome, la quantità e il prezzo
              <li key={i} className='mx-6'>
                <p>{p.quantity} x {p.name} ({p.price}€)</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  )
}

export default App