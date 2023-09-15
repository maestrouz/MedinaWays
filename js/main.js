// slider ---

function change1() {
    document.getElementById('bg').style.backgroundImage = 'url("../img/img1.jpg")'
}
function change2() {
    document.getElementById('bg').style.backgroundImage = 'url("../img/img2.jpg")'
}
function change3() {
    document.getElementById('bg').style.backgroundImage = 'url("../img/img3.jpg")'
}
function change4() {
    document.getElementById('bg').style.backgroundImage = 'url("../img/img4.jpg")'
}


// LocalStorage create

const name = document.getElementById('name');
const username = document.getElementById('userName');
const password = document.getElementById('psw');
const phoneNumber = document.getElementById('number')

// const userinp = document.getElementById('userinp')
// const userpsw = document.getElementById('userpsw')

// const btn = document.getElementById('user-btn');
// const userCheck = document.getElementById('nic')



let id = new Date().getMilliseconds().toString();


function add() {
    var password = psw.value; // Parolni o'zgaruvchiga o'zlashtirish
 
    if (password.length >= 8) {
        addToLocalStorage(id,name.value, phoneNumber.value, username.value, psw.value);
        location.href = "./log.html"
    } else {
        document.getElementById("psw_txt").innerHTML = "Parol 8 ta belgidan iborat emas.";
    }
 }




function getLocalStorage() {
    if (localStorage.getItem('name')) {
       return JSON.parse(localStorage.getItem('name'))
    } else {
        return []
    }
}






function addToLocalStorage(id,name,number, username, psw) {
    const data = { id,name,number,username,psw };
    const items = getLocalStorage();
    items.push(data);
    localStorage.setItem('name', JSON.stringify(items));
    // location.href = './log.html'
}


// LocalStorage check data

let users = getLocalStorage();
let pswAttempts = 0; // Xatolar sonini saqlash uchun o'zgaruvchi

function checkUser(username, psw) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].psw === psw) {
            location.href = '../index.html';
            return; 
        }
    }

    // Agar parol noto'g'ri kiritilsa
    pswAttempts++; // Xatolarni san'aymiz
    if (pswAttempts >= 3) { // Agar 3 marta yoki undan ko'p xato kiritilsa
        document.getElementById('btn').style.backgroundColor = 'red';
        document.getElementById('wrong').innerHTML = 'Parolni 3 marta xato kiritdingiz.Saytni qayta yuklang!';
        document.getElementById('rst').style.backgroundColor = "#026490";
        document.getElementById('psw').disabled = true; // Inputni bloklash
        document.getElementById('rst').innerHTML = 'Parolni yangilash'
    } else {
        document.getElementById('btn').style.backgroundColor = 'red';
        document.getElementById('wrong').innerHTML = 'Parol xato qaytadan tekshirib yozing';
    }
}


function changePassword(username, newPassword) {
    let users = getLocalStorage();

    // Find the user with the matching username
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
            // Update the user's password
            users[i].psw = newPassword;
            localStorage.setItem('name', JSON.stringify(users)); // Update local storage data
            alert('Password changed successfully.');
            return;
        }
    }

    // If no user with the provided username is found
    alert('User not found. Password change failed.');
}

function changeUserPassword() {
    const username = document.getElementById('userName').value;
    const newPassword = document.getElementById('newpsw').value;

    // Call the changePassword function with the provided `username` and `newPassword`
    changePassword(username, newPassword);
}


// sign button
function sign() {
    location.href="../web/reg.html"
}


// select country

document.addEventListener('DOMContentLoaded', () => {
    const dropdownButton = document.querySelector('.dropdown-button');
    const dropdownItems = document.querySelectorAll('.dropdown-item');

    dropdownItems.forEach(item => {
        item.addEventListener('click', () => {
            const selectedItem = item.getAttribute('data-item');
            dropdownButton.textContent = selectedItem;
        });
    });
});





// check ticket 

const check_in = ['2023-09-15', '2023-09-18', '2023-09-20','2023-09-23', '2023-09-25', '2023-09-30'];

const check_out = ['2023-09-16', '2023-09-19', '2023-09-21','2023-09-24', '2023-09-26', '2023-09-30'];

const country = ['Dubai','Makkah','New York','Korea','Japan','London','Vietnam','Uzbekistan'];

const in_date = document.getElementById('check_in');
const out_date = document.getElementById('check_out');
const country_bar = document.getElementById('Dubai');

function checkTicket() {
    for (let i = 0; i < check_in.length; i++) {
        for (let a = 0; a < check_out.length; a++) {
            if (in_date.value === check_in[i] && out_date.value === check_out[a]) {
                const dropdown = document.getElementById('countryDropdown');
                const selectedCountry = dropdown.value;
                const found = country.includes(selectedCountry);
                console.log(found);
                location.href ='./web/ticket.html'
                return
            } else {
                // console.log('Country not found:'    );
                displayPopup();
            }
        }
        
    }
}

function displayPopup() {
    const popup = document.getElementById('popup');
    const popupText = document.querySelector('.popup-text');

    popup.style.display = 'block';
    popupText.textContent = 'Kelish yoki Ketish boyicha reys topilmadi!';

    setTimeout(function () {
        popup.style.display = 'none';
    }, 3000); // Close the popup after 5 seconds (5000 milliseconds)
}




// time

var countdownTime = new Date("Sep 26, 2023 00:00:00").getTime();

var x = setInterval(function(){
    var now = new Date().getTime();
    var distance = countdownTime - now;
    
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    minutes = minutes < 10 ? '0' + minutes:minutes;
    hours = hours < 10 ? '0' + hours:hours;
    days = days < 10 ? '0' + days:days;

    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;

    if (distance < 0) {
        clearInterval(x);
        document.getElementById("days").innerHTML = "00";
        document.getElementById("hours").innerHTML = "00";
        document.getElementById("minutes").innerHTML = "00";
        document.getElementById("seconds").innerHTML = "00";
    }
},1000)

function yopish() {
    document.getElementById('main_time').classList.toggle('main2');
    // console.log(true);
}