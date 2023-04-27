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

//created a matrix so that we can update the every cell element data into the matrix
let matrix = new Array(rows);
let numSheets = 1;
let arrMatrix = [matrix];
let currSheetNum = 1;

for (let i = 0; i < rows; i++) {
    matrix[i] = new Array(columns);
    for (let j = 0; j < columns; j++) {
        matrix[i][j] = {};
    }
}

console.log("Matrix", matrix)

for (let column = 0; column < columns; column++) {
    var th = document.createElement("th");
    th.innerText = String.fromCharCode(65 + column);
    thead.appendChild(th);
}

for (let row = 0; row < rows; row++) {
    var tr = document.createElement("tr");
    var th = document.createElement("th");
    th.innerText = row + 1;
    tr.appendChild(th);
    for (let col = 0; col < columns; col++) {
        let td = document.createElement("td");
        td.setAttribute("contenteditable", "true");
        td.setAttribute("spellcheck", "false");
        td.setAttribute("id", `${String.fromCharCode(65 + col)}${row + 1}`);
        td.addEventListener("focus", (event) => onFocusFnc(event));
        td.addEventListener("input", (event) => onInputFnc(event));
        tr.appendChild(td);
    }
    //append the row into body
    tbody.appendChild(tr);
}
function onInputFnc(event) {
    // console.log("on input:", event.target);
    updateJson(event.target);
}

function onFocusFnc(event) {
    console.log("In focus:", event.target);
    currCel = event.target;
    document.getElementById("current-cell").innerText = event.target.id;
    // console.log(currCel.style.cssText);
    // console.log(currCel.innerText);
    // console.log(currCel.id);
}


//event listeners for button
boldBtn.addEventListener("click", () => {
    if (currCel.style.fontWeight == "bold") {
        currCel.style.fontWeight = "normal";
    } else {
        currCel.style.fontWeight = "bold";
    }
    updateJson(currCel);
});

italicsBtn.addEventListener("click", () => {
    if (currCel.style.fontStyle == "italic") {
        currCel.style.fontStyle = "normal";
    } else {
        currCel.style.fontStyle = "italic";
    }
    updateJson(currCel);
});

underlineBtn.addEventListener("click", () => {
    if (currCel.style.textDecoration == "underline") {
        currCel.style.textDecoration = null;
    } else {
        currCel.style.textDecoration = "underline";
    }
    updateJson(currCel);
});


bgColor.addEventListener("input", () => {
    currCel.style.backgroundColor = bgColor.value;
    updateJson(currCel);
})

textColor.addEventListener("input", () => {
    currCel.style.color = textColor.value;
    updateJson(currCel);
})


leftAlign.addEventListener("click", () => {
    currCel.style.textAlign = "left";
    updateJson(currCel);
});
rightAlign.addEventListener("click", () => {
    currCel.style.textAlign = "right";
    updateJson(currCel);
});
centerAlign.addEventListener("click", () => {
    currCel.style.textAlign = "center";
    updateJson(currCel);
});

fontSize.addEventListener("change", () => {
    currCel.style.fontSize = fontSize.value;
    updateJson(currCel);
});

fontFamily.addEventListener("change", () => {
    currCel.style.fontFamily = fontFamily.value;
    updateJson(currCel);
});

cutBtn.addEventListener("click", () => {
    cutValue = {
        style: currCel.style.cssText,
        text: currCel.innerText
    };
    updateJson(currCel);
    currCel.style = null;
    currCel.innerText = null;
});

copyBtn.addEventListener("click", () => {
    cutValue = {
        style: currCel.style.cssText,
        text: currCel.innerText
    };
    updateJson(currCel);
});

pasteBtn.addEventListener("click", () => {
    currCel.style.cssText = cutValue.style;
    currCel.innerText = cutValue.text;
    updateJson(currCel);
});

function updateJson(cell) {
    var json = {
        style: cell.style.cssText,
        text: cell.innerText,
        id: cell.id,
    };
    //update the json in my matrix
    var id = cell.id.split("");
    // console.log(id[0]);
    // console.log(id[1]);
    var i = id[1] - 1;
    var j = id[0].charCodeAt(0) - 65;
    matrix[i][j] = json;
    // console.log("updated matrix", matrix);

    // if (arrMatrix.length == numSheets) {
    //     arrMatrix[currSheetNum - 1] = matrix;
    // }else{
    //     arrMatrix.push(matrix);
    // }
    console.log("ArrMatrix", arrMatrix);
}

function downloadJson() {
    // Define your JSON data

    // Convert JSON data to a string
    const jsonString = JSON.stringify(matrix);

    // Create a Blob with the JSON data and set its MIME type to application/json
    const blob = new Blob([jsonString], { type: "application/json" });

    // Create an anchor element and set its href attribute to the Blob URL
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "data.json"; // Set the desired file name

    // Append the link to the document, click it to start the download, and remove it afterward
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

document.getElementById("jsonFile").addEventListener("change", readJsonFile);

function readJsonFile(event) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const fileContent = e.target.result;

            // {id,style,text}
            // Parse the JSON file content and process the data
            try {
                const jsonData = JSON.parse(fileContent);
                console.log("matrix2", jsonData);
                matrix = jsonData;
                jsonData.forEach((row) => {
                    row.forEach((cell) => {
                        if (cell.id) {
                            var myCell = document.getElementById(cell.id);
                            myCell.innerText = cell.text;
                            myCell.style.cssText = cell.style;
                        }
                    });
                });
                // Process the JSON data as needed
            } catch (error) {
                console.error("Error parsing JSON file:", error);
            }
        };

        reader.readAsText(file);
    }
}

document.getElementById("add-sheet-btn").addEventListener("click", () => {
    alert("Adding a new sheet...");
    if(numSheets == 1){
        var myArr = [matrix];
        localStorage.setItem("ArrMatrix", JSON.stringify(myArr));
    }else{
        var localStorageArr = JSON.parse(localStorage.getItem("ArrMatrix"));
        var myArr = [...localStorageArr,matrix];
        localStorage.setItem("ArrMatrix", JSON.stringify(myArr));
    }
    
    numSheets++;
    currSheetNum = numSheets;
    for (let i = 0; i < rows; i++) {
        matrix[i] = new Array(columns);
        for (let j = 0; j < columns; j++) {
            matrix[i][j] = {};
        }
    }
    
    tbody.innerHTML = ``;
    for (let row = 0; row < rows; row++) {
        var tr = document.createElement("tr");
        var th = document.createElement("th");
        th.innerText = row + 1;
        tr.appendChild(th);
        for (let col = 0; col < columns; col++) {
            let td = document.createElement("td");
            td.setAttribute("contenteditable", "true");
            td.setAttribute("spellcheck", "false");
            td.setAttribute("id", `${String.fromCharCode(65 + col)}${row + 1}`);
            td.addEventListener("focus", (event) => onFocusFnc(event));
            td.addEventListener("input", (event) => onInputFnc(event));
            tr.appendChild(td);
        }
        //append the row into body
        tbody.appendChild(tr);
    }
    document.getElementById("sheet-num").innerText = "sheet" + currSheetNum;
});

document.getElementById("sheet-1").addEventListener("click", () => {
    var myArr = JSON.parse(localStorage.getItem("ArrMatrix"));
    let tableData = myArr[0];
    matrix = tableData;
    tableData.forEach((row) => {
        row.forEach((cell) => {
            if (cell.id) {
                var myCell = document.getElementById(cell.id);
                myCell.innerText = cell.text;
                myCell.style.cssText = cell.style;
            }
        });
    });
})