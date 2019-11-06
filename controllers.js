var urlModel = require('./model.js');
var validURL = require('valid-url');
//if (validUrl.isUri(suspect)){
module.exports = {
  postURLHandler: function(req, res){
   // res.redirect('https://translate.google.com.vn/');
    if (validURL.isUri(req.body.url)){
        console.log('valid');
        urlModel.findOne({originURL: req.body.url},(err, url) => {
            if (url) {
                console.log('existing url');
                res.json({origin_url: url.originURL, short_url: url.shortURLId});
            }
            else {
                function saveURL(){
                    let possible = 'abcdefghijklmnopqrstvuwxyz0123456789';
                    let URLId = '';
                    for (let i = 0; i < 6; i++){
                                URLId += possible[Math.floor(Math.random() * possible.length)];
                            }
                    urlModel.findOne({shortURLId:URLId},(err, urlid) => {
                        if  (urlid){
                                    saveURL();
                                }
                        else {
                                let newUrl = new urlModel({
                                        originURL: req.body.url,
                                        shortURLId: URLId
                                    });
                                newUrl.save((err) => {
                                    if(err){ res.json(err)}
                                    else {
                                    res.json({origin_url: newUrl.originURL, short_url: newUrl.shortURLId});
                                    }
                                })
                            }
                        })
                    } 
        
                saveURL();
            }
        })
        
    }
    else {
        res.json({error:"invalid URL"});
    }
},

  getURLHandler: function(req, res){
    urlModel.findOne({shortURLId: req.params.urlid}, (err, url) => {
      if (url) {
        res.redirect(url.originURL)
      }
    })
    
  }
}
