const helpDisplay = document.getElementById('help-container')
let input = [];

document.addEventListener('keyup', function(e){
    input += e.key;
    if(textParse('back', input) || textParse('home', input)){
        e.view.location.href = './index.html'
    }

    if(textParse('help', input)){
        helpDisplay.classList.remove('hide-class')
    }
    
})

helpDisplay.addEventListener('click', function(){
    helpDisplay.classList.add('hide-class')
})


export function textParse(conditionText, sourceText){
    let textString = sourceText.slice(sourceText.length - conditionText.length, sourceText.length)
    if(textString.toString().toLowerCase() == conditionText){
        input = [];
        return true;
    }
}



