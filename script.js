const thead = document.getElementById("table-heading-row");
const tbody = document.getElementById("table-body");


const columns = 26;
const rows = 100;
let currCel;
let cutValue = {};

const boldBtn = document.getElementById("bold-btn");
const italicsBtn = document.getElementById("italics-btn");
const underlineBtn = document.getElementById("underline-btn");

const textColor = document.getElementById("text-color");
const bgColor = document.getElementById("bg-color");

const leftAlign = document.getElementById("left-align");
const rightAlign = document.getElementById("right-align");
const centerAlign = document.getElementById("center-align");

const fontSize = document.getElementById("font-size");
const fontFamily = document.getElementById("font-family");

const cutBtn = document.getElementById("cut-btn");
const copyBtn = document.getElementById("copy-btn");
const pasteBtn = document.getElementById("paste-btn");

for(let column = 0; column < columns; column++){
    var th = document.createElement("th");
    th.innerText = String.fromCharCode(65 + column);
    thead.appendChild(th);
}

for(let row = 0 ; row < rows; row++){
    var tr = document.createElement("tr");
    var th = document.createElement("th");
    th.innerText = row + 1;
    tr.appendChild(th);
    for(let col = 0; col < columns; col++){
        let td = document.createElement("td");
        td.setAttribute("contenteditable", "true");
        td.setAttribute("spellcheck", "false");
        td.setAttribute("id", `${String.fromCharCode(65 + col)}${row + 1}`);
        td.addEventListener("focus", (event) => onFocusFnc(event));
        tr.appendChild(td);
    }
    //append the row into body
    tbody.appendChild(tr);
}

function onFocusFnc(event){
    console.log("In focus:", event.target);
    currCel = event.target;
    document.getElementById("current-cell").innerText = event.target.id;
}


//event listeners for button
boldBtn.addEventListener("click", () => {
    if(currCel.style.fontWeight == "bold"){
        currCel.style.fontWeight = "normal";
    }else{
        currCel.style.fontWeight = "bold";
    }
});

italicsBtn.addEventListener("click", () => {
    if(currCel.style.fontStyle == "italic"){
        currCel.style.fontStyle = "normal";
    }else{
        currCel.style.fontStyle = "italic";
    }
});

underlineBtn.addEventListener("click", () => {
    if(currCel.style.textDecoration == "underline"){
        currCel.style.textDecoration = null;
    }else{
        currCel.style.textDecoration = "underline";
    }
});


bgColor.addEventListener("change", () => {
    currCel.style.backgroundColor = bgColor.value;
})

textColor.addEventListener("change", () => {
    currCel.style.color = textColor.value;
})


leftAlign.addEventListener("click", () => {
    currCel.style.textAlign = "left";
});
rightAlign.addEventListener("click", () => {
    currCel.style.textAlign = "right";
});
centerAlign.addEventListener("click", () => {
    currCel.style.textAlign = "center";
});

fontSize.addEventListener("change", () => {
    currCel.style.fontSize = fontSize.value;
});

fontFamily.addEventListener("change", () => {
    currCel.style.fontFamily = fontFamily.value;
});

cutBtn.addEventListener("click", () =>{
    cutValue = {
        style: currCel.style.cssText,
        text: currCel.innerText
    };
    currCel.style = null;
    currCel.innerText = null;
});

copyBtn.addEventListener("click", () =>{
    cutValue = {
        style: currCel.style.cssText,
        text: currCel.innerText
    };
});

pasteBtn.addEventListener("click", () =>{
    currCel.style.cssText = cutValue.style;
    currCel.innerText = cutValue.text;
});