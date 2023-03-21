import {useState} from "react";

function Counter({name, unit, initialIncrease, value, set}){
    const [increase, setIncrease] = useState(initialIncrease);
    const inc = () => {
        set(value => value + increase)
    }
    return(

            <button className="bg-green-400 drop-shadow-2xl rounded-3xl w-40 h-32 flex place-items-center justify-center" onClick={inc}>
                <div className="text-2xl">
                    <p className="font-bold">{value}{unit}</p>{name}
                </div>
            </button>

    )
}

export default Counter;