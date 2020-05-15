const expect = require('chai').expect;
const Util = require('../../components/Utilities')

module.exports = () => {
    describe('#Test JSON Escapse', () => {
        it('should convert single quote', () => {
            let result = Util.String.escStr("I'm good")
            expect(result).to.equal('I’m good')
        });

        it('should convert double quote - start of line', ()=>{
            let result = Util.String.escStr('"Hello')
            expect(result).to.equal("“Hello")
        })
        it('should convert double quote - start after space', ()=>{
            let result = Util.String.escStr(' "Hello')
            expect(result).to.equal(" “Hello")
        })
        it('should convert double quote - start after period', ()=>{
            let result = Util.String.escStr('."Hello')
            expect(result).to.equal(".“Hello")
        })
        it('should convert double quote - start after question', ()=>{
            let result = Util.String.escStr('?"Hello')
            expect(result).to.equal("?“Hello")
        })
        it('should convert double quote - start after exlam', ()=>{
            let result = Util.String.escStr('!"Hello')
            expect(result).to.equal("!“Hello")
        })
        it('should convert double quote - start after comma', ()=>{
            let result = Util.String.escStr(',"Hello')
            expect(result).to.equal(",“Hello")
        })
        it('should convert double quote - start after colon', ()=>{
            let result = Util.String.escStr(':"Hello')
            expect(result).to.equal(":“Hello")
        })
        it('should convert double quote - start after semicolon', ()=>{
            let result = Util.String.escStr(';"Hello')
            expect(result).to.equal(";“Hello")
        })


        it('should convert double quote - end of line', ()=>{
            let result = Util.String.escStr('Hello"')
            expect(result).to.equal("Hello”")
        })
        it('should convert double quote - end before space', ()=>{
            let result = Util.String.escStr('Hello" ')
            expect(result).to.equal("Hello” ")
        })
        it('should convert double quote - end before period', ()=>{
            let result = Util.String.escStr('Hello".')
            expect(result).to.equal("Hello”.")
        })
        it('should convert double quote - end before question', ()=>{
            let result = Util.String.escStr('Hello"?')
            expect(result).to.equal("Hello”?")
        })
        it('should convert double quote - end before exlam', ()=>{
            let result = Util.String.escStr('Hello"!')
            expect(result).to.equal("Hello”!")
        })
        it('should convert double quote - end before comma', ()=>{
            let result = Util.String.escStr('Hello",')
            expect(result).to.equal("Hello”,")
        })
        it('should convert double quote - end before colon', ()=>{
            let result = Util.String.escStr('Hello":')
            expect(result).to.equal("Hello”:")
        })
        it('should convert double quote - end before semicolon', ()=>{
            let result = Util.String.escStr('Hello";')
            expect(result).to.equal("Hello”;")
        })

        it('should convert double quote - standalone', ()=>{
            let result = Util.String.escStr(' " ')
            expect(result).to.equal(" ” ")
        })
        it('should convert double quote - in between', ()=>{
            let result = Util.String.escStr('a"a')
            expect(result).to.equal("a”a")
        })

        
    })

    describe('#Test Slugify', () => {
        it('should convert uppercase', () => {
            let result = Util.String.slug("iPhone")
            expect(result).to.equal('iphone')
        });
        it('should convert space', () => {
            let result = Util.String.slug("I am good")
            expect(result).to.equal('i-am-good')
        });
        it('should remove quote', () => {
            let result = Util.String.slug("I'am in a \"good\" condition")
            expect(result).to.equal('i-am-in-a--good--condition')
        });
        it('should remove punctuation', () => {
            let result = Util.String.slug("too tired, please go! why? how: no; yes.")
            expect(result).to.equal('too-tired--please-go--why--how--no--yes-')
        });
        
        it('should do unicode folding', () => {
            let result = Util.String.slug("chào các bạn, mời các bạn ngồi")
            expect(result).to.equal('chao-cac-ban--moi-cac-ban-ngoi')
        });

    })
}