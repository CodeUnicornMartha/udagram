import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';
import { pathToFileURL } from 'url';
import { runInNewContext } from 'vm';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // Elastic Beanstalk URL - 
  // http://udagramsplitthoffdev.us-east-2.elasticbeanstalk.com/filteredimage?image_url=https://timedotcom.files.wordpress.com/2019/03/kitten-report.jpg
  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // https://stackoverflow.com/questions/4783924/validating-url-query-string-in-node-js
  // https://hub.udacity.com/rooms/community:nd9990:840125-project-606/community:thread-10421493297-1227644?contextType=room
  // https://expressjs.com/en/api.html#res.sendFile
  // https://stackoverflow.com/questions/14417592/node-js-difference-between-req-query-and-req-params
  // https://basarat.gitbooks.io/typescript/docs/promise.html
  // https://stackoverflow.com/questions/37675331/using-res-send-for-sending-the-response-in-nodejs
  // https://wanago.io/2018/12/03/typescript-express-tutorial-routing-controllers-middleware/
  app.get( "/filteredimage", (req, res) => {
  
    // ?image_url=
    let { image_url } = req.query;

    // 1. validate the image_url query
    console.log(image_url);
    if (image_url)  {

   //  2. call filterImageFromURL(image_url) to filter the image
   // https://basarat.gitbooks.io/typescript/docs/promise.html
   // https://expressjs.com/en/api.html#res.sendFile

      const filteredimagePromise = filterImageFromURL(image_url);
      
      // then as promise syntax
      filteredimagePromise.then((filteredpath : string) => {
        // send the resulting file in the response
        res.status(200)
          .sendFile( filteredpath, function(error) {
            if(error) {
              res.status(400)
                 .send("Error, sending the file!");
            }
            // putting the path into an Array
            // deletes any files on the server on finish of the response
            else {
              deleteLocalFiles([filteredpath]);
            }
          });
    
      });

    }
    else {
      res.status(400)
        .send("Error, please provide an image_url!");
    }
  } );
  

  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  /*
  Validate image_url is basically checking if the image_url is provided in the query parameter. 
  If the request does not have any image_url in the query than you code should return error response.
  */

  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();