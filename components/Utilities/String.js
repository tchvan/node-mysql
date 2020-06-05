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

    static slug(title) {
        title = title
            .toLowerCase()
            .replace(/ /g, "-")
            .replace(/(\"|\')/g, "-")
            .replace(/(\?|\.|!|,|:|;)/g, "-")
        title = ASCIIFolder.foldReplacing(title)
        return title
    }

    static fillZero(number, maxCount = 3) {
        return ("0000000000" + number).substr(-maxCount)
    }
}

module.exports = UtilString