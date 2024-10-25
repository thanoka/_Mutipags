import { useEffect, useState } from 'react';
import './Timer.css';
import { ssrExportAllKey } from 'vite/runtime';

function Timer(props) {

    const [running , setRunning] = useState(false)
    const [seconds , setSecond] = useState(0)

    useEffect(() => {
        let interval = null
            if(running) {
                interval = setInterval(()=>{ setSecond(seconds + 1)}, 1000)
            }

        return () => {
            clearInterval(interval)
        }
    }, [running, seconds])

    function run(){
        setRunning(!running)
    }

    function  secondToString(seconds){
        const MINUTE_SECONDS = 60
        const HOUR_SECONDS = 60 * MINUTE_SECONDS
        const DAY_SECONDS = 24 * HOUR_SECONDS

        const days = Math.floor(seconds / DAY_SECONDS)
        const hours = Math.floor((seconds % DAY_SECONDS) / HOUR_SECONDS);
        const minutes = Math.floor((seconds % HOUR_SECONDS) / MINUTE_SECONDS);
        const secs = Math.floor(seconds % MINUTE_SECONDS);

        let result = "";
        if (days > 0) result += `${days} d `;
        if (hours > 0 || days > 0) result += `${hours} h `;
        if (minutes > 0 || hours > 0 || days > 0) result += `${minutes} m `;
        if (seconds === 0) result = '';
        result += `${secs} s`;
        return result;
    }

    function reset(){
        setRunning(false)
        setSecond(0)
    }

    return (
        <div className="timer-container">
            <h3>Timer</h3>
            <p><input type="text" readOnly = {true} value={secondToString(seconds)}/></p>
            <div className='bottom'>
                <button className='btn btn-danger' onClick={reset}>reset</button>
                <button className={'btn ' + (running ? 'btn-warning' : 'btn-success')} onClick={run}> {running ? 'Pause' : 'Run'}</button>
            </div>
        </div>
    );
}

export default Timer;
