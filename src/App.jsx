
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [vida, setVida] = useState(4);
  const [reacoes, setReacoes] = useState(['❤️', '💔']);
  const [vivo, setVivo] = useState(true);
  const [estado, setEstado] = useState('')

  useEffect(() => {

    //setInterval & clearInterval
    // são usados para executar uma função repetidamente com um intervalo de tempo fixo. 
    // Eles são úteis quando você quer algo que aconteça de forma contínua, como atualizar a hora a cada segundo, 
    // fazer animações simples ou checar alguma condição periodicamente.
    const intervalo = setInterval(() => {

      if (vida <= 0){
        setVivo(false)
        clearInterval(intervalo)
        return 0
      }
      //possibilita fazer o decremento da vida do jogador em 1 a cada segundo;
      setVida((vidaAtual) => vidaAtual - 1);

    }, 1000);

    return () => clearInterval(intervalo); 
  }, [vida]);

  function curar(){

    if(vivo){ //se estiver vivo pode curar
      if (vida <= 90){
        setVida(vida + 10)
      }else{
        setVida(100)
      }
    }//caso contrário não permitir que ele cure

  }

  return (
    <>

      <div className="app_container">

        HP: {vida}{reacoes[0]}

        <button className="botao_curar" onClick={curar}>Curar</button>

        {vivo ? <p>Vivo</p> : <p>Morto</p>}
        

      </div>
      
    </>
  )
}

export default App
