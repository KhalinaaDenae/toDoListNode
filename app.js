// requires modules 
const express = require ('express')
const bodyParser = require('body-parser')
const app = express()

// array to hold to-do items 
let items = []

app.set("view engine", 'ejs')
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

// root route - sends index.html page
app.get("/", function (req,res){
    
    // create variable to hold the current date 
    let today = new Date()
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let day = today.toLocaleDateString('en-US', options)
    res.render("list" , {kindOfDay: day, newListItems: items}) // renders file called list - passing in variable that is holding the current date and tha array of to-do items
})

// post route for new list - adds a new to do item to the items array 
app.post("/", function(req,res){
    // grabs value of user input using body parser 
    item = req.body.newItem

    // pushes the value to the items array 
    items.push(item)

    // then loads the root path
    res.redirect("/")
})

// Route to render edit task view - triggered when " edit " is clicked 
app.get("/edit/:id", function (req, res) {
    const itemId = req.params.id; // uses the array item index as id
    let today = new Date()
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let day = today.toLocaleDateString('en-US', options)

    // displays the edit task view page , passing in which item index is being edited & changing the value of the item index that was just changed
    res.render("edit", { itemId: itemId, item: items[itemId], kindOfDay: day });
  });

// route to update a task - triggered when " save " is clicked 
app.post("/edit/:id", function (req, res) {
    const itemId = req.params.id;
    const updatedItem = req.body.updatedItem;
    // array gets updated with the edited item 
    items[itemId] = updatedItem;
    // main route is loaded 
    res.redirect("/");
  });

// Route to delete a task - triggered when " delete " is clicked 
app.post("/delete/:id", function (req, res) {
    const itemId = req.params.id;
    // removes this item from array when the delete button is clicked
    items.splice(itemId, 1);
    // then loads the route path 
    res.redirect("/");
  });


app.listen(3000, function () {
    console.log(`server is running on port 3000`)
})