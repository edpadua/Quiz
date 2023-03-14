import './Quiz.css';
import axios from 'axios';
import { useEffect, useState } from 'react';


function Quiz(){
  
    const [perguntas, setPerguntas] = useState([]);
    const [respostaCerta, setRespostaCerta] = useState("");
    const [pontuacao, setPontuacao] = useState(0);
    const [todasRespostas, setTodasRespostas] = useState([]);
    const [carregando, setCarregando] = useState(false);


    function combinaRespostas(respostasIncorretas, respostasCorretas) {
       let todasRespostasItem = [];
       let todasRespostasTotais=[];

       todasRespostasTotais.push=todasRespostas;
       
        /**console.log("respostas_errad" ,respostasIncorretas);**/
       
        /**console.log("todasRespostasTotais",todasRespostasTotais);**/
        respostasIncorretas.map((item) => 
           {/**console.log("item" ,item);**/
               todasRespostasItem.push(item);
           }
        );
    
        todasRespostasItem.push(respostasCorretas);
        
        //Randomize order of answers in array
        
        
        todasRespostasItem.sort(() => Math.random() - 0.5);

        todasRespostasItem.map((resposta, index) =>
                    <div>
                      <button  onClick={() => verificaResposta(resposta)} >
                        {corrige(resposta)}
                      </button>
                    </div>
                  )
        
        /**console.log(" todasRespostasItem", todasRespostasItem);
        
        setTodasRespostas(() => todasRespostasItem);**/
        
      }
    

      

    async function getPerguntas() {
       
        setCarregando(true);
    
        
        const resp = await axios.get("https://opentdb.com/api.php?amount=5");
    
        setPerguntas(resp.data.results);
        setRespostaCerta(resp.data.results[0].correct_answer);
    
        console.log("perguntas ",resp.data.results);

       /**  resp.data.results.map((pergunta, index) =>
            
            
               combinaRespostas(pergunta.incorrect_answers, pergunta.correct_answer)
                    
            
        )**/

        

        setCarregando(false);
      }

      


      useEffect(() => {
        getPerguntas();
        
      }, []);

      


      


      function verificaResposta(respostaEscolhida) {
        //If the selected answer equals the correct answer, then we get the next trivia quesiton and increase the current points by 1
        if (respostaEscolhida === respostaCerta) {
          getPerguntas();
          setPontuacao(pontuacao + 1);
        } else {
          //If the selected answer does not equal the correct answer, decreaes the current points by 1
          setPontuacao(pontuacao - 1);
        }
      }


  function corrige(pergunta) {
    return pergunta.replace(/(&quot\;)/g, "\"").replace(/(&rsquo\;)/g, "\"").replace(/(&#039\;)/g, "\'").replace(/(&amp\;)/g, "\"");
  }

  
  return (
    <div className="App">
     
        {carregando ? "Trivia Question Loading..." : <div>
          <div>
            Current Points: {pontuacao}
          </div>
          <br />

          {perguntas.map((pergunta, index) =>
            
            <div key={index}>
              <div>
                <h3>Pergunta</h3>
                {corrige(pergunta.question)}
                {console.log("Todas as respostas" ,todasRespostas)
                }
                {
                    combinaRespostas(pergunta.incorrect_answers, pergunta.correct_answer)
                }
                <div>
                { 
                  todasRespostas.map((resposta, index) =>
                    <div>
                      <button  onClick={() => verificaResposta(resposta)} >
                        {corrige(resposta)}
                      </button>
                    </div>
                  )
                }
              </div>
              
              </div>
            </div>
          )}
        </div>
        }
      
    </div>
  );
}

export default Quiz