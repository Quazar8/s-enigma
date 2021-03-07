const keywordDOM = document.getElementById('keyword')
const original = document.getElementById('original')
const originalEncrypted = document.getElementById('original-encrypted')
const scrambled = document.getElementById('scrambled')
const decrypted = document.getElementById('decrypted')

const isLetter = (c) => /[a-zA-Z]/.test(c)

original.oninput = (e) => {
    const keyword = keywordDOM.innerText
    if (!keyword) {
        return
    }

    const text = original.innerText
    let result = ''
    for (let i = 0; i < text.length; i++) {
        let char = text[i]
        if (isLetter(char)) {
            console.log(char)
        }
    }

    originalEncrypted.innerText = result
}