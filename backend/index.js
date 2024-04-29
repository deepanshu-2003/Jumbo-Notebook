const connectToMongo = require('./db');
const cors = require('cors');

connectToMongo();

const express = require('express')
const app = express()
const port = 5000


//  we will not use this thing in normal cases 
// because we will use express router to route to different end points
// and let end points handle their requests

// app.get('/', (req, res) => {
  //   res.send('Hello Jumbo Notes i am here on server');
  // })
  
  
  // We want to use middleware like json because our request will be in json format from client body
  app.use(express.json());
  app.use(cors());

// Routing to our apps , available routes....
app.use('/notes',require('./routes/notes'));
app.use('/auth',require('./routes/auth'));

app.listen(port, () => {
  console.log(`Jumbo Notebook app listening on port ${port}`)
})