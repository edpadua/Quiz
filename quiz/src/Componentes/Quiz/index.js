import './Quiz.css';
import { useEffect, useState } from 'react';
import Pergunta from '../Pergunta';


function Quiz({ nperguntas, categoria, nivel }) {

    const [perguntas, setPerguntas] = useState([]);
    const [pontuacao, setPontuacao] = useState(0);
    const [carregando, setCarregando] = useState(false);
    
    

    useEffect(() => {
        const getPerguntas = async () => {
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

        getPerguntas();  
    }, [nperguntas, categoria, nivel]);

    function handlePontuacao() {
        setPontuacao(pontuacao+1);
    }


    return (
        <div >
           
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