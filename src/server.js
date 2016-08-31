import Hapi from 'hapi';
import request from 'request';

const server = new Hapi.Server();

server.connection( {
    port: 3000
});

server.route({

    method: 'GET',
    path: '/hello',
    handler: ( request, reply ) => {
      printPublicGists();
      reply( 'Hello World!' );
    }

});

// promise returning function
function get (url){
  return new Promise(function(resolve, reject){
    request({
      method: 'GET',
      url: url,
      json: true,
      headers: {
        'User-Agent': 'request'
      }
    }, function(err, resp, body){
      if(err){
        reject(err);
      } else {
        resolve(body);
      }
    });
  });
}

// create a new "async" function so we can use the "await" keyword
async function printPublicGists(){
  // "await" resolution or rejection of the promise
  // use try/catch for error handling

  try {
    var gists = await get('https://api.github.com/gists/public');
    // now you can write this like syncronous code!
    gists.forEach(function(gist){
      console.log(gist.description);
    });
  } catch (e) {
    // promise was rejected and we can handle errors with try/catch!
    console.log(e);
  }
}

server.start(err => {

    if (err) {

        // Fancy error handling here
        console.error( 'Error was handled!' );
        console.error( err );

    }

    console.log( `Server started at ${ server.info.uri }` );

});
