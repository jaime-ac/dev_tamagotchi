
import './App.css';
import { useState, useEffect, useRef } from 'react';
import Images from './components/Images';

function App() {

  const [energia, setEnergia] = useState(100);
  const [fome, setFome] = useState(100);
  const [felicidade, setFelicidade] = useState(100);
  const [higiene, setHigiene] = useState(100);
  const [morreu, setMorreu] = useState(false);

  const [images, setImages] = useState(<Images imagem={'/public/morning.png'}/>)

  const temposEmZero = useRef({ fome: 0, energia: 0, felicidade: 0, higiene: 0 });

  const efeitos = {

    alimentar: { fome: +20, energia: -5 },
    banho: { higiene: +25, felicidade: -5 },
    brincar: { felicidade: +15, energia: -10, fome: -5 },
    dormir: { energia: +30, fome: -10, higiene: -5 },

  };

  const aplicarEfeitos = (acao) => {

    const efeito = efeitos[acao];
    if (!efeito || morreu) return;

    setFome((f) => Math.min(Math.max(f + (efeito.fome || 0), 0), 100));
    setEnergia((e) => Math.min(Math.max(e + (efeito.energia || 0), 0), 100));
    setFelicidade((f) => Math.min(Math.max(f + (efeito.felicidade || 0), 0), 100));
    setHigiene((h) => Math.min(Math.max(h + (efeito.higiene || 0), 0), 100));

  };

  useEffect(() => {

    const intervalo = setInterval(() => {

      setFome((f) => Math.max(f - 1, 0));
      setEnergia((e) => Math.max(e - 1, 0));
      setFelicidade((f) => Math.max(f - 1, 0));
      setHigiene((h) => Math.max(h - 1, 0));

      const valores = { fome, energia, felicidade, higiene };
      // Verifica tempo em 0
      ["fome", "energia", "felicidade", "higiene"].forEach((atributo) => {
        const valor = valores[atributo];
        if (valor === 0) temposEmZero.current[atributo] += 1;
        else temposEmZero.current[atributo] = 0;
      });

      setFome((f) => {
        if (f === 0) temposEmZero.current.fome += 1;
        else temposEmZero.current.fome = 0;
        return f;
      });

      setEnergia((e) => {
        if (e === 0) temposEmZero.current.energia += 1;
        else temposEmZero.current.energia = 0;
        return e;
      });

      setFelicidade((f) => {
        if (f === 0) temposEmZero.current.felicidade += 1;
        else temposEmZero.current.felicidade = 0;
        return f;
      });

      setHigiene((h) => {
        if (h === 0) temposEmZero.current.higiene += 1;
        else temposEmZero.current.higiene = 0;
        return h;
      });

      const tempoLimite = 5; // segundos
      const morreuPorTempo = Object.values(temposEmZero.current).some((t) => t >= tempoLimite);
      const zerados = [fome, energia, felicidade, higiene].filter((v) => v === 0).length;

      if (morreuPorTempo || zerados >= 1) {
        setMorreu(true);
        setImages(<Imag                es imagem={'/public/morreu.png'}/>)
        clearInterval(intervalo);
      }

    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

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

              <div className="app_main-header_left">

                <div className="app_main-header_left-top">
                  <label htmlFor="" className="app_main-header_text">🧠ENERGIA: {energia}</label>
                </div>

                <div className="app_main-header_left-bottom">
                  <label htmlFor="" className="app_main-header_text">😆FELICIDADE: {felicidade}</label> 
                </div>

              </div>

              <div className="app_main-header_right">

                <div className="app_main-header_right-top">
                  <label htmlFor="" className="app_main-header_text">🍔FOME: {fome}</label> 
                </div>

                <div className="app_main-header_right-bottom">
                  <label htmlFor="" className="app_main-header_text">🛀🏾HIGIENE: {higiene}</label> 
                </div>

              </div>

            </div>

            <div className="app_main-body">

              <div className="app_main-body_images">

                <div className="app_main-body_images-box">

                  {images}

                </div>

              </div>

              <div className="app_main-body_button">

                <button className="botoes" onClick={() => aplicarEfeitos("alimentar")}>Alimentar</button>
                <button className="botoes" onClick={() => aplicarEfeitos("brincar")}>Brincar</button>
                <button className="botoes" onClick={() => aplicarEfeitos("dormir")}>Dormir</button>
                <button className="botoes" onClick={() => aplicarEfeitos("banho")}>Banho</button>

              </div>

            </div>

          </div>

          <div className="app_footer">

            <h6>Desenvolvido por Jaime António Cá - SENAI/FLN</h6>

          </div>

        </div>

        <div className="app_direita">

        </div>
        
      </div>
      
    </>
  )
}

export default App
