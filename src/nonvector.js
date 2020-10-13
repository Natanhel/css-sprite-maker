
const exec = require('child_process').exec
var sizeOf = require('image-size')
const fs = require('fs')

const createCSS = (file, { width, height }, y, ext) => {
    let style = '', selector = file.split('.')[0]

    selector = selector.match(/[0-9]+$/) ? '_' + selector : selector

    style  = '\n.' + selector +'_' + ext + ' {\n'
    style += '\twidth: ' + width + 'px;\n'
    style += '\theight: ' + height + 'px;\n'
    style += '\tbackground-image: url(../img/sprite.' + ext + ');\n'
    style += '\tbackground-position: 0px ' + y + 'px\n'      
    style += '}\n'

    return style
}

exec('dir input',
    async (error, stdout, stderr) => {
        // Error handling
        if (stderr) {
            return console.log('stderr: ' + stderr || error);            
        }
        
        if (error !== null) {
            return console.log('exec error: ' + error);
        }
        // Regular Expression to find the files ending with PNG and GIF extensions
        const re = /([a-z0-9]+.gif|[a-z0-9]+.png)/g
        // Get the files in an array to iterate over
        let files = [...stdout.matchAll(re)].map(e => e[0])
        // Log them
        // console.log('PNG&GIF files in folder \'input\':', files)

        exec('convert ' + files.map(e => './input/' + e).join(' ') + ' -append public/img/sprite.gif')
        exec('convert ' + files.map(e => './input/' + e).join(' ') + ' -append public/img/sprite.png')        
        
        // Delete the style file
        try {
            fs.unlinkSync('public/css/styles.css')
        } catch (error) {
            console.log('No file to delete, creating new file')
        }
        let x=0, y=0;

        files.map((f) => {

            let filename = './input/' + f

            const handleStyle = (err, dimensions) => {

                ['gif', 'png'].forEach(ext => {
                    fs.appendFile('public/css/styles.css', createCSS(f, dimensions, y, ext), (err) => {
                        if (err) throw err;
                        // console.log('Saved', selector)
                    })
                })

                // change y position
                y -= dimensions.height

            }

            sizeOf(filename, handleStyle)            
        })

    })