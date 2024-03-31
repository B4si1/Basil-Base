import { worldLogic } from "./game-loop-script.js";
import { LogDisplay } from "./game-loop-script.js";

import { refineIdeasBtn, towerDisplay } from "./doc-object-script.js";

import { hide } from "./helper-functions.js";

import { towerFoodBuffBtn } from "./doc-object-script.js";
import { towerWoodBuffBtn } from "./doc-object-script.js";
import { towerStoneBuffBtn } from "./doc-object-script.js";
import { towerIdeaBuffBtn } from "./doc-object-script.js";
import { towerGoldBuffBtn } from "./doc-object-script.js";
import { towerHouseBuffBtn } from "./doc-object-script.js";
import { towerWorkerBuffBtn } from "./doc-object-script.js";
import { towerExitBtn } from "./doc-object-script.js";

import { openTowerBtn } from "./doc-object-script.js";
import { buffer } from "./buff-display-script.js";

let buffCost = 50
let goldBuffCost = 200
let houseSpawnBuff = 500
let refineCost = 200
let refinedIdeasGain = 5

export function updateTowerBtnDisplay(){
    if(worldLogic.idea <= refineCost){
        refineIdeasBtn.classList.add('unable')
    }else{
        refineIdeasBtn.classList.remove('unable')
    }
}

refineIdeasBtn.addEventListener('click', function(e){
    if(worldLogic.idea <= refineCost){
        LogDisplay.eventLog('Not Enough ideas!', 'red', 'alert')
    }else{
        worldLogic.idea -= refineCost;
        worldLogic.refinedIdeas += refinedIdeasGain;
        LogDisplay.eventLog('<img class="log-img-scale" src="./BasilLand/images/refinedidea.png"></img> Refined 200 Ideas ', 'yellow') // <img class="log-img-scale" src="./BasilLand/images/refinedidea.png"></img>
    }
})

towerFoodBuffBtn.addEventListener('click', function(e){
    if(worldLogic.refinedIdeas >= buffCost){
        if(worldLogic.towerBuffProductionStatus.food == false){
            worldLogic.towerBuffProductionStatus.food = true;
            if(buffer.buffs.food.status == false){
                buffer.buffs.food.status = true
            }
            worldLogic.refinedIdeas -= buffCost
            LogDisplay.eventLog('<img class="log-img-scale" src="./BasilLand/images/farming.png"></img> Farming buff [10] Days', 'purple')
        }else{
            LogDisplay.eventLog('Buff already active!' , 'red', 'alert')
        }
    }else{
        LogDisplay.eventLog('Not enough refined ideas', 'red', 'alert')
    }
})

towerWoodBuffBtn.addEventListener('click', function(e){
    if(worldLogic.refinedIdeas >= buffCost){
        if(worldLogic.towerBuffProductionStatus.wood == false){
            worldLogic.towerBuffProductionStatus.wood = true;
            if(buffer.buffs.wood.status == false){
                buffer.buffs.wood.status = true
            }
            worldLogic.refinedIdeas -= buffCost
            LogDisplay.eventLog('<img class="log-img-scale" src="./BasilLand/images/lumbering.png"></img> Lumber buff [10] Days', 'purple')
        }else{
            LogDisplay.eventLog('Buff already active!' , 'red', 'alert')
        }
    }else{
        LogDisplay.eventLog('Not enough refined ideas', 'red', 'alert')
    }
})

towerStoneBuffBtn.addEventListener('click', function(e){
    if(worldLogic.refinedIdeas >= buffCost){
        if(worldLogic.towerBuffProductionStatus.stone == false){
            worldLogic.towerBuffProductionStatus.stone = true;
            if(buffer.buffs.stone.status == false){
                buffer.buffs.stone.status = true
            }
            worldLogic.refinedIdeas -= buffCost
            LogDisplay.eventLog('<img class="log-img-scale" src="./BasilLand/images/mining.png"></img> Mining buff [10] Days', 'purple')
        }else{
            LogDisplay.eventLog('Buff already active!' , 'red', 'alert')
        }
    }else{
        LogDisplay.eventLog('Not enough refined ideas', 'red', 'alert')
    }
})

