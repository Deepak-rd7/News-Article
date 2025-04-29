import axios from "axios";


export async function teslaArticle(req,res) {

    const date=new Date().toString();
    
    
  const currentDate=date.split('T')[0];

    
    try {
        const response=await axios.get(`https://newsapi.org/v2/everything?q=tesla&from=${currentDate}&sortBy=publishedAt&apiKey=84b0684c72da4e5194a8244f61d0a37e`);
        
         res.json({
            success:true,
            articles:response.data
        })
        
    } catch (error) {
        console.log(error);
        
    }
}

export async function buisnessArticle(req,res) {
    try {
        const response=await axios.get("https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=84b0684c72da4e5194a8244f61d0a37e");
        
          res.json({
            success:true,
            articles:response.data
            
        })
        
    } catch (error) {
        console.log(error);
        
    }
}

export async function mobilePhones(req,res) {
    try {
        const response=await axios.get("https://newsapi.org/v2/everything?q=apple&from=2025-04-20&to=2025-04-20&sortBy=popularity&apiKey=84b0684c72da4e5194a8244f61d0a37e");
        
         res.json({
            success:true,
            articles:response.data
        })
        
    } catch (error) {
        console.log(error);
        
    }
}

export async function techCrunch(req,res) {
    try {
        const response=await axios.get("https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=84b0684c72da4e5194a8244f61d0a37e");
        
        res.json({
            success:true,
            articles:response.data
        })
        
    } catch (error) {
        console.log(error);
        
    }
}