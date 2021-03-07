const keywordDOM = document.getElementById('keyword')
const originalDOM = document.getElementById('original')
const originalEncryptedDOM = document.getElementById('original-encrypted')
const scrambledDOM = document.getElementById('scrambled')
const decryptedDOM = document.getElementById('decrypted')

const isLetter = (c) => /[a-zA-Z]/.test(c)

const encrypt = (c, i) => {
    const upper = c.toUpperCase()
    const cCode = upper.charCodeAt(0)
    const keyword = keywordDOM.innerText.
        replace(/\s/g, '').toUpperCase()

    const keyCode = keyword.charCodeAt(i % keyword.length)
    const encCode = 65 + (keyCode + cCode - 129) % 26 
    return String.fromCharCode(encCode)
}

originalDOM.oninput = (e) => {
    const keyword = keywordDOM.innerText
    if (!keyword) {
        return
    }

    const text = originalDOM.innerText
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

    originalEncryptedDOM.innerText = result
}

