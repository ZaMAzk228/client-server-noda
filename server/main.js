const express = require('express');
const cors = require('cors');
const events = require('events');
const path = require('path');
const fs = require('fs').promises


async function readFiles(){
    try{
        const data = await fs.readFile('./users.json', 'utf-8');
        return JSON.parse(data);   
    } catch(error){
        if(error.code === 'ENOENT'){
            return {users: []};
        }
        throw error;
    }
}

async function writeFiles(){
    try{
        await fs.mkdir(path.dirname('./users.json'), {recursive: true})
        await fs.writeFile('./users.json', JSON.stringify(data, null, 1))
    } catch (error) {
        console.error('ошибка', error);
        throw error;
    }
}

const PORT = 3000;

const app = express();
app.use(express.json());

app.post('/new-user', async (req,res) => {
    console.log('получен запрос')
    
    try{
        const {name} =req.body;

        if ( !name ){
            return res.status(400).json({
                error: 'обязательное поле'
            });
        }

        const exData = await readFiles();

        const newUser = {
            name,
            createAd: new Date().toISOString()
        }

        exData.users.push(newUser);
        await writeFiles(exData);

        
    } catch(error){
        console.error('ошибка сервера:', error);
        res.status(500)
    }
})

app.listen(PORT, () => console.log('сервер запущен, порт:', PORT))