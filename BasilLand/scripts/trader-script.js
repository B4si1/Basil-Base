import { worldLogic } from "./game-loop-script.js";
import { LogDisplay } from "./game-loop-script.js";

import { hide } from "./helper-functions.js";

import { traderExitBtn } from "./doc-object-script.js";
import { traderDisplay } from "./doc-object-script.js";
import { openTraderBtn } from "./doc-object-script.js";

const sellFoodBtn = document.getElementById('sell-food')
const sellWoodBtn = document.getElementById('sell-wood')
const sellStoneBtn = document.getElementById('sell-stone')
const sellWorkerBtn = document.getElementById('sell-worker')

const buyFoodBtn = document.getElementById('buy-food')
const buyWoodBtn = document.getElementById('buy-wood')
const buyStoneBtn = document.getElementById('buy-stone')
const buyWorkerBtn = document.getElementById('buy-worker')

const minFoodTrade = 101
const minWoodTrade = 101
const minStoneTrade = 50
const minWorkerTrade = 1
const minGoldTrade = 1


export function updateTraderButtonDisplay(){
    traderSellButtonHelper(worldLogic.food, minFoodTrade, sellFoodBtn)
    traderSellButtonHelper(worldLogic.wood, minWoodTrade, sellWoodBtn)
    traderSellButtonHelper(worldLogic.stone, minStoneTrade, sellStoneBtn)
    traderSellButtonHelper(worldLogic.idleWorkers, minWorkerTrade, sellWorkerBtn)

    traderBuyButtonHelper(worldLogic.gold, minGoldTrade, buyFoodBtn)
    traderBuyButtonHelper(worldLogic.gold, minGoldTrade, buyWoodBtn)
    traderBuyButtonHelper(worldLogic.gold, minGoldTrade, buyStoneBtn)
    traderBuyButtonHelper(worldLogic.gold, 100, buyWorkerBtn)


}

function traderSellButtonHelper(resource, minresource, button){
    if(resource < minresource){
        button.classList.add('unable')
    }else{
        button.classList.remove('unable')
    }
}

function traderBuyButtonHelper(gold, minGold, button){
    if(gold < minGold){
        button.classList.add('unable')
    }else{
        button.classList.remove('unable')
    }
}

sellFoodBtn.addEventListener('click', function(e){
    if(worldLogic.food > minFoodTrade){
        worldLogic.food = worldLogic.food - 100;
        worldLogic.gold++;
        LogDisplay.eventLog('<img class="log-img-scale" src="./BasilLand/images/trader-seller.png"></img> Sold [100] food for [1] gold!', 'yellow')
    } else {
        LogDisplay.eventLog('Not enough food!', 'red', 'alert')
    }
})

sellWoodBtn.addEventListener('click', function(e){
    if(worldLogic.wood > minWoodTrade){
        worldLogic.wood = worldLogic.wood - 100;
        worldLogic.gold++;
        LogDisplay.eventLog('<img class="log-img-scale" src="./BasilLand/images/trader-seller.png"></img> Sold [100] wood for [1] gold!', 'yellow')
    } else {
        LogDisplay.eventLog('Not enough wood!', 'red', 'alert')
    }
})

sellStoneBtn.addEventListener('click', function(e){
    if(worldLogic.stone > minStoneTrade){
        worldLogic.stone = worldLogic.stone - 50;
        worldLogic.gold++;
        LogDisplay.eventLog('<img class="log-img-scale" src="./BasilLand/images/trader-seller.png"></img> Sold [100] stone for [1] gold!', 'yellow')
    } else {
        LogDisplay.eventLog('Not enough stone!', 'red', 'alert')
    }
})

sellWorkerBtn.addEventListener('click', function(e){
    if(worldLogic.idleWorkers > 0){
        if(worldLogic.workers > minWorkerTrade){
            worldLogic.workers = worldLogic.workers - 1;
            worldLogic.gold += 10;
            LogDisplay.eventLog('<img class="log-img-scale" src="./BasilLand/images/trader-seller.png"></img> Sold [1] worker for [10] gold!', 'yellow')
        } else {
            LogDisplay.eventLog('Not enough workers!', 'red', 'alert')
        }
    }else{
        LogDisplay.eventLog('Can only sell Idle Workers!', `red`, 'alert')
    }
    
})

buyFoodBtn.addEventListener('click', function(e){
    if(worldLogic.food < (worldLogic.townStorage.food * worldLogic.storage) - 99){
        if(worldLogic.gold >= minGoldTrade){
            worldLogic.food = worldLogic.food + 100;
            worldLogic.gold--;
            LogDisplay.eventLog('<img class="log-img-scale" src="./BasilLand/images/trader-seller.png"></img> Bought [100] food for [1] gold!', 'yellow')
        } else {
            LogDisplay.eventLog('Not enough gold!', 'red', 'alert')
        }
    }else{
        LogDisplay.eventLog('Not enough storage!', 'red', 'alert')
    }
    
})

buyWoodBtn.addEventListener('click', function(e){
    if(worldLogic.wood < (worldLogic.townStorage.wood * worldLogic.storage) - 99){
        if(worldLogic.gold >= minGoldTrade){
            worldLogic.wood = worldLogic.wood + 100;
            worldLogic.gold--;
            LogDisplay.eventLog('<img class="log-img-scale" src="./BasilLand/images/trader-seller.png"></img> Bought [100] wood for [1] gold!', 'yellow')
        } else {
            LogDisplay.eventLog('Not enough gold!', 'red', 'alert')
        }
    }else{
        LogDisplay.eventLog('Not enough storage!', 'red', 'alert')
    }
    
})

buyStoneBtn.addEventListener('click', function(e){
    if(worldLogic.stone < (worldLogic.townStorage.stone * worldLogic.storage) - 49){
        if(worldLogic.gold >= minGoldTrade){
            worldLogic.stone = worldLogic.stone + 50;
            worldLogic.gold--;
            LogDisplay.eventLog('<img class="log-img-scale" src="./BasilLand/images/trader-seller.png"></img> Bought [50] stone for [1] gold!', 'yellow')
        } else {
            LogDisplay.eventLog('Not enough gold!', 'red', 'alert')
        }
    }else{
        LogDisplay.eventLog('Not enough storage!', 'red', 'alert')
    }
    
})

buyWorkerBtn.addEventListener('click', function(e){
        if(worldLogic.gold > 100){
        
            if(worldLogic.workers < worldLogic.maxWorkers){
                worldLogic.workers++;
                worldLogic.gold - worldLogic.gold - 100;
                LogDisplay.eventLog('<img class="log-img-scale" src="./BasilLand/images/trader-seller.png"></img> Bought [1] worker for [100] gold!', 'yellow')
            }else{LogDisplay.eventLog('Town at capacity!', 'red', 'alert')}
        
        } else {
            LogDisplay.eventLog('Not enough gold!', 'red', 'alert')
        }    
})

traderExitBtn.addEventListener('mouseover', function(e){
    e.target.src = './BasilLand/images/open.png'
})

traderExitBtn.addEventListener('mouseleave', function(e){
    e.target.src = './BasilLand/images/closed.png'
})

traderExitBtn.addEventListener('click', function(e){
    hide(traderDisplay)
    openTraderBtn.innerHTML = `Trade`
})