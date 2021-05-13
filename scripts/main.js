const paragraph = `I love teaching, inspiring, and motivating people. I love to teach JavaScript, Python and React. If you do not love teaching what else can you love. I love Python but I think most of the time in JavaScript. Do you think in Python or JavaScript? If you do not love something that can give you all the capabilities to develop an application what else can you love.`

const findMostFreqWords = (txt = paragraph) => {
    const freqTable = {}
    const arr =[]
    const words = txt.replace(/[^\w\d\s]/g, '').toLowerCase().split(' ')

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
const content = document.querySelector('#content')
const result = document.querySelector('#result')
const generateBtn = document.querySelector('#generate')
const table = document.createElement('table')
const tbody = document.createElement('tbody')
const thead = document.createElement('thead')


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

const createTable = (txt) => {
    result.innerHTML = ''
    let head = `<tr>
    <th>Word</th>
    <th>Word Count</th>
    </tr>`
    thead.innerHTML = head
    tbody.innerHTML = createTableRows(findMostFreqWords(txt))
    table.appendChild(thead)
    table.appendChild(tbody)
    result.appendChild(table)
    content.textContent = txt
}

createTable(paragraph)
    
generateBtn.addEventListener('click', (e) => {
   if(content.value.length > 0){
   createTable(content.value)

   } else {
    result.innerHTML = '<p style="color:red;">Please, copy and past text on the textarea.</p>'
   }
})
