const getAllQuestion = (req, res) =>{

    if(res.statusCode===200){
  
      res.json({
  
          "Succees": true,
          "Body": {
              type:"Question",
              Body:"Burası merkez patlıyor herkes"
          }
      })
  
      }
      else{
  
          res.json({
  
              "Succees": false,
              "statuseCode": res.statusCode
              
          })
      }
     
      
  }


  const deleteQuestion=(req, res) =>{

    res.send("Hello Delete Questions Home Page")
}


 
module.exports ={
    getAllQuestion,
    deleteQuestion
    
}