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
        return hist.sort((a, b) => {
            a = parseInt(a[0].split(" ").join(""))
            b = parseInt(a[0].split(" ").join(""))
            if(a < b){return -1;}
            if(a > b){return 1;}
            return 0;
        }).map(el => {
            const data = JSON.parse(el[1]);
            return {
                date : el[0],
                kcal : data.kcal,
                protein : data.protein,
                fat : data.fat,
                carbs : data.carbs,
            }
        }).reverse()
    }

    function removeEntry(key){
        localStorage.removeItem(key);
        setHistory(getHistory());
        if(key === getDateString()){
            clear()
        }
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
        console.log(getDateString())
        localStorage.removeItem(getDateString());
        setHistory(getHistory())
    }

    useEffect(() => {
        let dateString = getDateString();
        if(currentDate !== dateString){
            localStorage.setItem(currentDate,
                JSON.stringify({
                        "kcal" : kcal,
                        "protein" : protein,
                        "fat" : fat,
                        "carbs" : carbs
                    })
            )
            clear();
            setDate(dateString)
        }
        if(load){
            try{
                setValues(JSON.parse(localStorage.getItem(dateString)))
            }
            catch (e){}
            setLoad(false);
        }
        else{
            if(kcal + protein + fat + carbs != 0){
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
        }

    }, [kcal, protein, fat, carbs])
    return (
    <div className="bg-gray-800 min-h-screen min-w-screen">
        <div className="bg-gray-900 h-14 rounded-b-lg lg:mb-0 mb-7 drop-shadow-2xl grid grid-cols-3 justify-items-center items-center">
            <div className=""></div>
            <div className="text-white font-bold text-2xl flex ">150 kcal</div>
            <button onClick={clear} className="text-white justify-self-end">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 fill-green-400 mr-5" viewBox="0 0 24 24"><path d="M13.5 2c-5.621 0-10.211 4.443-10.475 10h-3.025l5 6.625 5-6.625h-2.975c.257-3.351 3.06-6 6.475-6 3.584 0 6.5 2.916 6.5 6.5s-2.916 6.5-6.5 6.5c-1.863 0-3.542-.793-4.728-2.053l-2.427 3.216c1.877 1.754 4.389 2.837 7.155 2.837 5.79 0 10.5-4.71 10.5-10.5s-4.71-10.5-10.5-10.5z"/></svg>
            </button>
        </div>
        <div className="grid md:grid-rows-1 md:grid-cols-none  md:grid-flow-col grid-rows-2 items-center md:p-10 pl-5 pr-5 grid-cols-2 gap-4 justify-center justify-items-center">
            <Counter name="kcal" unit="" initialIncrease={150} value={kcal} set={setKcal}></Counter>
            <Counter name="Protein" unit="g" initialIncrease={5} value={protein} set={setProtein}></Counter>
            <Counter name="Fat" unit="g" initialIncrease={5} value={fat} set={setFat}></Counter>
            <Counter name="Carbs" unit="g" initialIncrease={10} value={carbs} set={setCarbs}></Counter>
        </div>
        <div className="flex justify-center items-center flex-col pl-3 pr-3 p-5 ">
            <div className="flex justify-center text-gray-200 text-4xl drop-shadow-2xl bg-gray-900 ml-5 mr-5 p-3 lg:w-2/4 w-full rounded-full">History </div>
            <History history={history} removeEntry={removeEntry}></History>
        </div>
    </div>
  );
}

export default App;
