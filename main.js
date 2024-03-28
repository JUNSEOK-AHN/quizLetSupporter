const textArea = document.querySelector('#textArea');
const btn = document.querySelector("#btn");
const textDiv = document.querySelector("#textDiv");
const generateBtn = document.querySelector('#generateBtn');
/*
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
*/
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
    /*
    const sentenceLength = sentence.length;
    const lastWord = sentence.charAt(sentenceLength - 1)

    if (lastWord === '.') {
      const x = sentence.replaceAll(".", " .");
      tempArrayBox2.push(x);
    } else {
      tempArrayBox2.push(sentence);
    };
    */
  });


  let tempArrayBox3 = [];


  // // // // // // // 

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
      word.classList.toggle('selected');
      
      let wordDataOrder = word.getAttribute("data-order");
      let wordTerm = word.textContent;

      const allTermSpans = [...document.getElementsByClassName("term")];

      allTermSpans.forEach(span => { 
        const termDataOrder = span.getAttribute("data-order");
        if (wordDataOrder === termDataOrder) {
          span.setAttribute("data-term", wordTerm);
        }
      })

    })
  });
});
/*
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
*/
generateBtn.addEventListener('click', () => {
  const selectedWord = document.getElementsByClassName('selected');

  [...selectedWord].forEach(elem => {
    elem.textContent = "_____"
  });

  const terms = document.getElementsByClassName('term');

  [...terms].forEach(elem => {
    let term = elem.getAttribute('data-term');
    // let replacedTerm = term.replaceAll(/[`~!@#$%^&*()_|+\=?;:'",.<>\{\}\[\]\\\/]/gi, "");
    elem.textContent = term;
    // elem.textContent = replacedTerm;
  });
})


