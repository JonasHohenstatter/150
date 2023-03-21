import Counter from "./Components/Counter";
import {useEffect, useState} from "react";
import History from "./Components/History";

function App() {
    const [kcal, setKcal] = useState(0);
    const [protein, setProtein] = useState(0);
    const [fat, setFat] = useState(0);
    const [carbs, setCarbs] = useState(0);
    const [load, setLoad] = useState(true);
    const [history, setHistory] = useState(getHistory());

    function getHistory(){
        const hist = Object.entries({... localStorage});
        return hist.map(el => {
            const data = JSON.parse(el[1]);
            return {
                date : el[0].split(" ").slice(0, -1).join("."),
                kcal : data.kcal,
                protein : data.protein,
                fat : data.fat,
                carbs : data.carbs,
            }
        })
    }

    function getDateString(){
        let date = new Date()
        let str = "";
        str += (date.getDate() < 10 ? "0" : "") + date.getDate() + " ";
        str += (date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1) + " ";
        return str + date.getFullYear();
    }

    const [currentDate, setDate] = useState(getDateString())

    function setValues({kcal, protein, fat, carbs}){
        setKcal(kcal);
        setProtein(protein);
        setFat(fat);
        setCarbs(carbs);
    }

    function clear(){
        setKcal(0);
        setProtein(0);
        setFat(0);
        setCarbs(0);
    }

    useEffect(() => {
        let dateString = getDateString();
        if(currentDate !== dateString){
            localStorage.setItem(dateString,
                JSON.stringify({
                        "kcal" : kcal,
                        "protein" : protein,
                        "fat" : fat,
                        "carbs" : carbs
                    })
            )
            clear();
        }
        if(load){
            try{
                setValues(JSON.parse(localStorage.getItem(dateString)))
            }
            catch (e){}
            setLoad(false);
        }
        else{
            localStorage.setItem(dateString,
                JSON.stringify({
                    "kcal" : kcal,
                    "protein" : protein,
                    "fat" : fat,
                    "carbs" : carbs
                }
            ))
            setHistory(getHistory());
        }

    }, [kcal, protein, fat, carbs])
    return (
    <div className="bg-gray-800 min-h-screen min-w-screen">
        <div className="grid md:grid-rows-1 md:grid-cols-none  md:grid-flow-col grid-rows-2 items-center md:p-10 p-5 grid-cols-2 gap-4 justify-center justify-items-center">
            <Counter name="kcal" unit="" initialIncrease={150} value={kcal} set={setKcal}></Counter>
            <Counter name="Protein" unit="g" initialIncrease={5} value={protein} set={setProtein}></Counter>
            <Counter name="Fat" unit="g" initialIncrease={5} value={fat} set={setFat}></Counter>
            <Counter name="Carbs" unit="g" initialIncrease={10} value={carbs} set={setCarbs}></Counter>
        </div>
        <div className="flex justify-center items-center flex-col pl-3 pr-3 p-5 ">
            <div className="flex justify-center text-gray-200 text-4xl drop-shadow-2xl bg-gray-900 ml-5 mr-5 p-3 lg:w-2/4 w-full rounded-full">History </div>
            <History history={history}></History>
        </div>
    </div>
  );
}

export default App;
