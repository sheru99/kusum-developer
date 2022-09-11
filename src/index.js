               

//My teamates name=====> //Mohd yousuf, sana nadim shah , kusum gupta , ayaan ali
//if you have any issues realted to my project so  please contact me =====>phone Number===>9717847131

const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const  mongoose = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://kusum_99:9vJ9mxlJH1cYZ1oO@cluster0.jelghm1.mongodb.net/project1-blog", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
