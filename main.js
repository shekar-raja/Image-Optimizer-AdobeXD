const application = require("application");
const fs = require("uxp").storage.localFileSystem;
const ImageFill = require("scenegraph").ImageFill;
const command = require("commands");

// Main Handler Function
async function myPluginCommand(selection) 
{   
    const pluginFolder = await fs.getTemporaryFolder();
    // Creating temporary file
    const file = await pluginFolder.createFile('compressed.jpg', { overwrite: true });
        
    // Creating renditions
    const renditions = [{
        node: selection.items[0],
        outputFile: file,
        type: "jpg",
        scale: 1.0,
        quality:50
    }];

    // User should select atleast one node.
    if (selection.items.length > 0) 
    {
        // for(var i=1; i < 4;i++)
        // {
            // if( i === 1 )
            // {
                // Creating rendition
                application.createRenditions(renditions)
                    .then(results => {
                        
                        // // create the dialog
                        // let dialog = document.createElement("dialog");

                        // // main container
                        // let container = document.createElement("div");
                        // container.style.minWidth = 400;
                        // container.style.padding = 60;

                        // // add conten
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
                        console.log("Image Created");
                        
                    })
                    .catch(error => {
                    })
            // }   
            
            // else if( i === 2)
            // {
                let fill = new ImageFill(file);
                selection.items[0].fill = fill;
            // }
            // else if(i ===2 )
            // {
                // Checking the entry
                try
                {
                    const imageentry = await pluginFolder.getEntry("compressed.jpg");
                    console.log("Found compressed image entry");
                }
                catch(Error)
                {
                    console.log("No compressed image entry found");
                }

                // Deleting temporary file
                try
                {
                    const imageentry = await pluginFolder.getEntry("compressed.jpg");
                    if(imageentry.name == "compressed.jpg")
                    {
                        await imageentry.delete();
                        console.log("Deleted temporary storage!");
                    }
                    else
                    {
                        console.log("No file found");
                    }
                }
                catch(Error)
                {
                    console.log("Can't delete image");
                }
            // }   
        // }     
    }
}

// Exporting modules via JSON.
module.exports = {
    commands: {
        myPluginCommand: myPluginCommand
    }
};
