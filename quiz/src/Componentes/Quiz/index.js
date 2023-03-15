import './Quiz.css';
import axios from 'axios';
import { useEffect, useState } from 'react';


function Quiz() {

    const [perguntas, setPerguntas] = useState([]);
    const [respostaCerta, setRespostaCerta] = useState("");
    const [pontuacao, setPontuacao] = useState(0);
    const [perguntasRespondidas, setPerguntasRespondidas] = useState(0);
    const [todasRespostas, setTodasRespostas] = useState([]);
    const [carregando, setCarregando] = useState(false);


    function combinaRespostas(respostasIncorretas, respostasCorretas) {
        let todasRespostasItem = [];
        let todasRespostasTotais = [];

        todasRespostasTotais.push = todasRespostas;

        /**console.log("respostas_errad" ,respostasIncorretas);**/

        /**console.log("todasRespostasTotais",todasRespostasTotais);**/
        respostasIncorretas.map((item) => {/**console.log("item" ,item);**/
            todasRespostasItem.push(item);
        }
        );

        todasRespostasItem.push(respostasCorretas);

        //Randomize order of answers in array


        todasRespostasItem.sort(() => Math.random() - 0.5);



        /**console.log(" todasRespostasItem", todasRespostasItem);
        
        setTodasRespostas(() => todasRespostasItem);**/

    }


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

        

        setCarregando(false);
      }

      **/


    async function getPerguntas() {
        setPontuacao(0);
        fetch("https://opentdb.com/api.php?amount=5")
            .then(res => res.json())
            .then(data => setPerguntas(data.results.map(function (question) {
                return ({
                    question: question.question,
                    options: question.incorrect_answers.concat([question.correct_answer]).map(value => ({ value, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(({ value }) => value),
                    selected_answer: undefined,
                    correct_answer: question.correct_answer
                })
            })))

    }


    useEffect(() => {
        getPerguntas();

    }, []);







    function verificaResposta(respostaEscolhida, respostaCorreta, index) {
        //If the selected answer equals the correct answer, then we get the next trivia quesiton and increase the current points by 1
        { console.log("Resposta escolhida ", respostaEscolhida) }
        { console.log("Resposta certa ", respostaCorreta) }
        setPerguntasRespondidas(perguntasRespondidas + 1);
        {document.getElementById(index).style.display="none"}
        if (respostaEscolhida === respostaCorreta) {

            setPontuacao(pontuacao + 1);
        } 

        if (perguntasRespondidas == 5) {
            <h2>Você acertou {(pontuacao / perguntasRespondidas) * 100}%</h2>
        }

    }


    function corrige(pergunta) {
        return pergunta.replace(/(&quot\;)/g, "\"").replace(/(&rsquo\;)/g, "\"").replace(/(&#039\;)/g, "\'").replace(/(&amp\;)/g, "\"");
    }


    function reset(){
        for (let i = 0; i < 5; i++) {
            document.getElementById(i).style.display="inline-block"
        }
        getPerguntas();       
    }

    return (
        <div className="App">

            {carregando ? "Trivia Question Loading..." : <div>
                <div className="pontuacao">
                    <h2>Pontuação: {pontuacao!=0?((pontuacao / 5) * 100):0}%</h2>
                </div>
                <br />
                {console.log("perguntas ", perguntas)}
                {perguntas.map((pergunta, index) =>

                    <div id={index} className="perguntaCard" key={index}>
                        
                        <div>
                            <h3>Pergunta {index + 1}</h3>

                            <div className="pergunta">{corrige(pergunta.question)}</div>


                            <div className="resposta">

                                {
                                    pergunta.options.map((resposta, index2) =>
                                        <div className="opcao" key={index2}>
                                            <button onClick={() => verificaResposta(resposta, pergunta.correct_answer,index)} >
                                                {corrige(resposta)}
                                            </button>
                                        </div>
                                    )
                                }
                            </div>

                        </div>

                    </div>
                )}
                <div className="reset">
                    <button onClick={() => reset()} >
                        Reset
                    </button>
                </div>

            </div>

            }

        </div>
    );
}

export default Quiz