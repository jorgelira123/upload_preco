const express = require('express')
const cors = require('cors')
const multer = require('multer')
const path = require('path')
const mysql = require('mysql')

const app = express()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads') // Directory where SQL files will be saved
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage })

app.use(cors())

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'J(g¨&v$%df¨12vgvFFD',
  database: 'sistema'
})

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err)
  } else {
    console.log('Connected to the database')
  }
})

app.post('/upload-sql', upload.single('file'), (req, res) => {
  const filePath = req.file.path

  // Assuming you have the MySQL connection 'db' established
  // Read the SQL file and execute the queries
  const fs = require('fs')
  const sqlQueries = fs.readFileSync(filePath, 'utf-8')

  db.query(sqlQueries, (err, results) => {
    if (err) {
      console.error('Error executing SQL queries:', err)
      res.status(500).json({ error: 'Error executing SQL queries' })
    } else {
      console.log('SQL queries executed successfully')
      res.status(200).json({ message: 'SQL queries executed successfully' })
    }
  })
})

app.listen(4000, () => {
  console.log('Server is running on port 4000')
})
