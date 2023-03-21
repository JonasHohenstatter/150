import {useEffect, useState} from "react";

function History({history}){
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
                <div className="mt-5 grid grid-cols-5 justify-items-center lg:w-2/4 rounded-2xl w-full">
                    <div className="text-white">{el.date}</div>
                    <div className="text-white">{el.kcal}</div>
                    <div className="text-white">{el.protein}</div>
                    <div className="text-white">{el.fat}</div>
                    <div className="text-white">{el.carbs}</div>
                </div>
            ))}
        </>
    )
}

export default History;