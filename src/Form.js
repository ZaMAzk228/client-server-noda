import React, { useState } from 'react';
import axios from 'axios';

const Form = () => {

    const [value, setValue] = useState({
        name: ''
    });

    const sendMessage = async () => {

        try {
            const response = await axios.post('http://localhost:3000/new-user', value, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        } catch(error) {
            console.error("ошибка" + error);
        }

        console.log('данные отправлены')
        setValue({name: ''});
    }

    return(
        <>
                <input placeholder='имя пользователя' value={value.name} onChange={ e => {setValue(e.target.value)}}></input>
                <button onClick={sendMessage}>Отправить на сервер</button>
        </>
    )
}

export default Form;