const darkMode = document.getElementById("darkmode");
const dark = document.querySelectorAll('section');

darkMode.addEventListener('mouseup', function(e){
    toggleMode()
})

function updateMode(input){
    switch(input){
        case 'add':
            dark.forEach(element => {
                element.classList.add('light')})
        break;
        case 'remove':
            dark.forEach(element => {
                element.classList.remove('light')})
        break;
    }
}

    
function checkDarkModeState(){
    if(localStorage.getItem('NightMode') == 'light'){
        document.body.classList.add('light')
        darkMode.innerHTML = "Dark 🌑 ";
    } else {
        darkMode.innerHTML = "Light 🌕";
    }
}

export function toggleMode(){
    switch(localStorage.getItem('NightMode')){
        case 'dark':
            light('add')
            break;
        case 'light':
            light('remove')
            break;
        default:
            light('add')
            break;
    }
}

checkDarkModeState();

function light(x){
    if(x == 'add'){
        updateMode('add')
        localStorage.setItem('NightMode', 'light');
        darkMode.innerHTML = "Dark 🌑 ";
    }else{
        updateMode('remove')
        localStorage.setItem('NightMode', 'dark');
        darkMode.innerHTML = "Light 🌕";
    }
    
}