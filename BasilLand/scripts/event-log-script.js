import { eventLogDisplay } from "./doc-object-script.js";
import { showEventLogBtn } from "./doc-object-script.js";
// import { LogDisplay } from "./game-loop-script.js";


import { hide } from "./helper-functions.js";
import { show } from "./helper-functions.js";

// Event Log Class
export class EventLogger{
    constructor(){
        this.log = []
        this.logLengthVariable = this.log.length
    }

    eventLog(event, color, alert){
        if(alert === 'alert'){
            let x = `<pre class="event-container ${color}"> <img class="log-img-scale" src="./BasilLand/images/bad.png"> ${event} </pre>`
            this.log.push(x)
        }else{
            let x = `<pre class="event-container ${color}"> ${event} </pre>`
            this.log.push(x)
        }
            
    }
        
    
    displayEvents(){
        if (this.log.length > this.logLengthVariable){
            eventLogDisplay.innerHTML += this.log[this.log.length-1]
            scrollEvents()
            this.logLengthVariable = this.log.length
        }
        if(this.log.length >= 210){
            this.reset()
        }
    }

    reset(){
        this.log = []
        this.logLengthVariable = this.log.length
        eventLogDisplay.innerHTML = ''
        this.eventLog('Event Log reset', 'orange')
    }
}

export function scrollEvents(){
    eventLogDisplay.scrollTop = eventLogDisplay.scrollHeight
}


showEventLogBtn.addEventListener('click', function(e){
    if(e.srcElement.innerHTML == 'Hide'){
        hide(eventLogDisplay)
        showEventLogBtn.innerHTML = 'Show'
    }else{
        show(eventLogDisplay)
        showEventLogBtn.innerHTML = 'Hide'
    }
    
})