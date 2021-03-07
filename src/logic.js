const keywordDOM = document.getElementById('keyword')
const original = document.getElementById('original')
const originalEncrypted = document.getElementById('original-encrypted')
const scrambled = document.getElementById('scrambled')
const decrypted = document.getElementById('decrypted')

const isLetter = (c) => /[a-zA-Z]/.test(c)

const encrypt = (c, i) => {
    const upper = c.toUpperCase()
    const cCode = upper.charCodeAt(0)
    const keyword = keywordDOM.innerText.toUpperCase()

    const keyCode = keyword.charCodeAt(i % keyword.length)
    const encCode = 65 + (keyCode + cCode - 129) % 26 
    return String.fromCharCode(encCode)
}

original.oninput = (e) => {
    const keyword = keywordDOM.innerText
    if (!keyword) {
        return
    }

    const text = original.innerText
    let result = ''
    let keyCounter = 0
    for (let i = 0; i < text.length; i++) {
        let char = text[i]
        if (isLetter(char)) {
            result += encrypt(char, keyCounter)
            keyCounter++
        } else {
            result += char
        }
    }

    originalEncrypted.innerText = result
}