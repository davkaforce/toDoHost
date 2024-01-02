const root = document.getElementById("root");

// ----here real project starts----

// creating actual 4 boards and their children etc

let currentBoardButton = 0;

for (let i = 0; i < 4; i++) {
  const board = document.querySelector(`#board${i + 1}`);

  const paragraph = document.createElement("p");
  paragraph.setAttribute("id", `paragraph${i + 1}`);
  paragraph.innerText = `My tasks`;
  board.appendChild(paragraph);

  const button = document.createElement("button");
  button.setAttribute("id", `button`);
  button.innerText = "Add task";
  board.appendChild(button);

  const cards = document.querySelector(`#cards${i + 1}`);
  board.appendChild(cards);

  // add new task button in the board
  button.addEventListener("click", () => {
    modal.style.display = "block";
    taskName.value = "";
    taskDesc.value = "";
    currentBoardButton = `${i + 1}`; // understanding which board exactly
  });
}

// global arrays and global html cards for each board

let myArrayTask1 = [];
let myArrayTask2 = [];
let myArrayTask3 = [];
let myArrayTask4 = [];

console.log(myArrayTask1);

let myLocalStringArray1 = [];
let myLocalStringArray2 = [];
let myLocalStringArray3 = [];
let myLocalStringArray4 = [];

let AllArrays = [myArrayTask1, myArrayTask2, myArrayTask3, myArrayTask4];

let cards1 = document.getElementById("cards1");
let cards2 = document.getElementById("cards2");
let cards3 = document.getElementById("cards3");
let cards4 = document.getElementById("cards4");

let dragTaskArrayId;
let dragTaskIndex;
let tempArray = [];

let localStorageOn;
localStorageOn = Number(localStorage.getItem(`localStorageOnSave`));

// "new task" popup window creation

const modal = document.createElement("div");
modal.setAttribute("class", "modal");
root.appendChild(modal);

const modalContent = document.createElement("div");
modalContent.setAttribute("class", "modalContent");
modalContent.innerText = "modalContent";
modal.appendChild(modalContent);

const taskName = document.createElement("input");
modalContent.appendChild(taskName);

const taskDesc = document.createElement("input");
modalContent.appendChild(taskDesc);

const inButton = document.createElement("button");
inButton.setAttribute("class", "inButton");
inButton.innerText = "Enter";
modalContent.appendChild(inButton);

// "edit task" popup window creation

const modalEdit = document.createElement("div");
modalEdit.setAttribute("class", "modal");
root.appendChild(modalEdit);

const modalContentEdit = document.createElement("div");
modalContentEdit.setAttribute("class", "modalContent");
modalContentEdit.innerText = "modalContentEdit";
modalEdit.appendChild(modalContentEdit);

const taskNameEdit = document.createElement("input");
modalContentEdit.appendChild(taskNameEdit);

const taskDescEdit = document.createElement("input");
modalContentEdit.appendChild(taskDescEdit);

const inButtonEdit = document.createElement("button");
inButtonEdit.setAttribute("class", "inButton");
inButtonEdit.innerText = "Save";
modalContentEdit.appendChild(inButtonEdit);

// declaring "render" function for adding new task and reset the tasks

function render(array, cards) {
  cards.innerHTML = "";
  // empty the card

  console.log("render works");
  // declaring temporary object var for task arrays
  let myObjectTask;

  //understanding whether new task or edit task
  if (currentBoardButton !== 0) {
    myObjectTask = { myTask: taskName.value, myDesc: taskDesc.value };
    console.log(myObjectTask);
    array.push(myObjectTask);
  }

  // actual rendering
  array.map((element, index) => {
    console.log("array map works");
    const taskDiv = document.createElement("div");
    taskDiv.setAttribute("class", "taskDiv");
    taskDiv.setAttribute("id", `task${index}`);
    cards.appendChild(taskDiv);
    //drag and drop section
    taskDiv.setAttribute("draggable", "true");
    taskDiv.addEventListener("dragstart", () => {
      taskDiv.classList.add("dragging");
      dragTaskIndex = index;
      dragTaskArrayId = cards.id;
      console.log(dragTaskArrayId);
    });
    taskDiv.addEventListener("dragend", () => {
      taskDiv.classList.remove("dragging");
    });

    const existingTaskName = document.createElement("p");
    existingTaskName.innerText = "Task name: " + element.myTask;
    const existingTaskDesc = document.createElement("p");
    existingTaskDesc.innerText = "Task description: " + element.myDesc;

    taskDiv.appendChild(existingTaskName);
    taskDiv.appendChild(existingTaskDesc);

    const editButton = document.createElement("button");
    editButton.setAttribute("class", "editButton");
    editButton.setAttribute("id", `edit${index}`);
    editButton.innerText = "edit";
    editButton.addEventListener("click", () => {
      taskNameEdit.value = element.myTask;
      taskDescEdit.value = element.myDesc;
      modalEdit.style.display = "block";

      inButtonEdit.onclick = () => {
        console.log("edit button check");
        array[index].myTask = taskNameEdit.value;
        array[index].myDesc = taskDescEdit.value;
        currentBoardButton = 0;
        console.log("edit button check2");
        // Re-render the tasks to reflect the changes
        render(array, cards);
        // Close the edit modal
        modalEdit.style.display = "none";
      };
    });
    taskDiv.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("id", `delete${index}`);
    deleteButton.innerText = "X";
    deleteButton.addEventListener("click", () => {
      array.splice(index, 1);
      // cards.removeChild(taskDiv);
      currentBoardButton = 0;
      render(array, cards);
    });
    taskDiv.appendChild(deleteButton);
  });

  modal.style.display = "none";
  currentBoardButton = 0;

  // saving to localstorage
  myLocalStringArray1 = JSON.stringify(myArrayTask1);
  myLocalStringArray2 = JSON.stringify(myArrayTask2);
  myLocalStringArray3 = JSON.stringify(myArrayTask3);
  myLocalStringArray4 = JSON.stringify(myArrayTask4);

  localStorage.setItem("myLocalStorageArray1", myLocalStringArray1);
  localStorage.setItem("myLocalStorageArray2", myLocalStringArray2);
  localStorage.setItem("myLocalStorageArray3", myLocalStringArray3);
  localStorage.setItem("myLocalStorageArray4", myLocalStringArray4);

  localStorageOn = 1;
  let localStorageOnString = JSON.stringify(localStorageOn);
  localStorage.setItem("localStorageOnSave", localStorageOnString);
}

