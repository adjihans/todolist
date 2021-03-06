let submitButton = document.getElementById("submit");
let data = document.getElementById("toDo");
let inputDate = document.getElementById("deadline")
let ul = document.querySelector("ul");
let list = document.getElementsByTagName("li");

let today = new Date();
let dd = addZero(today.getDate());
let todayDate = Number(dd);
let mm = addZero(today.getMonth());
let todayMonth = Number(mm);
let yyyy = today.getFullYear();

today = `${mm}/${dd}/${yyyy}`;


function addZero(input){
    let output = '';
    let inputString = String(input + 1)
    if (inputString.length === 2) {
        return input;
    } else if (inputString.length < 2) {
        output = `0${inputString}`
        return output;
    }
}

function splitter(input) {
    let output = '';

    for (let i = 0; i < input.length; i++) {
        if (input[i] === 'T') {
            output += ' '
        } else {
            output += input[i];
        }
    }

    return output;
}

function dateIdentifier(monthTarget, monthNow, yearTarget, yearNow) {
    let totalDays = 0;
    let output = yearTarget - yearNow
    output = output * 365;

    if (output < 0) {
        alert('Please do not input past date');
        window.stop();
    } else {
        for (let i = monthTarget; i > monthNow; i--) {
            switch (true) {
                case monthTarget === 1:
                    totalDays = 31;
                    break;
                case monthTarget === 2:
                    totalDays = 28;
                    break;
                case monthTarget === 3:
                    totalDays = 31;
                    break;
                case monthTarget === 4:
                    totalDays = 30;
                    break;
                case monthTarget === 5:
                    totalDays = 31;
                    break;
                case monthTarget === 6:
                    totalDays = 30;
                    break;
                case monthTarget === 7:
                    totalDays = 31;
                    break;
                case monthTarget === 8:
                    totalDays = 31;
                    break;
                case monthTarget === 9:
                    totalDays = 30;
                    break;
                case monthTarget === 10:
                    totalDays = 31;
                    break;
                case monthTarget === 11:
                    totalDays = 30;
                    break;
                case monthTarget === 12:
                    totalDays = 31;
            }
            output += totalDays
        }
    
        if (output < 0) {
            alert('Please do not input past date');
        } else {
            return output;
        }
    }

}

function remainingDay(input) {
    let yearDeadline = `${input[0]}${input[1]}${input[2]}${input[3]}`;
    let yearDeadlineNum = Number(yearDeadline)

    let dateDeadline = `${input[8]}${input[9]}`;
    let dateDeadlineNum = Number(dateDeadline);

    let monthDeadline = `${input[5]}${input[6]}`;
    let monthDeadlineNum = Number(monthDeadline);

    let dateToDay = dateIdentifier(monthDeadlineNum, todayMonth, yearDeadlineNum, yyyy);
    let remDay = dateDeadlineNum + dateToDay - todayDate;
   
    return remDay;
}

function createListElement() {
    let li = document.createElement("li");
    let splittedDeadline = splitter(inputDate.value);
    let dayLeft = remainingDay(splittedDeadline);

    if(isNaN(dayLeft)) {
        window.stop()
    } else {
        li.appendChild(document.createTextNode('Title: '));
        li.appendChild(document.createTextNode(data.value));
        li.appendChild(document.createTextNode(', Deadline Date: '));
        li.appendChild(document.createTextNode(splittedDeadline));
        li.appendChild(document.createTextNode(', Remaining Day: '));
        li.appendChild(document.createTextNode(dayLeft));
        li.appendChild(document.createTextNode(' day(s)'));
    
        ul.appendChild(li);
        data.value = "";
    
        function strikeThrough() {
            li.classList.toggle("done");
        }
    
        li.addEventListener("click", strikeThrough);
    
        // delete buttonnya desainnya berantakan kalau kepanjangan title to do. NEED FIX!!!
    
        // let deleteButton = document.createElement("button");
        
        // deleteButton.appendChild(document.createTextNode("X"));
        // li.appendChild(deleteButton);
        // deleteButton.addEventListener("click", deleteList);
    
    
        // function deleteList() {
        //     li.classList.add("delete");
        // }
    }

}

function addListAfterClick() {
    if (data.value.length > 0) {
        createListElement();
    }
}

submitButton.addEventListener("click", addListAfterClick);
