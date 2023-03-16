import './Pergunta.css';


function Pergunta({ pergunta, index, change }) {

    
  

    function verificaResposta(respostaEscolhida, respostaCorreta, index) {
        
        console.log("Resposta escolhida ", respostaEscolhida); 
        console.log("Resposta certa ", respostaCorreta); 
        
        document.getElementById(index).style.display="none";
        if (respostaEscolhida === respostaCorreta) {
               change()
        } 

       

    }

    
    function corrige(pergunta) {
        return pergunta.replace(/(&quot\;)/g, "\"").replace(/(&rsquo\;)/g, "\"").replace(/(&#039\;)/g, "\'").replace(/(&amp\;)/g, "\"");
    }

    return (
        <div id={index} className="perguntaCard" key={index}>

            <div>
                <h3>Pergunta {index + 1}</h3>

                <div className="pergunta">{corrige(pergunta.question)}</div>


                <div className="resposta">

                    {
                        pergunta.options.map((resposta, index2) =>
                            <div className="opcao" key={index2}>
                                <button onClick={() => verificaResposta(resposta, pergunta.correct_answer, index)} >
                                    {corrige(resposta)}
                                </button>
                            </div>
                        )
                    }
                </div>

            </div>

        </div>
    )
}

export default Pergunta