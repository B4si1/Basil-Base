import * as docElement from './doc-object-script.js';

import { redAlert } from "./event-log-script.js";
import { worldLogic, LogDisplay } from "./game-loop-script.js";
import { hide, show } from "./helper-functions.js";


const resourceMultiplyer = {
    food: 2,
    wood: 2,
    stone: 2,
    idea: 1,
}

let SHIFTED = false;

document.addEventListener('keydown', function(e){
    if (e.keyCode == '16'){
        SHIFTED = true
    }
})

document.addEventListener('keyup', function(e){
    if (e.keyCode == '16'){
        SHIFTED = false
    }
})

// Function to handle resource collection
function collectResource(resourceType) {
    let amount = Math.floor(Math.random() * 5 + 1);
    if (worldLogic.towerBuffProductionStatus[resourceType] == true) {
        amount *= resourceMultiplyer[resourceType];
    }
    worldLogic[resourceType] += amount;
    LogDisplay.eventLog(`<img class="log-img-scale" src="./BasilLand/images/${resourceType}.png"></img> gathered ${amount} ${resourceType}`, 'green');
}

// Function to handle assigning workers
function assignWorker(workerType, log, shift) {
    let increase = 1
    shift && worldLogic.idleWorkers > 10 ? increase = 10 : increase = 1;
    if (worldLogic.idleWorkers > 0) {
        worldLogic[workerType] += increase;
        worldLogic.idleWorkers -= increase;
        LogDisplay.eventLog(`<img class="log-img-scale" src="./BasilLand/images/plu.png"></img> ${log} Worker`, 'green');
    }
}

// Function to handle recalling workers
function recallWorker(workerType, log, shift) {
    let decrease = 1
    shift && worldLogic[workerType] > 10 ? decrease = 10 : decrease = 1;
    if (worldLogic[workerType] > 0) {
        worldLogic[workerType] -= decrease;
        worldLogic.idleWorkers += decrease;
        LogDisplay.eventLog(`<img class="log-img-scale" src="./BasilLand/images/minu.png"></img> ${log} Worker`, 'green');
    }
}

// Function to spawn a worker
function spawnWorker() {
    worldLogic.workers += worldLogic.workerSpawnRate;
    worldLogic.food -= worldLogic.workerCost.food;
    LogDisplay.eventLog('<img class="log-img-scale" src="./BasilLand/images/worker.png"></img> Worker Created', 'yellow');
}

// Function to create a house
function createHouse() {
    worldLogic.houses++;
    worldLogic.wood -= worldLogic.housesCost.wood;
    worldLogic.stone -= worldLogic.housesCost.stone;
    LogDisplay.eventLog('<img class="log-img-scale" src="./BasilLand/images/house.png"></img> House Created', 'yellow');
}

// Function to create a trader
function createTrader() {
    worldLogic.trader++;
    worldLogic.wood -= worldLogic.traderCost.wood;
    worldLogic.stone -= worldLogic.traderCost.stone;
    worldLogic.food -= worldLogic.traderCost.stone;
    LogDisplay.eventLog('<img class="log-img-scale" src="./BasilLand/images/trader.png"></img> Trader Open!', 'yellow');
    show(docElement.traderUpkeep);
    show(docElement.openTraderBtn);
    docElement.traderStatusDisplay.classList.remove('upkeep');
    docElement.traderStatusDisplay.innerHTML = `Open!`;
}

// Function to upgrade storage
function upgradeStorage() {
    if (worldLogic.storage <= 49) {
        worldLogic.storage++;
        worldLogic.wood -= worldLogic.storageCost.wood;
        worldLogic.stone -= worldLogic.storageCost.stone;
        LogDisplay.eventLog('<img class="log-img-scale" src="./BasilLand/images/storageup.png"></img> Storage Upgraded', 'yellow');
    } else {
        LogDisplay.eventLog('Storage Maxed!', 'red', 'alert');
    }
    if (worldLogic.storage == 50) {
        docElement.createStorageBtn.innerHTML = 'Maxed!';
        docElement.createHouseBtn.style.backgroundColor = 'orange';
    }
}

// Function to create a tower
function createTower() {
    worldLogic.tower++;
    worldLogic.stone -= worldLogic.towerCost.stone;
    worldLogic.food -= worldLogic.towerCost.food;
    worldLogic.wood -= worldLogic.towerCost.wood;
    worldLogic.gold -= worldLogic.towerCost.gold;
    worldLogic.idea -= worldLogic.towerCost.idea;
    LogDisplay.eventLog('<img class="log-img-scale" src="./BasilLand/images/tower.png"></img> Tower Created!', 'yellow');
    show(docElement.towerUpkeep);
    show(docElement.openTowerBtn);
    docElement.towerStatusDisplay.classList.remove('upkeep');
    docElement.towerStatusDisplay.innerHTML = `Open!`;
}

// Function to handle opening/closing trader or tower
function openShopHelper(type) {
    if (type == 'trader') {
        if (docElement.openTraderBtn.innerHTML == `Trade`) {
            show(docElement.traderDisplay);
            docElement.openTraderBtn.innerHTML = `Close Trade`;
        } else {
            hide(docElement.traderDisplay);
            docElement.openTraderBtn.innerHTML = `Trade`;
        }
    } else {
        if (docElement.openTowerBtn.innerHTML == `Enter Tower`) {
            show(docElement.towerDisplay);
            docElement.openTowerBtn.innerHTML = `Leave Tower`;
        } else {
            hide(docElement.towerDisplay);
            docElement.openTowerBtn.innerHTML = `Enter Tower`;
        }
    }
}

// Add event listeners
docElement.foodCollection.addEventListener('click', () => collectResource('food'));
docElement.woodCollection.addEventListener('click', () => collectResource('wood'));
docElement.stoneCollection.addEventListener('click', () => collectResource('stone'));
docElement.ideaCollection.addEventListener('click', () => collectResource('idea'));
docElement.assignFoodBtn.addEventListener('click', () => assignWorker('foodWorkers', 'Food', SHIFTED));
docElement.assignWoodBtn.addEventListener('click', () => assignWorker('woodWorkers', 'Wood', SHIFTED));
docElement.assignStoneBtn.addEventListener('click', () => assignWorker('stoneWorkers', 'Stone', SHIFTED));
docElement.assignIdeaBtn.addEventListener('click', () => assignWorker('ideaWorkers', 'Idea', SHIFTED));
docElement.recallFoodBtn.addEventListener('click', () => recallWorker('foodWorkers', 'Food', SHIFTED));
docElement.recallWoodBtn.addEventListener('click', () => recallWorker('woodWorkers', 'Wood', SHIFTED));
docElement.recallStoneBtn.addEventListener('click', () => recallWorker('stoneWorkers', 'Stone', SHIFTED));
docElement.recallIdeaBtn.addEventListener('click', () => recallWorker('ideaWorkers', 'Idea', SHIFTED));
docElement.createWorkerBtn.addEventListener('click', spawnWorker);
docElement.createHouseBtn.addEventListener('click', createHouse);
docElement.createTraderBtn.addEventListener('click', createTrader);
docElement.createStorageBtn.addEventListener('click', upgradeStorage);
docElement.createtowerBtn.addEventListener('click', createTower);
docElement.openTraderBtn.addEventListener('click', () => openShopHelper('trader'));
docElement.openTowerBtn.addEventListener('click', () => openShopHelper('tower'));

