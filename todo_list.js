let taskList = document.querySelector('#task_list');
let dueDateInput = document.querySelector('#duedate_input');
let dueTimeInput = document.querySelector('#duetime_input');
let taskInfoInput = document.querySelector('#task_description_input');
//Button selector
let addTaskButton = document.querySelector('#add_task');
 

taskInfoInput.addEventListener('keydown',(event) => {
    if (event.key === 'Enter'){
        let dueTime = dateAndTimeToTimestamp(dueDateInput, dueTimeInput);
        addTask(taskInfoInput.value, dueTime);
        taskInfoInput.value = '';
        dueDateInput.value = '';
        dueTimeInput.value = '';
    
        console.log(event.target.Element);
    }
});

taskList.addEventListener('click', (event) => {
    console.log(event.target.innerHTML);
    console.log(Element);
    if (event.target.innerHTML === 'Done'){
        event.target.parentElement.remove();
    }
});

addTaskButton.addEventListener('click', (event) => {
    let dueTime = dateAndTimeToTimestamp(dueDateInput, dueTimeInput);
    addTask(taskInfoInput.value, dueTime);
    taskInfoInput.value = '';
    dueDateInput.value = '';
    dueTimeInput.value = '';
})

function addTask(description, dueTime) {
    let newli = document.createElement('li');
    let spanPart = document.createElement('span');
    let doneButton = document.createElement('Done');

    spanPart.className = 'due';
    doneButton.innerHTML = 'Done';
    doneButton.className = 'btn btn-sm btn-outline-danger done';

    if(dueTime) {
        dueTime = new Date(dueTime);
        spanPart.textContent = `due ${dueTime.toLocaleDateString()} ${dueTime.toLocaleTimeString()}`;
    } else {
        spanPart.textContent = ``;
    }

    newli.append(description);
    newli.append(spanPart);
    newli.append(doneButton);
    taskList.appendChild(newli);

    return taskList
};

function dateAndTimeToTimestamp(dateInputElement, timeInputElement) {
    const dueDate = dateInputElement.valueAsNumber; // Returns the timestamp at midnight for the given date
    const dueTime = timeInputElement.valueAsNumber; // Returns the number of milliseconds from midnight to the time

    if(dueDate && dueTime) { // The user specified both a due date & due time
        //Add the timezone offset to account for the fact that timestamps are specified by UTC
        const timezoneOffset =  (new Date()).getTimezoneOffset() * 60 * 1000;
        return dueDate + dueTime + timezoneOffset;
    } else {
        // if the user did not specify both a due date and due time, return false
        return false;
    }
};