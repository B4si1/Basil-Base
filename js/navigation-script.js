const hideBtn = document.getElementById('showHideBtn');
const navigation = document.getElementById('navigation');
const contentReader = document.getElementById('text-output');

let isNavHidden = true;

hideBtn.addEventListener('click',function(e){
    if(isNavHidden){
        updateNav('hide')
    }else{
        updateNav()
    }
})

document.addEventListener('click', function(e){
    // console.log(e.target.id)
    if(e.target.id != 'showHideBtn' && e.target.id != 'darkmode'){
        updateNav()
    }
})

export function openNavMenu(){
    let input = contentReader.innerText.slice(contentReader.innerText.length -3, contentReader.innerText.length)
    if(input.toLocaleLowerCase() == 'nav'){
        updateNav('hide')
    }
}

function updateNav(value){
    if(value == 'hide'){
        navigation.classList.remove('nav-hidden');
        hideBtn.classList.remove('shrink-nav-btn');
        hideBtn.value = "🍀 <";
        isNavHidden = false;
    }else{
        navigation.classList.add('nav-hidden');
        hideBtn.classList.add('shrink-nav-btn');
        hideBtn.value = "🍀 >";
        isNavHidden = true;
    }
}

document.addEventListener('keyup', function(e){
    if (e.which == 39){
        // console.log(e.which)
        navigation.classList.remove('nav-hidden');
        hideBtn.classList.remove('shrink-nav-btn');
        hideBtn.value = "🍀 <";
        isNavHidden = false;
    }
})