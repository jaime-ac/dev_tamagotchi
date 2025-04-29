
import './App.css';
import { useState, useEffect } from 'react';
import Images from './components/Images';

function App() {

  const [vida, setVida] = useState(4);
  const [reacoes, setReacoes] = useState(['❤️', '💔']);
  const [vivo, setVivo] = useState(true);
  const [images, setImages] = useState(<Images imagem={'/public/morning.png'}/>)
  
  useEffect(() => {

    //setInterval & clearInterval
    // são usados para executar uma função repetidamente com um intervalo de tempo fixo. 
    // Eles são úteis quando você quer algo que aconteça de forma contínua, como atualizar a hora a cada segundo, 
    // fazer animações simples ou checar alguma condição periodicamente.
    const intervalo = setInterval(() => {

      if (vida <= 0){
        setVivo(false)
        clearInterval(intervalo)
        setReacoes(reacoes[1])
        return 0
      }
      //possibilita fazer o decremento da vida do jogador em 1 a cada segundo;
      setVida((vidaAtual) => vidaAtual - 1);

    }, 1000);

    return () => clearInterval(intervalo); 
  }, [vida]);

  function alimentar(){

    if(vivo){ //se estiver vivo pode curar
      if (vida <= 90){
        setVida(vida + 10)
        setImages(<Images imagem={'/public/background-left.png'}/>)
      }else{
        setVida(100)
        setImages(<Images imagem={'/public/background-left.png'}/>)
      }
    }//caso contrário não permitir que ele cure
    
  }
  
  function brincar(){
    setImages(<Images imagem={'/public/background-right.png'}/>)
  }
  
  function dormir(){
    setImages(<Images imagem={'/public/background-left.png'}/>)
    
  }
  
  function banho(){
    setImages(<Images imagem={'/public/background-right.png'}/>)

  }

  return (
    <>

      <div className="app_container">

        <div className="app_esquerda">

        </div>

        <div className="app_centro">

          <div className="app_header">

            <h1>TAMAGOTCHI GAME🎮</h1>

          </div>

          <div className="app_main">

            <div className="app_main-header">

              <label htmlFor="" className="app_main-header_text">HP: {vida}{reacoes[0]}</label>
              <label htmlFor="" className="app_main-header_text">ESTADO: {vivo ? <p>Vivo</p> : <p>Morto</p>}</label> 

            </div>

            <div className="app_main-body">

              <div className="app_main-body_images">

                <div className="app_main-body_images-box">

                  {images}

                </div>

              </div>

              <div className="app_main-body_button">

                <button className="botoes" onClick={alimentar}>Alimentar</button>
                <button className="botoes" onClick={brincar}>Brincar</button>
                <button className="botoes" onClick={dormir}>Dormir</button>
                <button className="botoes" onClick={banho}>Banho</button>

              </div>

            </div>

          </div>

          <div className="app_footer">

            <h5>Desenvolvido por Jaime António Cá - SENAI/FLN</h5>

          </div>

        </div>

        <div className="app_direita">

        </div>

        
      </div>
      
    </>
  )
}

export default App
