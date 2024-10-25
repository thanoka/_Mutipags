import Variable from "../Variable/Variable";
import { useEffect, useState } from "react";

import './Add.css'
function Add({aValue, bValue}) {

    const [a , setA] = useState(0)
    const [b , setB] = useState(0)

    useEffect(()=>{
        setA(aValue || 0)
        setB(bValue || 0)
    }, [aValue, bValue])
    return ( 
    <div className="add-container">
    
        <h3>Add</h3>
        <div className="add-display"> 
            <span className="badge bg-primary">A = {a}</span>
            <span className="badge bg-secondary">A + B = {a + b}</span> 
            <span className="badge bg-primary">B = {b}</span>
        </div>
        <div className="variable-container">
            <Variable name = 'A' value={a} setValue={setA} type={'int'}/>
            <Variable name = 'B' value={b} setValue={setB} type={'int'}/>
        </div>
    </div> );
}

export default Add;