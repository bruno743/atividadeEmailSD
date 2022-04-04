const express = require('express')
const cors = require('cors')
const app = express()

// depois do db
const mongoose = require('mongoose')

const Mail = require('./models/Mail')
const Msg = require('./models/Msg')

app.use(cors())

app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())

// rotas
app.post('/', async (req, res) => {
  const { name } = req.body

  const mail = {
    name,
  }

  try {
    await Mail.create(mail)

    res.status(201).json({ message: 'Email inserido no sistema com sucesso!' })
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

app.delete('/', async (req, res) => {

  const { n } = req.body
  const mail = await Mail.findOne({ name: n })
  
  if (!mail) {
    res.status(422).json({ message: 'Erro!' })
    return
  }
  
  try {
    await Mail.deleteOne({ _id: mail.id })

    res.status(200).json({ message: 'Remoção sucedida!' })
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

app.post('/mail', async (req, res) => {
    const { rem, dest, ass, msg } = req.body
  
    const mail = {
      rem,
      dest,
      ass,
      msg,
    }
  
    try {
      await Msg.create(mail)
  
      res.status(201).json({ message: 'Email enviado com sucesso!' })
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })

app.get('/mail', async (req, res) => {
  const { d } = req.query
  try {
    const mails = await Msg.find({ dest: d })

    res.status(200).json(mails)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

app.get('/mail/:id', async (req, res) => {
  const id = req.params.id

  try {
    const mail = await Msg.findOne({ _id: id })

    if (!mail) {
      res.status(422).json({ message: 'Email não encontrado!' })
      return
    }

    res.status(200).json(mail)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

app.delete('/mail', async (req, res) => {
  const { d } = req.query
  const mail = await Msg.find({ dest: d })

  if (!mail) {
    res.status(422).json({ message: 'Erro!' })
    return
  }

  try {
    await Msg.deleteMany({ dest: d })

    res.status(200).json({ message: 'Remoção sucedida!' })
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

app.get('/', (req, res) => {
  res.json({ message: 'Oi Express!' })
})

// mongodb+srv://bruno743:<password>@cluster0.nsxln.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

mongoose
  .connect(
    'mongodb+srv://<user>:<password>@<clusterName>.nsxln.mongodb.net/<dbName>?retryWrites=true&w=majority',
    {useNewUrlParser: true, dbName: "dbName"}
  )
  .then(() => {
    console.log('Conectou ao banco!')
    app.listen(3000)
  })
  .catch((err) => console.log(err))