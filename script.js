class Car {
    constructor(index, owner, car, plate, entryDate, exitDate) {
      this.index = index + 1;
      this.owner = owner;
      this.car = car;
      this.plate = plate;
      this.entryDate = entryDate;
      this.exitDate = exitDate;
    }
}

// NAV variables
const homeBtn = document.getElementById("home");
const contactsBtn = document.getElementById("contacts");
const aboutBtn = document.getElementById("about");

// Form variables
const addBtn = document.getElementById("add");
var indexTF = undefined;
const ownerTF = document.getElementById("owner");
const carTF = document.getElementById("car");
const plateTF = document.getElementById("plate");
const entryTF = document.getElementById("entry-date");
const exitTF = document.getElementById("exit-date");

// Table
const table = document.getElementById("table");

// JS variables
var cars = [];
const storageCars = JSON.parse(localStorage.getItem("cars"));
if (storageCars !== null){
    cars = storageCars;
}

initializeTable(cars);

//Form - Add
addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    //todo some sort of validation
    if (ownerTF.value === "" || carTF.value === "" || plateTF.value === "" || entryTF.value === "" || exitTF.value === ""){
        alert("Invalid data. Contains empty text fields.");
        return;
    }
   
    //Adding new
    if (indexTF === undefined)
    {
        const car = new Car(cars.length, ownerTF.value, carTF.value,  plateTF.value, entryTF.value, exitTF.value);
        cars.push(car);
        localStorage.setItem("cars", JSON.stringify(cars));
        addDataToTable(car);
    }
    //Update old
    else
    {
        var carObj = cars[indexTF - 1];
        carObj.owner = ownerTF.value;
        carObj.car = carTF.value;
        carObj.plate = plateTF.value;
        carObj.entryDate = entryTF.value;
        carObj.exitDate = exitTF.value;
        // const filteredCars = [];
        // cars.forEach(car => {
        //     if (car.index !== indexTF){
        //         filteredCars.push(car);
        //     }
        //     else{
        //         filteredCars.push(carObj);
        //     }
        // })
        // cars = filteredCars;
        // localStorage.setItem("cars", JSON.stringify(cars));
        updateTableRow(carObj, indexTF - 1);
    }
    clearFormFields();
});

// Listeners for Navigation buttons
homeBtn.addEventListener("click", () => {
    if (!homeBtn.classList.contains("active")){
        addClassToComponent(homeBtn, "active");
        removeClassFromComponent(contactsBtn, "active");
        removeClassFromComponent(aboutBtn, "active")
    }
});

contactsBtn.addEventListener("click", () => {
    if (!contactsBtn.classList.contains("active")){
        addClassToComponent(contactsBtn, "active");
        removeClassFromComponent(homeBtn, "active");
        removeClassFromComponent(aboutBtn, "active")
    }
});

aboutBtn.addEventListener("click", () => {
    if (!aboutBtn.classList.contains("active")){
        addClassToComponent(aboutBtn, "active");
        removeClassFromComponent(contactsBtn, "active");
        removeClassFromComponent(homeBtn, "active")
    }
});

function addClassToComponent(component, className){
    component.classList.add(className);
}

function removeClassFromComponent(component, className){
    component.classList.remove(className);
}

function fillFormFieldValues(car){
    indexTF = car.index;
    ownerTF.value = car.owner;
    carTF.value = car.car;
    plateTF.value = car.plate;
    entryTF.value = car.entryDate;
    exitTF.value = car.exitDate;
}

function clearFormFields(){
    indexTF = undefined;
    ownerTF.value = "";
    carTF.value = "";
    plateTF.value = "";
    entryTF.value = "";
    exitTF.value = "";
}

function addRowHandler(currentRow){
    const createClickHandler = function(row) {
        return function() {
            const cells = row.getElementsByTagName("td");
            const car = new Car(row.rowIndex, cells[0].innerHTML, cells[1].innerHTML, cells[2].innerHTML, 
                    cells[3].innerHTML, cells[4].innerHTML);
            fillFormFieldValues(car);
        };
      };
    currentRow.onclick = createClickHandler(currentRow);
}

function addRowHandlers() {
    const rows = table.getElementsByTagName("tr");
    for (i = 1; i < rows.length; i++) {
        addRowHandler(table.rows[i]);
    }
}

function updateTableRow(car, index){
    table.deleteRow(index);
    addDataToTable(car, index);
}

function addDataToTable(car, index = undefined){
    const row = index === undefined ? table.insertRow() : table.insertRow(index);
    const cell1 = row.insertCell();
    const cell2 = row.insertCell();
    const cell3 = row.insertCell();
    const cell4 = row.insertCell();
    const cell5 = row.insertCell();
    const cell6 = row.insertCell();

    cell1.appendChild(document.createTextNode(car.owner));
    cell2.appendChild(document.createTextNode(car.car));
    cell3.appendChild(document.createTextNode(car.plate));
    cell4.appendChild(document.createTextNode(car.entryDate));
    cell5.appendChild(document.createTextNode(car.exitDate));
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete");
    deleteBtn.innerHTML = `<i class="fas fa-trash-alt"></i>`;
    cell6.appendChild(deleteBtn);
    deleteBtn.addEventListener("click", (e) => {
        const filteredCars = [];
        cars.forEach(car => {
            if (car.index !== row.rowIndex){
                filteredCars.push(car);
            }
        })
        cars = filteredCars;
        table.deleteRow(row.rowIndex);
        clearFormFields();
        localStorage.setItem("cars", JSON.stringify(cars));
        e.stopPropagation();
    });
    addRowHandler(row);
}

function initializeTable(cars){
    const rowH = table.insertRow();
    const cell1H = rowH.insertCell();
    const cell2H = rowH.insertCell();
    const cell3H = rowH.insertCell();
    const cell4H = rowH.insertCell();
    const cell5H = rowH.insertCell();
    const cell6H = rowH.insertCell();
    cell1H.appendChild(document.createTextNode("Owner"));
    cell2H.appendChild(document.createTextNode("Car"));
    cell3H.appendChild(document.createTextNode("Plate"));
    cell4H.appendChild(document.createTextNode("Entry"));
    cell5H.appendChild(document.createTextNode("Exit"));
    cell6H.appendChild(document.createTextNode(""));

    cars.forEach(car => {
        addDataToTable(car);
    });
    addRowHandlers();
}