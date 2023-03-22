import {useEffect, useState} from "react";

function History({history, removeEntry}){

    return(
        <>
            <div className="mt-5 grid grid-cols-5 justify-items-center lg:w-2/4 lg:bg-none bg-gray-900 rounded-2xl w-full">
                <div className="lg:bg-gray-900 p-3 lg:pl-7 lg:pr-7 rounded-full text-white">Date</div>
                <div className="lg:bg-gray-900 p-3 lg:pl-7 lg:pr-7 rounded-full text-white">Kcal</div>
                <div className="lg:bg-gray-900 p-3 lg:pl-7 lg:pr-7 rounded-full text-white">Protein</div>
                <div className="lg:bg-gray-900 p-3 lg:pl-7 lg:pr-7 rounded-full text-white">Fat</div>
                <div className="lg:bg-gray-900 p-3 lg:pl-7 lg:pr-7 rounded-full text-white">Carbs</div>
            </div>
            {history.map( el => (
                <div className="mt-5 grid grid-cols-5 justify-items-center lg:w-2/4 rounded-2xl w-full" key={el.date}>
                    <div className="text-white">{el.date.split(" ").slice(0, -1).join(".")}</div>
                    <div className="text-white">{el.kcal}</div>
                    <div className="text-white">{el.protein}</div>
                    <div className="text-white">{el.fat}</div>
                    <div className="text-white flex flex-row"><span className="ml-6 lg:ml-12">{el.carbs}</span>
                        <button onClick={() => removeEntry(el.date)}><svg xmlns="http://www.w3.org/2000/svg" className="fill-red-400 w-5 h-5 ml-5 lg:ml-10 mb-3" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/></svg>
                    </button>
                    </div>

                </div>
            ))}
        </>
    )
}

export default History;