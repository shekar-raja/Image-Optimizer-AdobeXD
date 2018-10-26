const application = require("application");
const fs = require("uxp").storage.localFileSystem;
const ImageFill = require("scenegraph").ImageFill;
const command = require("commands");

// Main Handler Function
async function myPluginCommand(selection) 
{   
    const pluginFolder = await fs.getTemporaryFolder()    

    if (selection.items.length > 0) 
    {
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
        try{
        const imageentry = await pluginFolder.getEntry("compressed.jpg");
        }catch(Error)
        {
            console.log(Error);
        }
        try{
            const imageentry = await pluginFolder.getEntry("compressed.jpg");
        if(imageentry.name == "compressed.jpg"){

            await imageentry.delete();
            console.log("Deleted temporary storage!");
        }
        else
        {
            console.log("No file found");
        }
        }catch(Error)
        {
            console.log(Error);
        }
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
        
        let fill = new ImageFill(file);
        selection.items[0].fill = fil;
        // filler(file,selection.items[0])
        
        // Deleting the temporarily stored image.
        
    }
}

function filler(file,node)
{
    let fill = new ImageFill(file);

    node.fill = fill;
}

// Exporting modules via JSON.
module.exports = {
    commands: {
        myPluginCommand: myPluginCommand
    }
};