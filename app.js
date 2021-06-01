const express = require('express');  // importing express
const bodyParser = require('body-parser'); // importing body-parse
var app = express(); // initilizing express to app

app.set('view engine', 'ejs'); // setting ejs
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'))

/**

  staring coding in express with app.get() method which will help to render
  content on web page or in console

*/

let item = [] // initilizing global variable for render list
app.get('/', (req,res) => {
  /**

    req and res is the two paramter which we have to pass or in the other word
    it is call back paramter

    there are two ways to render content on web page
      1.  res.send( content )   which will return single line of content
      2.  res.senFile( filename ) vwhich will return whole html file on web page
    res.sendFile(__dirname + "/index.html")

---------------------------------------------------------------------------------

    because of we are using ejs <-- embedded javascript syntax -->
    we will use -----------> res.render()

    in which we have to create folder called views in which our view
    i.e .ejs files will store it is a replacment of .html files

  */
  let date = new Date() // this will generate today days
  options={
    weekday:'long',
    day:'numeric',
    month:'long'
  }
  let gretting ="" // empty string fot stoing data

  gretting ="Today is " + date.toLocaleDateString('en-US', options);
  /**

    this will use to render grettings and item in ui

  */
  res.render('list', {grettings : gretting ,  items :item})
})

/**

  this will except post request
  and the pushed into item for rendering data
*/
app.post("/", (req , res) =>{
  if(req.body.button === 'done'){
    item = item.filter(ele => ele !== req.body.item)
  }else{
    item.push(req.body.item)
  }
  res.redirect("/")
})












/**

  app.listen() will execute a local server on the given port

*/
app.listen(process.env.PORT || 3000, () =>{
  console.log('Hey i am listning on 3000 !!!');
})