towerIdeaBuffBtn.addEventListener('click', function(e){
    if(worldLogic.refinedIdeas >= buffCost){
        if(worldLogic.towerBuffProductionStatus.idea == false){
            worldLogic.towerBuffProductionStatus.idea = true;
            if(buffer.buffs.idea.status == false){
                buffer.buffs.idea.status = true
            }
            worldLogic.refinedIdeas -= buffCost
            LogDisplay.eventLog('<img class="log-img-scale" src="./BasilLand/images/thinking.png"></img> Thinking buff [10] Days', 'purple')
        }else{
            LogDisplay.eventLog('Buff already active!' , 'red', 'alert')
        }
    }else{
        LogDisplay.eventLog('Not enough refined ideas', 'red', 'alert')
    }
})

towerGoldBuffBtn.addEventListener('click', function(e){
    if (worldLogic.goldFind.level < 50){
        if(worldLogic.refinedIdeas >= goldBuffCost){
            worldLogic.goldFind.level ++;
            worldLogic.goldFind.chance ++;
            worldLogic.refinedIdeas -= goldBuffCost
            LogDisplay.eventLog('<img class="log-img-scale" src="./BasilLand/images/goldfind.png"></img> Gold Find Chance Increased', 'yellow')
        }else{
            LogDisplay.eventLog('Not enough refined ideas', 'red', 'alert')
        }
    }else{
        LogDisplay.eventLog(`Gold Find Maxed`, 'red', 'alert')
    }
    
})

towerHouseBuffBtn.addEventListener('click', function(e){
    if(worldLogic.towerUpgradeBuff.houseBuffStatus == false){
        if(worldLogic.refinedIdeas > houseSpawnBuff){
            worldLogic.refinedIdeas -= houseSpawnBuff
            worldLogic.houseCapacity *= worldLogic.towerUpgradeBuff.housecapacity
            worldLogic.maxWorkers *= worldLogic.towerUpgradeBuff.housecapacity
            LogDisplay.eventLog(`<img class="log-img-scale" src="./BasilLand/images/roomupgrade.png"></img> House Buff Applied`, 'purple')
            worldLogic.towerUpgradeBuff.houseBuffStatus = true
            buffer.buffs.house.status = true
        }else{
            LogDisplay.eventLog('Not enough refined ideas', 'red', 'alert')
        }
    }else{
        LogDisplay.eventLog(`House Buff Already Applied`, 'red', 'alert')
    }
})


towerWorkerBuffBtn.addEventListener('click', function(e){
    if(worldLogic.towerUpgradeBuff.workerBuffStatus == false){
        if(worldLogic.refinedIdeas > houseSpawnBuff){
            worldLogic.refinedIdeas -= houseSpawnBuff
            worldLogic.workerSpawnRate = 2;
            LogDisplay.eventLog(`<img class="log-img-scale" src="./BasilLand/images/twinupgrade.png"></img> Twins Buff Applied`, 'purple')
            worldLogic.towerUpgradeBuff.workerBuffStatus = true
            buffer.buffs.worker.status = true
        }else{
            LogDisplay.eventLog('Not enough refined ideas', 'red', 'alert')
        }
    }else{
        LogDisplay.eventLog(`House Buff Already Applied`, 'red', 'alert')
    }
})


towerExitBtn.addEventListener('mouseover', function(e){
    e.target.src = './BasilLand/images/open.png'
})

towerExitBtn.addEventListener('mouseleave', function(e){
    e.target.src = './BasilLand/images/closed.png'
})

towerExitBtn.addEventListener('click', function(e){
    hide(towerDisplay)
    openTowerBtn.innerHTML = `Enter Tower`
})