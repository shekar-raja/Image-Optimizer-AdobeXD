// Requiring API's
const application = require("application");
const fs = require("uxp").storage.localFileSystem;
const ImageFill = require("scenegraph").ImageFill;
const command = require("commands");
const { alert, error } = require("./lib/dialogs.js");
// Iterating two times for making rendered image into fill.
for(let i=0;i<2;i++)
{
// Main Handler Function
async function mainFunction(selection) 
{   
        // Temorary folder 
        const tempFolder = await fs.getTemporaryFolder();
        // Creating temporary file
        const file = await tempFolder.createFile('compressed.jpg', { overwrite: true });
            
        // Creating renditions
        const renditions = [{
            node: selection.items[0],
            outputFile: file,
            type: "jpg",
            scale: 1.0,
            quality:60
        }];
        
        // User should select atleast one node.
        if (selection.items.length > 0) 
        {
            
            // Creating rendition
            await application.createRenditions(renditions)
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
                    console.log("File creation error");
                })
            
            // Image filling to the selection try
            try{
                let fill = new ImageFill(file);
                
                selection.items[0].fill = fill;
                
                showAlert();
            }
            catch(Error)
            {
                console.log("Image not compressed and filled")
                showError();
            }    

            // Try block for checking if there image entry
            // If exists deletes the temp image entry
            try
            {
                const imageentry = await tempFolder.getEntry("compressed.jpg");
                if(imageentry.name == "compressed.jpg")
                {
                    await imageentry.delete();
                    console.log("Deleted temporary storage!");
                }
                else
                {
                    // UI to print Select image file to compress
                    showError();
                }
            }
            catch(Error)
            {
                showError();
                // console.log("Can't delete image");
            }
                
        }
        else
        {
            error();
        }
    
    
}

// Function for showing alert
async function showAlert()
{
    await alert("Image Compression Successful!");
}

// Asynchronous Function to show error
async function showError()
{
    await error("Error in compression",
                "Please select a image file to perform compression");
}

// Exporting modules via JSON.
module.exports = {
    commands: {
        myPluginCommand: mainFunction
        
    }
};
}