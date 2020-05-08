'use strict'

const ASCIIFolder = require("fold-to-ascii")

class UtilString {
    static escStr(str) {
        return str
            .replace(/\'/g, "’")

            .replace(/\"$/g, "”")
            .replace(/\" /g, "” ")
            .replace(/\"\./g, "”.")
            .replace(/\"!/g, "”!")
            .replace(/\"\?/g, "”?")
            .replace(/\",/g, "”,")
            .replace(/\":/g, "”:")
            .replace(/\";/g, "”;")

            .replace(/^\"/g, "“")
            .replace(/ \"/g, " “")
            .replace(/\.\"/g, ".“")
            .replace(/!\"/g, "!“")
            .replace(/\?\"/g, "?“")
            .replace(/,\"/g, ",“")
            .replace(/:\"/g, ":“")
            .replace(/;\"/g, ";“")

            //Cover the rest if doesn;t get caught
            .replace(/\"/g, "”")
    }

    /**
     * 
     * @param {string} title 
     */
    static slug(title) {
        title = title
            .toLowerCase()
            .replace(/ /g, "-")
            .replace(/(\"|\')/g, "-")
            .replace(/(\?|\.|!|,|:|;)/g, "-")
        title = ASCIIFolder.foldReplacing(title)
        return title
    }

    
}

module.exports = UtilString