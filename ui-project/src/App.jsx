import React from 'react'
import Section1 from './components/Section1/Section1'
import Section2 from './components/Section2/Section2'

const App = () => {

    const card_details = [
    {
      cardLogo: "https://plus.unsplash.com/premium_photo-1661630621969-6d9faac03f9f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      cardNumber: 1,
      cardDescription: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi doloribus nostrum at quaerat adipisci in.",
      buttonName: "Satisfied",
      btn_color: "royalblue",
    },
    {
      cardLogo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      cardNumber: 2,
      cardDescription: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi doloribus nostrum at quaerat adipisci in.",
      buttonName: "Underserved",
      btn_color: "green",
    },
    {
      cardLogo: "https://plus.unsplash.com/premium_photo-1661641353075-f0eaf2d82aae?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      cardNumber: 3,
      cardDescription: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi doloribus nostrum at quaerat adipisci in.",
      buttonName: "Underbanked",
      btn_color: "orange",
    },
    {
      cardLogo: "https://plus.unsplash.com/premium_photo-1661630621969-6d9faac03f9f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      cardNumber: 4,
      cardDescription: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi doloribus nostrum at quaerat adipisci in.",
      buttonName: "Satisfied",
      btn_color: "pink",
    },
    {
      cardLogo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      cardNumber: 5,
      cardDescription: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi doloribus nostrum at quaerat adipisci in.",
      buttonName: "Underserved",
      btn_color: "purple",
    },
    {
      cardLogo: "https://plus.unsplash.com/premium_photo-1661641353075-f0eaf2d82aae?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      cardNumber: 6,
      cardDescription: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi doloribus nostrum at quaerat adipisci in.",
      buttonName: "Underbanked",
      btn_color: "black",
    }
  ]
  return (
    <div>
      <Section1 card_details={card_details} />
      <Section2 />
    </div>
  )
}

export default App
