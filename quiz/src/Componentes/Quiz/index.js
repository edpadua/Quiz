import './Quiz.css';
import axios from 'axios';
import { useEffect, useState } from 'react';


function Quiz(){
  
    const [perguntas, setPerguntas] = useState([]);
    const [respostaCerta, setRespostaCerta] = useState("");
    const [pontuacao, setPontuacao] = useState(0);
    const [todasRespostas, setTodasRespostas] = useState([]);
    const [carregando, setCarregando] = useState(false);


    async function getPerguntas() {
       
        setCarregando(true);
    
        
        const resp = await axios.get("https://opentdb.com/api.php?amount=1");
    
        setPerguntas(resp.data.results);
        setRespostaCerta(resp.data.results[0].correct_answer);
    
        console.log("perguntas",resp.data.results);
        

        setCarregando(false);
      }

      useEffect(() => {
        getPerguntas();
        
      }, []);

  
  return (
    <div>
        <h2>Teste</h2>
        {console.log("perguntas state",perguntas)}
    </div>
  );
}

export default Quiz