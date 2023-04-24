const thead = document.getElementById("table-heading-row");
const tbody = document.getElementById("table-body");


const columns = 26;
const rows = 100;
let currCel;

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