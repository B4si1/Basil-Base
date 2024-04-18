const darkMode = document.getElementById("darkmode");

darkMode.addEventListener('mouseup', function(e){
    toggleMode()
})

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
        document.body.classList.add('light')
        localStorage.setItem('NightMode', 'light');
        darkMode.innerHTML = "Dark 🌑 ";
    }else{
        document.body.classList.remove('light')
        localStorage.setItem('NightMode', 'dark');
        darkMode.innerHTML = "Light 🌕";
    }
    
}