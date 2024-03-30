const contentReader = document.getElementById('text-output');
const codesReader = document.getElementById('key-codes');
const helpContainer = document.getElementById('help-container');
const screenContainer = document.getElementById('screen-container');
const cursor = document.getElementById('cursor');
const cursortext = document.getElementById('cursortext');

let upperCase = false;

let input = []; // WIP

import {toggleMode} from './darkmode-script.js';
import {openNavMenu} from './navigation-script.js';

// Keyboard Listeners

codesReader.innerHTML = `<pre>
    <u><strong>Current Key:</strong></u>`

document.addEventListener('keydown',function(e){
    codesReader.innerHTML = `<pre>
    <u><strong>Current Key:</strong></u>
    Key :       ${e.key}                        
    Code:       ${e.code}                   
    KeyCode:    ${e.keyCode}
    <del>Which:      ${e.which}</del>
    TimeStamp:  ${Math.round(e.timeStamp)}                         
    `
    let x = document.getElementById(e.code);
    if(e.keyCode >= 48 && e.keyCode <= 57){
        contentReader.innerHTML += keysToCase(`${e.key}`);
    }else if(e.keyCode >= 65 && e.keyCode <= 90){
        contentReader.innerHTML += keysToCase(`${e.key}`);
    }else if(e.keyCode >= 186 && e.keyCode <= 192){
        contentReader.innerHTML += keysToCase(`${e.key}`);
    }else if(e.keyCode >= 219 && e.keyCode <= 223){
        contentReader.innerHTML += keysToCase(`${e.key}`);
    }else if(e.keyCode >= 37 && e.keyCode <= 40){
        noDisplayKeys(e);
    }else if(e.keyCode == 16){ // Shift Keys 
        colorKeys("down");
        noDisplayKeys(e);
    }else if(e.keyCode >= 8 && e.keyCode <= 9){
        noDisplayKeys(e);
    }else if(e.keyCode == 13){
        noDisplayKeys(e);
    }else if(e.keyCode == 17){
        noDisplayKeys(e);
    }else if(e.keyCode == 18){
        noDisplayKeys(e);
    }else if(e.keyCode == 20){
        noDisplayKeys(e);
    }else{
        helpContainer.style.color = 'red';
        helpContainer.innerHTML += `${e.key}` 
        e.preventDefault()
    }
   
    // 8,9,13,17,18,20,
    
    // 91


    switch(e.keyCode){
        case 8: // BackSpace
        backspace()    // backspace function
        noDisplayKeys(e);
        break;
        case 9: // Tab
        noDisplayKeys(e, "    ")// Tab function
        break;
        case 13: // Enter
        if(e.code == 'Enter'){
            calculator()    //Enter Function
        }
        break;
        case 32: //Space
            noDisplayKeys(e, " ") // Space Function
        break;
        default: // No DisplayKeys
            noDisplayKeys(e) // No Display Function
        break;
    }

    if(x){
        x.classList.add('pressed')
    }
})

document.addEventListener('keyup',function(e){
    
    let x = document.getElementById(e.code);
    switch(e.code){
        case 'ShiftRight':
            colorKeys("up");
            break;
        case 'ShiftLeft':
            colorKeys("up");
            break;
    }
    if(x){
        x.classList.remove('pressed')
    }
    
    navigation(e)
    clearDisplay()
    changeMode()
    updateHelp()
    openNavMenu()
    // updateScreenInfo()
    // red()
})

// Keyboard Functions

function calculator(){
    let expression = contentReader.innerText;
    let result;
        try{
            result = eval(expression);
            contentReader.innerHTML = `Calculation Complete: (${expression}) = ${result}`;
        } catch (error) {
            contentReader.innerHTML = `! ${error}`
            contentReader.innerText += "\n invalid calculation request"
        }
}

function backspace(){
    let slicedText = contentReader.innerText.slice(0, contentReader.innerText.length-1);
    contentReader.innerText = slicedText;
}

function clearDisplay(){
    if(textParse('cls', contentReader.innerText) || textParse('del', contentReader.innerText) || textParse('clear', contentReader.innerText)){
        contentReader.innerHTML = '';
        helpContainer.innerHTML = '';
    }
}

function changeMode(){
    if (textParse('dark', contentReader.innerText)){
        toggleMode()
        contentReader.innerText = "(Dark Mode Activated)"
    }else if(textParse('light', contentReader.innerText)){
        toggleMode()
        contentReader.innerText = "(Light Mode Activated)"
    }
    
}

function textParse(conditionText, sourceText){
    let textString = sourceText.slice(sourceText.length - conditionText.length, sourceText.length)
    if(textString.toString().toLowerCase() == conditionText){
        input = [];
        return true;
    }
}

function keysToCase(value){
  if(upperCase == true){
    return value.toUpperCase();
  }else{
    return value;
  }
}

