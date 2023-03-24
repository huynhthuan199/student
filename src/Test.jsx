import { useEffect, useState } from 'react';

const Test = () => {
    const [age, setAge] = useState(0);

    const handleOnClick = (e) => {
        setAge(age + 1);
    };

    useEffect(() => {
        setAge(2);
    }, [age]);

    return (
        <div>
            {console.log(age)}
            {age}
            <button onClick={handleOnClick}>Click</button>
        </div>
    );
};

export default Test;
