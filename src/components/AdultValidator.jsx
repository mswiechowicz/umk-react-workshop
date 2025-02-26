import { useState } from 'react';

function AdultValidator({ min = 4, max = 99, shouldRender = true }) {
    const [age, setAge] = useState('');

    if (!shouldRender) {
        return null;
    }

    const handleChange = ({ target: { value } }) => {
        if (value.match(/^\d+$/) || value === '') {
            setAge(value);
        }
    };

    const getValidationError = () => {
        if (age < min) {
            return 'Are you really so young?';
        }
        if (age > max) {
            return 'Are you really so old?';
        }
        return 'This page is available only for adult people';
    };

    const isValid = age >= 18 && age <= max;

    return (
        <div>
            <label htmlFor='age'>Put your age here</label>
            <input id='age' name='age' value={age} onChange={handleChange} />
            {age && (
                <div role='alert'>
                    {isValid ? 'You are grown up!' : getValidationError()}
                </div>
            )}
        </div>
    );
}

export { AdultValidator };