function colorKeys(value){
    let a = document.getElementById('Digit1');
    let b = document.getElementById('Digit2');
    let c = document.getElementById('Digit3');
    let d = document.getElementById('Digit4');
    let e = document.getElementById('Digit5');
    let f = document.getElementById('Digit6');
    let g = document.getElementById('Digit7');
    let h = document.getElementById('Digit8');
    let i = document.getElementById('Digit9');
    let j = document.getElementById('Digit0');
    let k = document.getElementById('Minus');
    let l = document.getElementById('Equal');
    let m = document.getElementById('BracketLeft');
    let n = document.getElementById('BracketRight');
    let o = document.getElementById('Semicolon');
    let p = document.getElementById('Quote');
    let q = document.getElementById('Slash');
    let r = document.getElementById('Period');
    let s = document.getElementById('Comma');
    let t = document.getElementById('IntlBackslash');
    let u = document.getElementById('Backquote');
    let v = document.getElementById('Backslash');
    
    let items = [a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v];
    
    if(value=="up"){
        a.value = '1';
        b.value = '2';
        c.value = '3';
        d.value = '4';
        e.value = '5';
        f.value = '6';
        g.value = '7';
        h.value = '8';
        i.value = '9';
        j.value = '0';
        k.value = '-';
        l.value = '=';
        m.value = '[';
        n.value = ']';
        o.value = ';';
        p.value = "'";
        q.value = "/";
        r.value = ".";
        s.value = ",";
        t.value = "\\";
        u.value = "`";
        v.value = "#";
        highlightButtons(items, 'remove');
    }else{
        a.value = '!';
        b.value = '"';
        c.value = '£';
        d.value = '$';
        e.value = '%';
        f.value = '^';
        g.value = '&';
        h.value = '*';
        i.value = '(';
        j.value = ')';
        k.value = '_';
        l.value = '+';
        m.value = '{';
        n.value = '}';
        o.value = ':';
        p.value = '@';
        q.value = '?';
        r.value = '>';
        s.value = '<';
        t.value = '|';
        u.value = "¬";
        v.value = "~";
        highlightButtons(items, 'add');
    }
}

function navigation(e){

    if(contentReader.innerText == 'navpage2' || contentReader.innerText == 'page2' || contentReader.innerText == 'nav page2'){
        e.view.location.href = './page2.html'
    }
}

function noDisplayKeys(e, x){
    switch(x){
        case " ":
            contentReader.innerText += " ";
            e.preventDefault();
            break;
        case "    ":
            contentReader.innerText += "    ";
            e.preventDefault();
            break;
        default:
            contentReader.innerText += "";
            e.preventDefault();
           break;
    }
}
    
function highlightButtons(items, state){
   if(state == 'add'){
        for(let i = 0; i < items.length; i++){
            items[i].classList.add('shifted');  
        };
    }else{
        for(let j = 0; j < items.length; j++){
            items[j].classList.remove('shifted');
        };
    }
}

// Screen Info Functions

function updateHelp(){
    if(textParse('help', contentReader.innerText)){
        helpContainer.style.color = 'yellowgreen';
        helpContainer.innerHTML = `
        <pre>
        Current functions :
        Clear Displays:     'cls' or 'del'
        Calculate:          '1+2' then Enter
        Darkmode:           'light' or 'dark'
        Navigation:         'page2'
        
        Red display for keys that are not showen above.

        </pre>`;
        contentReader.innerText = 'Help selected'
        
    }
    
};

let screenContainerIsActive = false;
function updateContainer(x, y, sx, sy, orient, bx, by, plat, plat2, mobile, lang, conn, heap){
    
    screenContainer.innerHTML = `
    <pre>
    Screen:     ${sx}x${sy}
                <small>(${orient})</small>
    B-res:      ${bx}x${by}
    Plat:       ${plat} <small>(${plat2})</small>
    Mobile:     ${mobile}
    Lang:       ${lang}
    Connection: ${conn}

    X:          <span class="color">${x}</span>px
    Y:          <span class="color">${y}</span>px

    jsHeapLimit:${Math.floor(heap)} 
    </pre>`;

    cursortext.innerHTML = `<pre>  
    <span class="color">${x}</span>px
    <span class="color">${y}</span>px`

    // cursor.style.top = `${e.y-5}px`;
    // cursor.style.left =`${e.x-5}px`;
    cursortext.style.top = `${y - 30}px`;
    cursortext.style.left =`${x + 5}px`;

    cursor.classList.add('display-cursor');
    cursortext.classList.add('display-cursor'); 
    
};

// Mouse Listeners

document.addEventListener('mousedown', function(e){
    switch(e.button){
        case 0:
            let mb1 = document.getElementById('Mouse1')
            mb1.classList.add('shifted')
        break;
        case 2:
            let mb2 = document.getElementById('Mouse2')
            mb2.classList.add('shifted')
        break;
        case 1:
            let mb3 = document.getElementById('Wheel')
            mb3.classList.add('shifted')
        break;
    }
    
})

document.addEventListener('mouseup', function(e){
    switch(e.button){
        case 0:
            let mb1 = document.getElementById('Mouse1')
            mb1.classList.remove('shifted')
        break;
        case 2:
            let mb2 = document.getElementById('Mouse2')
            mb2.classList.remove('shifted')
        break;
        case 1:
            let mb3 = document.getElementById('Wheel')
            mb3.classList.remove('shifted')
        break;
    
    }
    
})

document.addEventListener('wheel',function(e){
    let mb3 = document.getElementById('Wheel')
    mb3.classList.add('shifted')
})
   
document.addEventListener('mousemove',function(e){
    let mb3 = document.getElementById('Wheel')
    mb3.classList.remove('shifted')
    updateContainer(
        e.x, 
        e.y, 
        e.view.screen.width,
        e.view.screen.height, 
        e.view.parent.screen.orientation.type,
        e.view.innerWidth,
        e.view.innerHeight,
        e.view.navigator.userAgentData.platform,
        e.view.navigator.platform,
        e.view.navigator.userAgentData.mobile,
        e.view.navigator.language,
        e.view.navigator.connection.effectiveType,
        e.view.performance.memory.jsHeapSizeLimit
        );
})


