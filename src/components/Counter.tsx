import React, {useState} from 'react'

const Counter = () => {
    const [count, setCount] = useState(0);

    const IncrementCount = () => {
        setCount(count + 1);
    };
    const DecrementCount = () => {
        setCount(count - 1);
    };
    
    const age:number = 10;
    console.log(age)

    return (
        <div>
            <h1>{count}</h1>
            <button onClick={IncrementCount}>Increment</button>
            <button onClick={DecrementCount}>Decrement</button>
        </div>
    );
}

export default Counter
