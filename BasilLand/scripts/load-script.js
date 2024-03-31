import { worldLogic } from "./game-loop-script.js";
import { buffer } from "./buff-display-script.js";

import { hide } from "./helper-functions.js";
import { show } from "./helper-functions.js";

import { traderDisplay } from "./doc-object-script.js";
import { openTraderBtn } from "./doc-object-script.js";
import { openTowerBtn } from "./doc-object-script.js";
import { traderUpkeep } from "./doc-object-script.js";
import { towerUpkeep } from "./doc-object-script.js";
import { towerStatusDisplay } from "./doc-object-script.js";
import { traderStatusDisplay } from "./doc-object-script.js";
import { towerDisplay } from "./doc-object-script.js";

import { reset } from "./save-reset-script.js";
import { save } from "./save-reset-script.js";

function buffLoadHelper(buffString, buffStatePath){
    console.log(`${typeof(buffString)} : ${typeof(buffStatePath)}`)
    buffStatePath
    if (localStorage.getItem(buffString) == 'true'){
        buffStatePath = true
    }else{
        buffStatePath = false
    }
}
// Load Function to load previous game 
window.onload = function() {
    // Check to see if an instance is stored 
    // If true asign Saved values to Game instance
    // If false Use starting Values (New Game)
    if(localStorage.getItem(`basil-played`) == `true`){
        worldLogic.food = storage('basil-food')
        worldLogic.stone = storage('basil-stone')
        worldLogic.wood = storage('basil-wood')
        worldLogic.gold = storage('basil-gold')
        worldLogic.idea = storage('basil-idea')
        worldLogic.refinedIdeas = storage('basil-refinedIdeas')
        worldLogic.workers = storage('basil-workers')
        worldLogic.maxWorkers = storage('basil-maxWorkers')
        worldLogic.houseCapacity = storage('basil-houseCapacity')
        worldLogic.idleWorkers = storage('basil-idleWorkers')
        worldLogic.foodWorkers = storage('basil-foodWorkers')
        worldLogic.woodWorkers = storage('basil-woodWorkers')
        worldLogic.stoneWorkers = storage('basil-stoneWorkers')
        worldLogic.ideaWorkers = storage('basil-ideaWorkers')
        worldLogic.goldFind.level = localStorage.getItem('basil-tower-gold-buff-level')
        worldLogic.goldFind.chance = localStorage.getItem('basil-tower-gold-buff-chance')
        worldLogic.workerSpawnRate = storage('basil-tower-worker-spawn-rate')
        worldLogic.houseCapacity = storage('basil-tower-house-buff-houseCapacity')
        worldLogic.autosave = storage('basil-autosave')
        worldLogic.autosaveEnabled = localStorage.getItem('basil-autosaveEnabled')

        // buffLoadHelper('basil-tower-food-buff', worldLogic.towerBuffProductionStatus.food)
        // buffLoadHelper('basil-tower-wood-buff', worldLogic.towerBuffProductionStatus.wood)
        // buffLoadHelper('basil-tower-stone-buff', worldLogic.towerBuffProductionStatus.stone)
        // buffLoadHelper('basil-tower-idea-buff', worldLogic.towerBuffProductionStatus.idea)
        // buffLoadHelper('basil-tower-house-buff', worldLogic.towerUpgradeBuff.houseBuffStatus)
        // buffLoadHelper('basil-tower-worker-buff', worldLogic.towerUpgradeBuff.workerBuffStatus)


        // buffLoadHelper('basil-buff-farming', buffer.food.status)
        // buffLoadHelper('basil-buff-lumbering', buffer.wood.status)
        // buffLoadHelper('basil-buff-mining', buffer.stone.status)
        // buffLoadHelper('basil-buff-thinking', buffer.idea.status)
        // buffLoadHelper('basil-buff-house', buffer.house.status)
        // buffLoadHelper('basil-buff-worker', buffer.worker.status)

        if (localStorage.getItem('basil-tower-food-buff') == 'true'){
            worldLogic.towerBuffProductionStatus.food = true
        }else{
            worldLogic.towerBuffProductionStatus.food = false
        }
        if (localStorage.getItem('basil-tower-wood-buff') == 'true'){
            worldLogic.towerBuffProductionStatus.wood = true
        }else{
            worldLogic.towerBuffProductionStatus.wood = false
        }
        if (localStorage.getItem('basil-tower-stone-buff') == 'true'){
            worldLogic.towerBuffProductionStatus.stone = true
        }else{
            worldLogic.towerBuffProductionStatus.stone = false
        }
        if (localStorage.getItem('basil-tower-idea-buff') == 'true'){
            worldLogic.towerBuffProductionStatus.idea = true
        }else{
            worldLogic.towerBuffProductionStatus.idea = false
        }
        
        if(localStorage.getItem('basil-tower-house-buff') == 'true'){
            worldLogic.towerUpgradeBuff.houseBuffStatus = true
        }else{
            worldLogic.towerUpgradeBuff.houseBuffStatus = false
        } 
        if(localStorage.getItem('basil-tower-worker-buff') == 'true'){
            worldLogic.towerUpgradeBuff.workerBuffStatus = true
        }else{
            worldLogic.towerUpgradeBuff.workerBuffStatus = false
        } 
        
        if(localStorage.getItem('basil-buff-farming') == 'true'){
            buffer.buffs.food.status = true
        }else{
            buffer.buffs.food.status = false
        }
        
        if(localStorage.getItem('basil-buff-lumbering') == 'true'){
            buffer.buffs.wood.status = true
        }else{
            buffer.buffs.wood.status = false
        }
        
        if(localStorage.getItem('basil-buff-mining') == 'true'){
            buffer.buffs.stone.status = true
        }else{
            buffer.buffs.stone.status = false
        }

        if(localStorage.getItem('basil-buff-thinking') == 'true'){
            buffer.buffs.idea.status = true
        }else{
            buffer.buffs.idea.status = false
        }
        
        if(localStorage.getItem('basil-buff-house') == 'true'){
            buffer.buffs.house.status = true
        }else{
            buffer.buffs.house.status = false
        }
        
        if(localStorage.getItem('basil-buff-worker') == 'true'){
            buffer.buffs.worker.status = true
        }else{
            buffer.buffs.worker.status = false
        }
    
        if(localStorage.getItem('basil-workers') == 0){
            worldLogic.workers = 2;
        }else{
            worldLogic.workers = storage('basil-workers')
        }
        
        if(localStorage.getItem('basil-houses') == 0){
            worldLogic.houses = 1;
        }else{
            worldLogic.houses = storage('basil-houses')
        }
       
        if(localStorage.getItem('basil-storage') == 0){
            worldLogic.storage = 1;
        }else{
            worldLogic.storage = storage('basil-storage')
        }
        
        if(localStorage.getItem('basil-trader') == 0){
            worldLogic.trader = 0;
        }else{
            worldLogic.trader = localStorage.getItem('basil-trader')
            traderAndTowerLoadUIHelper('basil-trader')
        }

        if(localStorage.getItem('basil-tower') == 0){
            worldLogic.tower = 0;
        }else{
            worldLogic.tower = localStorage.getItem('basil-tower')
            traderAndTowerLoadUIHelper('basil-tower')
        }
        
        if(localStorage.getItem('basil-time') == 0){
            worldLogic.worldTime = 0;
        }else{
            worldLogic.worldTime = storage('basil-time')
        }
    
    // Set played value to true, so that on load saved values know to load or start fresh
    }else{
        localStorage.setItem(`basil-played`, `true`)
        worldLogic.reset()
        reset()
        save()
    } 
};
// localStorage.clear()



// Trader and Tower Load Helper
export function traderAndTowerLoadUIHelper(type){
    if(type == 'basil-trader'){
        traderStatusDisplay.classList.remove('upkeep')
        traderStatusDisplay.innerHTML = `Open!`
        hide(traderDisplay)
        show(openTraderBtn)
        show(traderUpkeep)
    }else{
        towerStatusDisplay.classList.remove('upkeep')
        towerStatusDisplay.innerHTML = `Open!`
        hide(towerDisplay)
        show(openTowerBtn)
        show(towerUpkeep)
    }

}

// Load helper function
function storage(text){
    return Math.floor(localStorage.getItem(text))
}