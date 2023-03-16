import './Inicializacao.css';
import Quiz from '../Quiz';
import { useState } from 'react';


function Inicializacao() {

    const [isShown, setIsShown] = useState(false);

    const [numeroDePerguntas, setNumeroDePerguntas] = useState(1);
    const [categoria, setCategoria] = useState("any");
    const [nivel, setNivel] = useState("any");

    const categorias = [
        {
            label: "Any Category",
            value: "any",
        },
        {
            label: "General Knowledge",
            value: "9",
        },
        {
            label: "Entertainment: Books",
            value: "10",
        },
        {
            label: "Entertainment: Film",
            value: "11",
        },
        {
            label: "Entertainment: Music",
            value: "12",
        },
        {
            label: "Entertainment: Musicals &amp; Theatres",
            value: "13",
        },

        {
            label: "Entertainment: Television",
            value: "14",
        },
        {
            label: "Entertainment: Video Games",
            value: "15",
        },
        {
            label: "Entertainment: Board Games",
            value: "16",
        },
        {
            label: "Science &amp; Nature",
            value: "17",
        },
        {
            label: "Science: Computers",
            value: "18",
        },
        {
            label: "Science: Mathematics",
            value: "19",
        },
        {
            label: "Mythology",
            value: "20",
        },
        {
            label: "Sports",
            value: "21",
        },
        {
            label: "Geography",
            value: "22",
        },
        {
            label: "History",
            value: "23",
        },
        {
            label: "Politics",
            value: "24",
        },
        {
            label: "Art",
            value: "25",
        },
        {
            label: "Celebrities",
            value: "26",
        },
        {
            label: "Animals",
            value: "27",
        },
        {
            label: "Vehicles",
            value: "28",
        },
        {
            label: "Entertainment: Comics",
            value: "29",
        },
        {
            label: "Science: Gadgets",
            value: "30",
        },
        {
            label: "Entertainment: Japanese Anime &amp; Manga",
            value: "31",
        },
        {
            label: "Entertainment: Cartoon &amp; Animations",
            value: "32",
        },


    ];

    const niveis = [
        {
            label: "Any Difficulty",
            value: "any",
        },
        {
            label: "Easy",
            value: "easy",
        },
        {
            label: "Medium",
            value: "medium",
        },
        {
            label: "Hard",
            value: "hard",
        },


    ];




    function show() {
        setIsShown(true);
    }


    const atualizaNumeroPerguntas = e => {
        setNumeroDePerguntas(e.target.value);
    }

    const atualizaCategoria = e => {
        setCategoria(e.target.value);
    }

    const atualizaNivel = e => {
        setNivel(e.target.value);
    }


    function reset(){
        setIsShown(false);
    }

    return (

        <div className="container">
            <form >
                <label for="trivia_amount" className="label-form">Número de perguntas:</label>
                <input type="number" name="trivia_amount" id="trivia_amount" className="form-control" min="1" max="50" onChange={atualizaNumeroPerguntas} />

                <label for="trivia_category" className="label-form">Selecione a categoria:</label>
                <select name="trivia_level" className="form-control" onChange={atualizaCategoria}>
                    {categorias.map((option) => (
                        <option value={option.value}>{option.label}</option>
                    ))}
                </select>

                <label for="trivia_level" className="label-form">Selecione o nível de dificuldade:</label>
                <select name="trivia_category" className="form-control" onChange={atualizaNivel}>
                    {niveis.map((nivel) => (
                        <option value={nivel.value}>{nivel.label}</option>
                    ))}
                </select>


            </form>

            <div className="reset">
                <button onClick={show}>Iniciar</button>
            </div>
           
            {isShown && <Quiz nperguntas={numeroDePerguntas} categoria={categoria} nivel={nivel} />}
            {isShown &&
                <div className="reset">
                    <button onClick={() => reset()} >
                        Reset
                    </button>
                </div>
            }
        </div>
    )
}

export default Inicializacao