const darkMode = document.getElementById("darkmode");

darkMode.addEventListener('mouseup', function(e){
    toggleMode()
})

function checkDarkModeState(){
    if(localStorage.getItem('NightMode') == 'light'){
        document.body.classList.add('light')
        darkMode.value = 'Light mode active';
    } else {
        darkMode.value = 'Dark mode active';
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
// localStorage.clear();


function light(x){
    if(x == 'add'){
        document.body.classList.add('light')
        darkMode.value = 'Light mode active';
        localStorage.setItem('NightMode', 'light');
    }else{
        document.body.classList.remove('light')
        darkMode.value = 'Dark mode active';
        localStorage.setItem('NightMode', 'dark');
    }
    
}