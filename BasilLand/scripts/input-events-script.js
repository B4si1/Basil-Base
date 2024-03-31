// Importing required variables from external scripts
import {
    foodCollection,
    woodCollection,
    stoneCollection,
    ideaCollection,
    assignFoodBtn,
    assignStoneBtn,
    assignWoodBtn,
    assignIdeaBtn,
    recallFoodBtn,
    recallIdeaBtn,
    recallStoneBtn,
    recallWoodBtn,
    createWorkerBtn,
    createHouseBtn,
    createStorageBtn,
    createTraderBtn,
    createtowerBtn,
    openTraderBtn,
    openTowerBtn,
    traderUpkeep,
    towerUpkeep,
    traderDisplay,
    towerDisplay,
    towerStatusDisplay,
    traderStatusDisplay
} from "./doc-object-script.js";

import { worldLogic, LogDisplay } from "./game-loop-script.js";
import { hide, show } from "./helper-functions.js";

const resourceMultiplyer = {
    food: 2,
    wood: 2,
    stone: 2,
    idea: 1,
}

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
function assignWorker(workerType, log) {
    if (worldLogic.idleWorkers > 0) {
        worldLogic[workerType]++;
        worldLogic.idleWorkers--;
        LogDisplay.eventLog(`<img class="log-img-scale" src="./BasilLand/images/plu.png"></img> ${log} Worker`, 'green');
    }
}

// Function to handle recalling workers
function recallWorker(workerType, log) {
    if (worldLogic[workerType] > 0) {
        worldLogic[workerType]--;
        worldLogic.idleWorkers++;
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
    show(traderUpkeep);
    show(openTraderBtn);
    traderStatusDisplay.classList.remove('upkeep');
    traderStatusDisplay.innerHTML = `Open!`;
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
        createStorageBtn.innerHTML = 'Maxed!';
        createHouseBtn.style.backgroundColor = 'orange';
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
    show(towerUpkeep);
    show(openTowerBtn);
    towerStatusDisplay.classList.remove('upkeep');
    towerStatusDisplay.innerHTML = `Open!`;
}

// Function to handle opening/closing trader or tower
function openShopHelper(type) {
    if (type == 'trader') {
        if (openTraderBtn.innerHTML == `Trade`) {
            show(traderDisplay);
            openTraderBtn.innerHTML = `Close Trade`;
        } else {
            hide(traderDisplay);
            openTraderBtn.innerHTML = `Trade`;
        }
    } else {
        if (openTowerBtn.innerHTML == `Enter Tower`) {
            show(towerDisplay);
            openTowerBtn.innerHTML = `Leave Tower`;
        } else {
            hide(towerDisplay);
            openTowerBtn.innerHTML = `Enter Tower`;
        }
    }
}

// Add event listeners
foodCollection.addEventListener('click', () => collectResource('food'));
woodCollection.addEventListener('click', () => collectResource('wood'));
stoneCollection.addEventListener('click', () => collectResource('stone'));
ideaCollection.addEventListener('click', () => collectResource('idea'));
assignFoodBtn.addEventListener('click', () => assignWorker('foodWorkers', 'Food'));
assignWoodBtn.addEventListener('click', () => assignWorker('woodWorkers', 'Wood'));
assignStoneBtn.addEventListener('click', () => assignWorker('stoneWorkers', 'Stone'));
assignIdeaBtn.addEventListener('click', () => assignWorker('ideaWorkers', 'Idea'));
recallFoodBtn.addEventListener('click', () => recallWorker('foodWorkers', 'Food'));
recallWoodBtn.addEventListener('click', () => recallWorker('woodWorkers', 'Wood'));
recallStoneBtn.addEventListener('click', () => recallWorker('stoneWorkers', 'Stone'));
recallIdeaBtn.addEventListener('click', () => recallWorker('ideaWorkers', 'Idea'));
createWorkerBtn.addEventListener('click', spawnWorker);
createHouseBtn.addEventListener('click', createHouse);
createTraderBtn.addEventListener('click', createTrader);
createStorageBtn.addEventListener('click', upgradeStorage);
createtowerBtn.addEventListener('click', createTower);
openTraderBtn.addEventListener('click', () => openShopHelper('trader'));
openTowerBtn.addEventListener('click', () => openShopHelper('tower'));


document.addEventListener('click', function(e){
    const target = e.target

    if(target === foodCollection){
        collectResource('food')
    }else if(target === woodCollection){
        collectResource('wood')
    } 
    // and add others in here ..
})