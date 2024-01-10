document.addEventListener("DOMContentLoaded", function () {
    const completeList = document.querySelector('.listTask');

    completeList.addEventListener('click', function (event) {
        const clickedElement = event.target;

        if (clickedElement.tagName === 'IMG' && (clickedElement.alt === 'check task' || clickedElement.alt === 'checked task')) {
            toggleTask(clickedElement);
        }
    });
});

const button = document.querySelector('.buttonAdd');
const input = document.querySelector('.inputTask');
const completeList = document.querySelector('.listTask');

let itemsList = [];

function addTask() {
    itemsList.push({
        task: input.value,
        concluded: false
    });
    input.value = '';
    createTask();
}

function createTask() {
    let newList = '';

    itemsList.forEach((item, index) => {
        const isConcluded = item.concluded ? 'concluded' : '';

        newList += `
        <li class="task ${isConcluded}">
            <img src="/components/${item.concluded ? 'checked' : 'checkbox'}.png" alt="${item.concluded ? 'checked' : 'check'} task" onclick="toggleTask(this)">
            <p>${item.task}</p>
            <img src="/components/trash.png" alt="delete task" onclick="confirmDelete(${index})">
        </li>
        `;
    });

    completeList.innerHTML = newList;

    localStorage.setItem('list', JSON.stringify(itemsList))
}

function confirmDelete(index) {
    const confirmDelete = confirm('Are you sure you want to delete this task?');

    if (confirmDelete) {
        itemsList.splice(index, 1);
        createTask();
    }
}

function toggleTask(clickedImage) {
    const taskItem = clickedImage.closest('.task');
    const taskIndex = Array.from(taskItem.parentNode.children).indexOf(taskItem);

    itemsList[taskIndex].concluded = !itemsList[taskIndex].concluded;
    createTask();
}

function reload (){
    const localTasks = localStorage.getItem('list')

    if (localTasks){
    itemsList = JSON.parse(localTasks)
}
    createTask()

} 

input.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTask();
    } 
});


reload()
button.addEventListener('click', addTask);
