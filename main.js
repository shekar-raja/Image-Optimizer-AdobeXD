const application = require("application");
const fs = require("uxp").storage.localFileSystem;
const ImageFill = require("scenegraph").ImageFill;
const command = require("commands");

// Main Handler Function
async function myPluginCommand(selection) 
{   
    const pluginFolder = await fs.getTemporaryFolder()    
    
    const file = await pluginFolder.createFile("compressed.jpg", { overwrite: true });
    
    const renditions = [{
        node: selection.items[0],
        outputFile: file,
        type: "jpg",
        scale: 1.0,
        quality:50
    }];

    if (selection.items.length > 0) {
        try
        {
            const compressed_image = await pluginFolder.getEntry("compressed.jpg");
            if(compressed_image.name == "compressed_image")
            {
                await compressed_image.delete();
                console.log("Deleted the previous image from directory");
            }
        }
        catch(err)
        {
            console.log("Error in deleting the file");
        }

        application.createRenditions(renditions)
            .then(results => {
                
                // // create the dialog
                // let dialog = document.createElement("dialog");

                // // main container
                // let container = document.createElement("div");
                // container.style.minWidth = 400;
                // container.style.padding = 60;

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
            
            const imagefile = await pluginFolder.getEntry("compressed.jpg");
            console.log(imagefile.name);
            try{
                if(imagefile.name == file.name)
                {
                let fill = new ImageFill(file);

                selection.items[0].fill = fill;
                }
                else
                {
                    console.log("Error filling the image");
                }
            }catch(Error)
            {
                console.log(Error);
            }
        
            
    }   
}


// Exporting modules via JSON.
module.exports = {
    commands: {
        myPluginCommand: myPluginCommand
    }
};