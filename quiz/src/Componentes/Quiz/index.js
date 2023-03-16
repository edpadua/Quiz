import './Quiz.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Pergunta from '../Pergunta';


function Quiz({ nperguntas, categoria, nivel }) {

    const [perguntas, setPerguntas] = useState([]);
    const [pontuacao, setPontuacao] = useState(0);
    const [carregando, setCarregando] = useState(false);
    const [numeroDePerguntas, setNumeroDePerguntas] = useState(5);
    
    


    /** 

    async function getPerguntas() {
       
        setCarregando(true);
    
        
        const resp = await axios.get("https://opentdb.com/api.php?amount=5");


    
        setPerguntas(resp.data.results);
        setRespostaCerta(resp.data.results[0].correct_answer);
    
        console.log("perguntas ",resp.data.results);

       /**  resp.data.results.map((pergunta, index) =>
            
            
               combinaRespostas(pergunta.incorrect_answers, pergunta.correct_answer)
                    
            
        )

        
         https://opentdb.com/api.php?amount=${numeroDePerguntas}
         https://opentdb.com/api.php?amount=${nperguntas}&category=${categoria}&difficulty=${nivel}
        setCarregando(false);
      }

      **/

      
    async function getPerguntas() {
        setCarregando(true);
        setPontuacao(0);
        fetch(`https://opentdb.com/api.php?amount=${nperguntas}&category=${categoria}&difficulty=${nivel}`)
            .then(res => res.json())
            .then(data => setPerguntas(data.results.map(function (question) {
                return ({
                    question: question.question,
                    options: question.incorrect_answers.concat([question.correct_answer]).map(value => ({ value, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(({ value }) => value),
                    selected_answer: undefined,
                    correct_answer: question.correct_answer
                })
            })))
            setCarregando(false);
    }


    useEffect(() => {
        getPerguntas();

    }, []);



    function handlePontuacao() {
        setPontuacao(pontuacao+1);
    }


    function reset(){
        for (let i = 0; i < nperguntas; i++) {
            document.getElementById(i).style.display="inline-block"
        }
        getPerguntas();       
    }

    return (
        <div className="App">
           
            {carregando ? "Carregando..." : <div>
                <div className="pontuacao">
                    <h2>Pontuação: {pontuacao!==0?((pontuacao / nperguntas) * 100):0}%</h2>
                </div>
                <br />
                {console.log("perguntas ", perguntas)}
                {perguntas.map((pergunta, index) =>

                    
                      <Pergunta pergunta={pergunta} index={index} change = {handlePontuacao}/>
                      

                )}
               

            </div>

            }

        </div>
    );
}

export default Quiz