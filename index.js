import Express, { response } from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = Express();

app.use(Express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))

app.set('view engine', 'ejs');

let ans = "Your results will be displayed here"

app.get("/",async (req,res)=>{
    const options = {
    method: 'GET',
    url: 'https://google-translate1.p.rapidapi.com/language/translate/v2/languages',
    headers: {
      'Accept-Encoding': 'application/gzip',
      'X-RapidAPI-Key': '8befef836cmsha45e9b862207954p1ede03jsnf0e4a8c61a28',
      'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
    }
  }
  try {
      const response = await axios.request(options);
      const content = response.data;
      res.render("index",{
        content : content,
      ans:ans})
      
  } catch (error) {
      console.error(error);
  }
})

app.post("/convert", async(req,res)=>{
const encodedParams = new URLSearchParams();
encodedParams.set('q', req.body.info);
encodedParams.set('target', req.body.langs);
encodedParams.set('source', 'en');
const options = {
  method: 'POST',
  url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    'Accept-Encoding': 'application/gzip',
    'X-RapidAPI-Key': '8befef836cmsha45e9b862207954p1ede03jsnf0e4a8c61a28',
    'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
  },
  data: encodedParams,
};

try {
	const response = await axios.request(options);
      const content = JSON.stringify(response.data);
      res.send({ ans:content})
} catch (error) {
	console.error(error);
}
})


app.listen(3000,()=>{
    console.log("started")
})