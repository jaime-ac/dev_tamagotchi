import './Images.css';

function Images({ imagem }) {
  return (
    <div>

        <img src={imagem} alt="" className='imagem_personagem'/>
      
    </div>
  )
}

export default Images
