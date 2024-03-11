import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path'

dotenv.config();

const app = express();


app.use(express.json());
app.use(cors())

const PORT = process.env.PORT;




app.get('/', (req, res) => {
    res.send('Kalangiam-nodejs-filesystem')
})

//Assigned a path for the file
const folderPath = './current-date-time'
    ;

//Endpoints to create a file with a current-date, the file consists of current date as the content
app.get('/createFile', (req, res) => {
    const currentDate = new Date();

    // I made the filename readable by calling toISOstring method

    const fileName = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}_${currentDate.getHours().toString().padStart(2, '0')}-${currentDate.getMinutes().toString().padStart(2, '0')}-${currentDate.getSeconds().toString().padStart(2, '0')}.txt`;
    const filePath = path.join(folderPath, fileName);
    const fileContent = currentDate.toISOString();

    // I used the fs, the inbuild method of express to writeFile 
    fs.writeFile(filePath, fileContent, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error');
        } else {
            // console.log('File created successfully:', fileName);
            res.status(200).send('File created successfully');
        }
    });
});

// to retrieve the files from the particular folder
app.get('/files', (req, res) => {
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error('Error reading folder:', err);
            res.status(500).send('Error reading folder');
        } else {
            console.log('Files retrieved successfully:', files);
            res.status(200).send(files);
        }
    });
});


app.listen(PORT, () => console.log(`Server listening on Port ${PORT}`))