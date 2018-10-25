// Requiring Application api 
const application = require("application");

// Requiring FileSystem api
const fs = require("uxp").storage.localFileSystem;

// Requiring scenegraph.imagefill api
const ImageFill = require("scenegraph").ImageFill;

// Requiring commands api
const command = require("commands");

// Main Handler Function
async function myPluginCommand(selection) 
{
    // const pluginFolder = await fs.getDataFolder();
   
    const pluginFolder = await fs.getPluginFolder();
    // const entries = await pluginFolder.getEntries();
    if (selection.items.length > 0) {

        
        // Creating a temp file to store the result.
        const file = await pluginFolder.createFile("compressed.jpg",{ overwrite: true});
        
        if(file.isEntry)
        {
            file.delete();
        }
        //await file.delete();
        const renditions = [{
            node: selection.items[0],
            outputFile: file,
            type: "jpg",
            scale: 1.0,
            quality:50
        }];
        

        application.createRenditions(renditions)
            .then(results => {
                
                // // create the dialog
                // let dialog = document.createElement("dialog");

                // // main container
                // let container = document.createElement("div");
                // // container.style.minWidth = 400;
                // // container.style.padding = 60;

                // // add content
                // let title = document.createElement("h2");
                // title.style.padding = 20;
                // title.textContent = `Compress Now worked!`;
                // container.appendChild(title);

                // // close button
                // let closeButton = document.createElement("button");
                // closeButton.textContent = "Got it!";
                // closeButton.style.padding = 20;
                // container.appendChild(closeButton);
                // closeButton.onclick = (e) => {
                //     dialog.close();
                // }

                // document.body.appendChild(dialog);
                // dialog.appendChild(container);
                // dialog.showModal()
                
            })
            .catch(error => {
                console.log(error);
            })
           
           
            
            // const entry  = await pluginFolder.getEntry("compressed.jpg");

            let fill = new ImageFill(file);

            selection.items[0].fill = fill;

            // await file.delete();
            // // entries.forEach(entry => console.log(entry.name));
            // let fill = new ImageFill(entrys);

            // selection.items[0].fill = fill;

            // file.delete();
    }
    
}

function base64ArrayBuffer(arrayBuffer) {
    var base64    = ''
    var encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
  
    var bytes         = new Uint8Array(arrayBuffer)
    var byteLength    = bytes.byteLength
    var byteRemainder = byteLength % 3
    var mainLength    = byteLength - byteRemainder
  
    var a, b, c, d
    var chunk
  
    // Main loop deals with bytes in chunks of 3
    for (var i = 0; i < mainLength; i = i + 3) {
      // Combine the three bytes into a single integer
      chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2]
  
      // Use bitmasks to extract 6-bit segments from the triplet
      a = (chunk & 16515072) >> 18 // 16515072 = (2^6 - 1) << 18
      b = (chunk & 258048)   >> 12 // 258048   = (2^6 - 1) << 12
      c = (chunk & 4032)     >>  6 // 4032     = (2^6 - 1) << 6
      d = chunk & 63               // 63       = 2^6 - 1
  
      // Convert the raw binary segments to the appropriate ASCII encoding
      base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d]
    }
  
    // Deal with the remaining bytes and padding
    if (byteRemainder == 1) {
      chunk = bytes[mainLength]
  
      a = (chunk & 252) >> 2 // 252 = (2^6 - 1) << 2
  
      // Set the 4 least significant bits to zero
      b = (chunk & 3)   << 4 // 3   = 2^2 - 1
  
      base64 += encodings[a] + encodings[b] + '=='
    } else if (byteRemainder == 2) {
      chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1]
  
      a = (chunk & 64512) >> 10 // 64512 = (2^6 - 1) << 10
      b = (chunk & 1008)  >>  4 // 1008  = (2^6 - 1) << 4
  
      // Set the 2 least significant bits to zero
      c = (chunk & 15)    <<  2 // 15    = 2^4 - 1
  
      base64 += encodings[a] + encodings[b] + encodings[c] + '='
    }
    
    return base64
  }

// Exporting modules via JSON.
module.exports = {
    commands: {
        myPluginCommand: myPluginCommand
    }
};