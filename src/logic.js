const keywordDOM = document.getElementById('keyword')
const originalDOM = document.getElementById('original')
const originalEncryptedDOM = document.getElementById('original-encrypted')
const scrambledDOM = document.getElementById('scrambled')
const decryptedDOM = document.getElementById('decrypted')
const closeWindowBtn = document.getElementById('close-window-btn')

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

const encryptOriginalText = () => {
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

const decrypt = (c, i) => {
    const upper = c.toUpperCase()
    const cCode = upper.charCodeAt(0)
    const keyword = keywordDOM.innerText.
        replace(/\s/g, '').toUpperCase()

    const keyCode = keyword.charCodeAt(i % keyword.length)
    let decCode = 65 + (25 + cCode - keyCode) % 25
    if (cCode > keyCode) {
        decCode--
    }

    return String.fromCharCode(decCode)
}

decryptScrambledText = () => {
    const keyword = keywordDOM.innerText
    if (!keyword) {
        return
    }

    const text = scrambledDOM.innerText
    let result = ''
    let keyCounter = 0
    for (let i = 0; i < text.length; i++) {
        let char = text[i]
        if (isLetter(char)) {
            result += decrypt(char, keyCounter)
            keyCounter++
        } else {
            result += char
        }
    }

    decryptedDOM.innerText = result
}

const keywordChangeHandler = (e) => {
    if (originalDOM.innerText) {
        encryptOriginalText()
    }

    if (scrambledDOM.innerText) {
        decryptScrambledText()
    }
}

keywordDOM.oninput = keywordChangeHandler
originalDOM.oninput = encryptOriginalText
scrambledDOM.oninput = decryptScrambledText

//FOR TESTING
// keywordDOM.innerText = 'hot fries'
// originalDOM.innerText = "choke me"
// encryptOriginalText()

const appendCopiedNotification = (mouseX, mouseY) => {
    let div = document.createElement('div')
    div.className = "copied-notification"
    div.innerText = "Copied!"
    div.style.top = mouseY + 'px'
    div.style.left = mouseX + 10 + 'px'

    div.onanimationend = () => {
        originalEncryptedDOM.removeChild(div)
    }

    originalEncryptedDOM.appendChild(div)
}

originalEncryptedDOM.onclick = (e) => {
    window.preloaded.copyToClip(originalEncryptedDOM.innerText)
    appendCopiedNotification(e.pageX, e.pageY)
}

closeWindowBtn.onclick = () => {
    window.close()
}