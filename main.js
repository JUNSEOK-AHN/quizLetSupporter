const textArea = document.querySelector('#textArea');
const btn = document.querySelector("#btn");
const textDiv = document.querySelector("#textDiv");
const generateBtn = document.querySelector('#generateBtn');
const selectAll = document.querySelector('#selectAll');
const selectAllBtn = document.querySelector('#selectAllBtn');
const addTerm = document.querySelector('#addTerm');
const addTermBtn = document.querySelector('#addTermBtn');

textArea.value = '';
selectAll.value = '';
addTerm.value = '';

textArea.addEventListener('paste', () => {
  if (textArea.value !== '') {
    textArea.value += '\n';
  }
})

btn.addEventListener("click", () => {
  textDiv.innerText = textArea.value;

  const textDivChildNodes = textDiv.childNodes;
  const textDivChildArray = Array.from(textDivChildNodes);

  let tempArrayBox1 = [];
  let tempArrayBox2 = [];

  for (let i = 0; i < textDivChildArray.length; i++) {
    if (i % 2 === 0) {
      tempArrayBox1.push(textDivChildArray[i].textContent);
    }
  };


  tempArrayBox1.forEach((sentence) => {    
    let x = sentence;
    x = x.replaceAll(".", " .");
    x = x.replaceAll(",", " ,");
    x = x.replaceAll("?", " ?");
    x = x.replaceAll("!", " !");
    x = x.replaceAll("'", " ' ");
    x = x.replaceAll('"', ' " ');
    
    tempArrayBox2.push(x);
  });


  let tempArrayBox3 = [];



  for (let i = 0; i < tempArrayBox2.length; i++) {
    let eachWorldArray = tempArrayBox2[i].split(' ');
    let spannedWorldArray = [];

    eachWorldArray.forEach(elem => {
      let spannedWorld = elem.replace(`${elem}`, `<span class="word" data-order="${i}">${elem}</span>`);
      spannedWorldArray.push(spannedWorld);
    });

    let term = `<span class="term" data-term="" data-order="${i}"></span>#`
    spannedWorldArray.splice(0, 0, term);

    let spannedSentence = spannedWorldArray.join(' ');
    tempArrayBox3.push(spannedSentence);
  }

  const colletedSentence = tempArrayBox3.join(`<br>`);

  textDiv.innerHTML = colletedSentence
  let textDivNodeList = textDiv.childNodes;
  textDivNodeList.forEach(elem => {
    if (
      elem.textContent === " " && 
      elem.nextSibling.textContent === ".") {
        textDiv.removeChild(elem);
    } else if (
      elem.textContent === " " && 
      elem.nextSibling.textContent === ",") {
        textDiv.removeChild(elem);
    } else if (
      elem.textContent === " " && 
      elem.nextSibling.textContent === "?") {
        textDiv.removeChild(elem);
    } else if (
      elem.textContent === " " && 
      elem.nextSibling.textContent === "!") {
        textDiv.removeChild(elem);
    } else if (
      elem.textContent === " " && 
      elem.nextSibling.textContent === "'") {
        textDiv.removeChild(elem);
    } else if (
      elem.textContent === " " && 
      elem.previousSibling.textContent === "'") {
        textDiv.removeChild(elem);
    } else if (
      elem.textContent === " " && 
      elem.nextSibling.textContent === '"') {
        textDiv.removeChild(elem);
    } else if (
      elem.textContent === " " && 
      elem.previousSibling.textContent === '"') {
        textDiv.removeChild(elem);
    } 

  });

  const eachWord = document.getElementsByClassName("word");

  [...eachWord].forEach((word) => {
    word.addEventListener('click', () => {
      let wordDataOrder = word.getAttribute("data-order");
      let wordTerm = word.textContent;
      const allTermSpans = [...document.getElementsByClassName("term")];

      if (!word.classList.contains('selected')) {
        word.classList.add('selected');
        allTermSpans.forEach(span => { 
          const termDataOrder = span.getAttribute("data-order");
          if (wordDataOrder === termDataOrder) {
            span.setAttribute("data-term", wordTerm);
          }
        })
      } else {
        word.classList.remove('selected');
        allTermSpans.forEach(span => { 
          const termDataOrder = span.getAttribute("data-order");
          if (wordDataOrder === termDataOrder) {
            span.setAttribute("data-term", "");
          }
        })
      }
      // word.classList.toggle('selected');
    })

  });
});


const generateFx = () => {
  const selectedWord = document.getElementsByClassName('selected');

  [...selectedWord].forEach(elem => {
    elem.textContent = "_____"
  });

  const terms = document.getElementsByClassName('term');

  [...terms].forEach(elem => {
    let term = elem.getAttribute('data-term');
    elem.textContent = term;
  });

  [...terms].forEach(elem => {
    let term = elem.getAttribute('data-term');
    if (term === '') {
      elem.textContent = 'EMPTY'
      elem.classList.add('notSelected');
    } else {
      elem.classList.remove('notSelected')
    }
  })

};


generateBtn.addEventListener('click', () => {
  generateFx();
})

selectAllBtn.addEventListener('click', () => {
  const whichWord = selectAll.value;
  const whichWordArr = whichWord.split(', ');
  const words = document.getElementsByClassName('word');
  
  [...words].forEach((word) => {
    for (let i = 0; i < whichWordArr.length; i++) {
      if (word.textContent.toLowerCase() === whichWordArr[i]) {
        let wordDataOrder = word.getAttribute("data-order");
        let wordTerm = word.textContent;
        const allTermSpans = [...document.getElementsByClassName("term")];
        
        word.classList.add('selected')
        allTermSpans.forEach(span => { 
          const termDataOrder = span.getAttribute("data-order");
          if (wordDataOrder === termDataOrder) {
            span.setAttribute("data-term", wordTerm);
          }
        })
      }
    }
  });
  generateFx();
})


addTermBtn.addEventListener('click', () => {
  const allTermSpans = [...document.getElementsByClassName("term")];
  const additionStr = addTerm.value;

  console.log(allTermSpans);
  console.log(additionStr);

  allTermSpans.forEach(elem => {
    elem.textContent += ` ${additionStr}`;
  });
})
