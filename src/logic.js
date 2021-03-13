const keywordDOM = document.getElementById('keyword')
const originalDOM = document.getElementById('original')
const originalEncryptedDOM = document.getElementById('original-encrypted')
const scrambledDOM = document.getElementById('scrambled')
const decryptedDOM = document.getElementById('decrypted')
const decryptedContainerDOM = document.getElementById('decrypted-container')
const closeWindowBtn = document.getElementById('close-window-btn')

const isLetter = (c) => /[a-zA-Z]/.test(c)

const createLetterSpan = (letter) => {
    const span = document.createElement('span')
    span.textContent = letter
    if (letter !== ' ') {
        span.className = 'result-letter'
    }

    return span
}

const animateLowerElements = () => {
    let duration = 500
    let easing = 'ease-out'

    let height = originalEncryptedDOM.offsetHeight
    let style = window.getComputedStyle(decryptedDOM)
    height += parseInt(style.getPropertyValue('padding-top'))
    height += parseInt(style.getPropertyValue('padding-bottom'))

    scrambledDOM.animate([
        { transform: `translateY(-${height}px)`},
        { transform: 'translateY(0)'}
    ], {
        duration,
        easing
    })

    decryptedContainerDOM.animate([
        { transform: `translateY(-${height}px)`},
        { transform: 'translateY(0)'}
    ], {
        duration,
        easing
    })

    originalEncryptedDOM.animate([
        { transform: `translateY(-100%)`},
        { transform: 'translateY(0)'}
    ], {
        duration,
        easing
    })
}

const encrypt = (c, i) => {
    const upper = c.toUpperCase()
    const cCode = upper.charCodeAt(0)
    const keyword = keywordDOM.innerText.
        replace(/\s/g, '').toUpperCase()

    const keyCode = keyword.charCodeAt(i % keyword.length)
    const encCode = 65 + (keyCode + cCode - 129) % 26 
    return String.fromCharCode(encCode)
}

const handleOriginalInput = () => {
    originalEncryptedDOM.style.display = 'none'
    let showInitialAnimation = true

    return () => {
        const keyword = keywordDOM.innerText
        if (!keyword) {
            return
        }

        originalEncryptedDOM.innerHTML = ''
        if (originalDOM.innerText && showInitialAnimation) {
            originalEncryptedDOM.style.display = 'block'
            animateLowerElements()
            showInitialAnimation = false
        } else if (!originalDOM.innerText) {
            originalEncryptedDOM.style.display = 'none'
            showInitialAnimation = true
        }

        const text = originalDOM.innerText
        let keyCounter = 0
        let result = ''
        for (let i = 0; i < text.length - 1; i++) {
            let char = text[i]

            if (isLetter(char)) {        
                char = encrypt(char, keyCounter)
                keyCounter++
            } 

            result += char
        }
        
        let lastChar = text[text.length - 1]
        if (isLetter(lastChar)) {
            lastChar = encrypt(lastChar, keyCounter)
        }

        originalEncryptedDOM.innerText = result
        const span = createLetterSpan(lastChar)
        originalEncryptedDOM.appendChild(span)
    }
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

const animateDecrypted = () => {
    decryptedDOM.animate([
        { transform: `translateY(-100%)`},
        { transform: 'translateY(0)'}
    ], {
        duration: 500,
        easing: 'ease-out'
    })
}

const handleDecryptInput = () => {
    decryptedDOM.style.display = 'none'
    let showInitialAnimation = true

    return () => {
        const keyword = keywordDOM.innerText
        if (!keyword) {
            return
        }

        decryptedDOM.innerHTML = ''
        if (scrambledDOM.innerText && showInitialAnimation) {
            decryptedDOM.style.display = 'block'
            animateDecrypted()
            showInitialAnimation = false
        } else if (!scrambledDOM.innerText) {
            decryptedDOM.style.display = 'none'
            showInitialAnimation = true
        }

        const text = scrambledDOM.innerText
        let keyCounter = 0
        let result = ''
        for (let i = 0; i < text.length - 1; i++) {
            let char = text[i]

            if (isLetter(char)) {        
                char = decrypt(char, keyCounter)
                keyCounter++
            } 

            result += char
        }
        
        let lastChar = text[text.length - 1]
        if (isLetter(lastChar)) {
            lastChar = decrypt(lastChar, keyCounter)
        }

        decryptedDOM.innerText = result
        const span = createLetterSpan(lastChar)
        decryptedDOM.appendChild(span)
    }
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
originalDOM.oninput = handleOriginalInput()
scrambledDOM.oninput = handleDecryptInput()

const appendCopiedNotification = (mouseX, mouseY) => {
    let div = document.createElement('div')
    div.className = "copied-notification"
    div.innerText = "Copied!"
    div.style.top = mouseY + 'px'
    div.style.left = mouseX + 10 + 'px'

    div.onanimationend = () => {
        document.body.removeChild(div)
    }

    document.body.appendChild(div)
}

originalEncryptedDOM.onclick = (e) => {
    window.preloaded.copyToClip(originalEncryptedDOM.innerText)
    appendCopiedNotification(e.pageX, e.pageY)
}

closeWindowBtn.onclick = () => {
    window.close()
}

// FOR TESTING
keywordDOM.innerText = 'hot fries'
// originalDOM.innerText = "nice one"
// encryptOriginalText()