// "add new task" button in popup window

inButton.addEventListener("click", () => {
  console.log("checkcheck", currentBoardButton);
  if (currentBoardButton == 1) {
    render(myArrayTask1, cards1);
  }
  if (currentBoardButton == 2) {
    render(myArrayTask2, cards2);
  }
  if (currentBoardButton == 3) {
    render(myArrayTask3, cards3);
  }
  if (currentBoardButton == 4) {
    render(myArrayTask4, cards4);
  }
});

// render();
// close add/edit task window when clicked outside

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  } else if (event.target == modalEdit) {
    modalEdit.style.display = "none";
  }
};

// drag and drop section

const cardsContainers = document.querySelectorAll(".cards");
cardsContainers.forEach((cards, index) => {
  cards.addEventListener("dragover", (e) => {
    e.preventDefault();
    const draggable = document.querySelector(".dragging");
    cards.appendChild(draggable);
  });

  cards.addEventListener("drop", (e) => {
    e.preventDefault();
    //update the dragstart board
    let tempObject;
    if (dragTaskArrayId == "cards1") {
      tempObject = myArrayTask1[dragTaskIndex];
      myArrayTask1.splice(dragTaskIndex, 1);
      console.log("check1");
    }
    if (dragTaskArrayId == "cards2") {
      tempObject = myArrayTask2[dragTaskIndex];
      myArrayTask2.splice(dragTaskIndex, 1);
    }
    if (dragTaskArrayId == "cards3") {
      tempObject = myArrayTask3[dragTaskIndex];
      myArrayTask3.splice(dragTaskIndex, 1);
    }
    if (dragTaskArrayId == "cards4") {
      tempObject = myArrayTask4[dragTaskIndex];
      myArrayTask4.splice(dragTaskIndex, 1);
    }
    console.log("checkkkk", tempObject);

    // update the drop board
    if (cards.id == "cards1") {
      myArrayTask1.push(tempObject);
    }
    if (cards.id == "cards2") {
      myArrayTask2.push(tempObject);
    }
    if (cards.id == "cards3") {
      myArrayTask3.push(tempObject);
    }
    if (cards.id == "cards4") {
      myArrayTask4.push(tempObject);
    }

    // Re-render the tasks to reflect the changes

    render(myArrayTask1, cards1);
    render(myArrayTask2, cards2);
    render(myArrayTask3, cards3);
    render(myArrayTask4, cards4);
  });
});

// Render using localstorage

if (localStorageOn == 1) {
  myLocalStringArray1 = localStorage.getItem("myLocalStorageArray1");
  myLocalStringArray2 = localStorage.getItem("myLocalStorageArray2");
  myLocalStringArray3 = localStorage.getItem("myLocalStorageArray3");
  myLocalStringArray4 = localStorage.getItem("myLocalStorageArray4");

  let myLocalArray1 = JSON.parse(myLocalStringArray1);
  let myLocalArray2 = JSON.parse(myLocalStringArray2);
  let myLocalArray3 = JSON.parse(myLocalStringArray3);
  let myLocalArray4 = JSON.parse(myLocalStringArray4);

  myArrayTask1 = myLocalArray1;
  myArrayTask2 = myLocalArray2;
  myArrayTask3 = myLocalArray3;
  myArrayTask4 = myLocalArray4;

  render(myArrayTask1, cards1);
  render(myArrayTask2, cards2);
  render(myArrayTask3, cards3);
  render(myArrayTask4, cards4);
}

// const tasks = [
//   { title: "To Do", id: "todo" },
//   { title: "In progress", id: "inprogress" },

//   { title: "Stuck", id: "stuck" },
//   { title: "Done", id: "done" },
// ];

// // const allTask = [
// //   {title:'', desc:'', id:'', status:'stuck'}
// // ]

// tasks.map((task)=>{

// })

// const addTask = ()=>{
//   let cards = document.getElementsByClassName

//  cards.appendChild(task)
// }
