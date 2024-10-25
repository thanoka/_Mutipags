import { useState } from 'react'


import './Counter.css'

function Counter(props) {

    const [value, setValue] = useState(props.value || 0)

    function increase (){
        setValue(value + 1)
    }
    function decrease (){
        setValue(value - 1)
    }


    return (
        <div className = 'box'>
             <h3>{props.name || "Counter"}</h3>
             <div className='bottom'>
             <button className='btn btn-danger' onClick={decrease}>-</button>
             <span>{value}</span>
             <button className='btn btn-success' onClick={increase}>+</button>
             </div>

        </div> 

    );

}

export default Counter;