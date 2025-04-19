// import { useState } from 'react'
import './App.css'

function App() {
  const products = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
  ];

  return (
    <>
      <h1 className='text-3xl m-5'>Carrello della spesa</h1>
      <ul className='list-disc m-10'>
        {products.map((p, i) => (
          <li key={i}>
            Nome: {p.name} - Prezzo: {p.price} €
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
