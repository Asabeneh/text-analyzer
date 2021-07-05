/*
GLOBAL VARIABLES
*/
const content = document.querySelector('#content')
const result = document.querySelector('#result')
const generateBtn = document.querySelector('#generate')
const table = document.createElement('table')
const tbody = document.createElement('tbody')
const thead = document.createElement('thead')
const summary = document.getElementById('summary')
const select = document.querySelector('select')
const checkbox = document.querySelector('#stopwords')
let removingStopWords = null

checkbox.addEventListener('click',(e) => {
    removingStopWords = e.target.checked 
})

/*
*** SAMPLE TEXT ***
*/
const paragraph = `I love teaching, inspiring, and motivating people. I love to teach JavaScript, Python and React. If you do not love teaching what else can you love. I love Python but I think most of the time in JavaScript. Do you think in Python or JavaScript? If you do not love something that can give you all the capabilities to develop an application what else can you love.`

/*
*** word_tokenize function clean the text and changes to array of words ***
*/
const tokenizeWord = (txt) => {
    const words = txt.replace(/[^\w\d\s_-]/g, ' ').toLowerCase().split(' ').filter((word) => word.length >= 1 && word!=='-')
    return words
}

/*
***
Removing less important words
***
*/
const tokenizeWordWithoutStopWords = (text) => {
    console.log(stopWords)
    return tokenizeWord(text).filter((word) => stopWords.indexOf(word) == -1)
}

/*
*** The changeToCharacters function cleans the text and return alpha characters***
*/
const changeToCharacters = (txt) => {
    const characters = txt.replace(/[^\w\d]/g, '').toLowerCase()
    return characters
}

/*
*** The createFreqTable returns a sorted array of objects with the most frequent first. ***
*/
const createFreqTable = (txt = paragraph) => {
    const freqTable = {}
    const arr =[]
    console.log(removingStopWords)
    const words = removingStopWords ? tokenizeWordWithoutStopWords(txt):  tokenizeWord(txt)
    for(const word of words){
        if(freqTable[word]){
            freqTable[word] += 1
        } else {
            freqTable[word] = 1
        }  
    }
    for (const key in freqTable){
        arr.push({word:key, count:freqTable[key]})
    }
    // copying the array and sorting
   const sortedArr = arr.slice().sort((a, b) => {
    if (a.count < b.count) return 1;
    if (a.count > b.count) return -1;
    return 0;
    })
    return sortedArr
}

/*
*** Create Table Rows ***
*/
const createTableRows = (arr) => {
    let rows = ''
    for(const {word, count} of arr){
        rows += `<tr>
        <td>${word}</td>
        <td>${count}</td>
        </tr>`
    }
    return rows
}

/*
*** Create Table  ***
*/
const createTable = (txt) => {
    result.innerHTML = ''
    let head = `<tr>
    <th>Word</th>
    <th>Word Count</th>
    </tr>`
    thead.innerHTML = head
    tbody.innerHTML = createTableRows(createFreqTable(txt))
    table.appendChild(thead)
    table.appendChild(tbody)
    result.appendChild(table)
    content.textContent = txt
}


/*
*** Generate summary  ***
*/
const generateSummary = (txt) => {
    const freqTable = createFreqTable(txt)
    const words = removingStopWords ? tokenizeWordWithoutStopWords(txt):  tokenizeWord(txt)
    const characters = changeToCharacters(txt)
    const lexicalDensity = txt.length > 0 ? (freqTable.length * 100 ) / words.length : 0

    return (`<h3>Text Analysis Summary</h3>
    <p>Total number of words: <em>${words.length.toLocaleString()}</em></p>
    <p>Number of characters: <em>${characters.length.toLocaleString()}</em></p>
    <p>The most frequent word: <em>${Object.keys(freqTable).length > 0 ? freqTable[0].word: 0}</em></p>
    <p>The word variety(lexical density): <em>${lexicalDensity.toFixed(2)}%</em></p>
    `)
}

/*
*** Inserting the generated summary  ***
*/
summary.innerHTML = generateSummary(paragraph)
createTable(paragraph) // creating the table on the DOM
   
// Handling onclick event to generate summary and table
generateBtn.addEventListener('click', (e) => {
   if(content.value.length > 0){
summary.innerHTML = generateSummary(content.value)
   createTable(content.value)
   } else {
    result.innerHTML = '<p style="color:red;">Please, copy and past text on the textarea.</p>'
    summary.innerHTML = generateSummary('')
   }
})

// Handling onchange event to generate summary and table
content.addEventListener('change', (e) => {
    summary.innerHTML = generateSummary(content.value)
    createTable(content.value)
})

select.addEventListener('change', async (e) => {
    let value = e.currentTarget.value
    let fileName = `https://asabeneh.github.io/text-analyzer/data/${value}.txt`
    let response = await fetch(fileName)
    let text = await response.text()
    let lines = text.split('\n').map((line) => line.trim())
    content.textContent = text
    summary.innerHTML = generateSummary(lines.join())
    createTable(lines.join())
})

if(removingStopWords){   
    checkbox.addEventListener('click', (e) => {
    summary.innerHTML = generateSummary(paragraph)
    createTable(paragraph)
})
}






    





