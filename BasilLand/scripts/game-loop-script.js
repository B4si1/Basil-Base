import { WorldLogic } from "./world-logic-script.js";
import { EventLogger } from "./event-log-script.js";
import { buffer } from "./buff-display-script.js";
import { startPauseControl, pausedDisplayText, helpDisplay, 
        assignFoodBtn, assignIdeaBtn, assignWoodBtn, 
        assignStoneBtn, recallFoodBtn, recallIdeaBtn, 
        recallStoneBtn, recallWoodBtn, createHouseBtn, 
        createWorkerBtn, createStorageBtn, createTraderBtn, 
        createtowerBtn, traderDisplay, towerDisplay, 
        gameTimeDisplay, goldDisplay, foodDisplay, woodDisplay, 
        stoneDisplay, ideaDisplay, foodWorkerDisplay, 
        woodWorkerDisplay, stoneWorkerDisplay, ideaWorkerDisplay, 
        foodProduction, woodProduction, stoneProduction, 
        ideaProduction, workersDisplay, housesDisplay, 
        workerUpkeep, housesUpkeep, traderUpkeep, towerUpkeep, 
        storageDisplay, goldTraderDisplay, towerIdeaDisplay, 
        towerGoldFindLevelDisplay, towerRefinedIdeasDisplay,
    } from "./doc-object-script.js";

import { autoSave } from "./save-reset-script.js";
import { hide, show, textParse } from "./helper-functions.js";
import { updateTraderButtonDisplay } from "./trader-script.js";
import { updateTowerBtnDisplay } from "./tower-script.js";

export const worldLogic = new WorldLogic();
export const LogDisplay = new EventLogger();

let foodGather = 10;
let woodGather = 10;
let stoneGather = 10;
let ideaGather = 2;

function addTowerBuffs() {
    // Apply tower buffs to resource gathering rates
    if (worldLogic.towerBuffProductionStatus.food == true) {
        foodGather = 100;
    } else {
        foodGather = 10;
    }
    if (worldLogic.towerBuffProductionStatus.wood == true) {
        woodGather = 100;
    } else {
        woodGather = 10;
    }
    if (worldLogic.towerBuffProductionStatus.stone == true) {
        stoneGather = 100;
    } else {
        stoneGather = 10;
    }
    if (worldLogic.towerBuffProductionStatus.idea == true) {
        ideaGather = 20;
    } else {
        ideaGather = 2;
    }
}

export function updateDisplay() {
    // Update all display elements
    const {
        foodProductionRate,
        woodProductionRate,
        stoneProductionRate,
        ideaProductionRate
    } = calculateProductionRates();

    updateGameTimeDisplay();
    updateResourceDisplays();
    updateWorkerDisplays();
    updateProductionDisplays(foodProductionRate, woodProductionRate, stoneProductionRate, ideaProductionRate);
    updateUpkeepDisplays();
    updateOtherDisplays();
    applyProductionLowWarning(foodProductionRate, woodProductionRate, stoneProductionRate, ideaProductionRate);
}

function calculateProductionRates() {
    // Calculate production rates
    addTowerBuffs();

    let foodProductionRate = (foodGather * worldLogic.foodWorkers) - (worldLogic.townUpkeep.worker * (worldLogic.workers - worldLogic.idleWorkers));
    let woodProductionRate = (woodGather * worldLogic.woodWorkers) - (worldLogic.townUpkeep.houses * worldLogic.houses);
    let stoneProductionRate = stoneGather * worldLogic.stoneWorkers;
    let ideaProductionRate = ideaGather * worldLogic.ideaWorkers;

    // Deduct trader and tower upkeep costs if applicable
    if (worldLogic.trader == 1) {
        woodProductionRate -= worldLogic.townUpkeep.trader.wood;
        stoneProductionRate -= worldLogic.townUpkeep.trader.stone;
    }
    if (worldLogic.tower == 1) {
        stoneProductionRate -= worldLogic.townUpkeep.tower.stone;
        ideaProductionRate -= worldLogic.townUpkeep.tower.ideas;
    }

    return { foodProductionRate, woodProductionRate, stoneProductionRate, ideaProductionRate };
}

function updateGameTimeDisplay() {
    // Update game time display
    gameTimeDisplay.innerHTML = `World Time : ${Math.floor(worldLogic.worldTime)} <span class='small'>(days)</span>`;
}

function updateResourceDisplays() {
    // Update resource displays
    goldDisplay.innerHTML = `<b>${formatNumber(worldLogic.gold)}</b>`;
    foodDisplay.innerHTML = `<b>${formatNumber(worldLogic.food)}/${formatNumber(worldLogic.townStorage.food * worldLogic.storage)}</b>`;
    woodDisplay.innerHTML = `<b>${formatNumber(worldLogic.wood)}/${formatNumber(worldLogic.townStorage.wood * worldLogic.storage)}</b>`;
    stoneDisplay.innerHTML = `<b>${formatNumber(worldLogic.stone)}/${formatNumber(worldLogic.townStorage.stone * worldLogic.storage)}</b>`;
    ideaDisplay.innerHTML = `<b>${formatNumber(worldLogic.idea)}</b>`;
}

function updateWorkerDisplays() {
    // Update worker displays
    foodWorkerDisplay.innerHTML = `(${worldLogic.foodWorkers} - workers)`;
    woodWorkerDisplay.innerHTML = `(${worldLogic.woodWorkers} - workers)`;
    stoneWorkerDisplay.innerHTML = `(${worldLogic.stoneWorkers} - workers)`;
    ideaWorkerDisplay.innerHTML = `(${worldLogic.ideaWorkers} - workers)`;
    workersDisplay.innerHTML = `<b>${worldLogic.workers}</b> <small>(${worldLogic.idleWorkers} idle)</small>`;
    housesDisplay.innerHTML = `<b>${worldLogic.houses}</b> <small>(${worldLogic.workers}/${worldLogic.maxWorkers} - workers)</small>`;
}

function updateProductionDisplays(foodProductionRate, woodProductionRate, stoneProductionRate, ideaProductionRate) {
    // Update production displays
    foodProduction.innerHTML = `${foodGather * worldLogic.foodWorkers} /day | (${foodProductionRate} /day)`;
    woodProduction.innerHTML = `${woodGather * worldLogic.woodWorkers} /day | (${woodProductionRate} /day)`;
    stoneProduction.innerHTML = `${stoneGather * worldLogic.stoneWorkers} /day | (${stoneProductionRate} /day)`;
    ideaProduction.innerHTML = `${ideaGather * worldLogic.ideaWorkers} /day | (${ideaProductionRate} /day)`;
}

function updateUpkeepDisplays() {
    // Update upkeep displays
    workerUpkeep.innerHTML = `-${worldLogic.townUpkeep.worker * (worldLogic.workers - worldLogic.idleWorkers)} food /day`;
    housesUpkeep.innerHTML = `-${worldLogic.townUpkeep.houses * worldLogic.houses} wood /day`;
    traderUpkeep.innerHTML = `-${worldLogic.townUpkeep.trader.wood} wood /day -${worldLogic.townUpkeep.trader.stone} stone /day`;
    towerUpkeep.innerHTML = `-${worldLogic.townUpkeep.tower.ideas} ideas /day -${worldLogic.townUpkeep.tower.stone} stone /day`;
}

function updateOtherDisplays() {
    // Update other displays
    storageDisplay.innerHTML = `<b>Level : ${worldLogic.storage}</b>`;
    goldTraderDisplay.innerHTML = `<b>${formatNumber(worldLogic.gold)}</b>`;
    towerIdeaDisplay.innerHTML = `<b>${formatNumber(worldLogic.idea)}</b>`;
    towerRefinedIdeasDisplay.innerHTML = `<b>${(worldLogic.refinedIdeas)}</b>`;
    towerGoldFindLevelDisplay.innerHTML = `${worldLogic.goldFind.level}`;
}

function applyProductionLowWarning(foodProductionRate, woodProductionRate, stoneProductionRate, ideaProductionRate) {
    // Apply production low warning to displays
    productionLowWarning(worldLogic.food, foodDisplay);
    productionLowWarning(worldLogic.wood, woodDisplay);
    productionLowWarning(worldLogic.stone, stoneDisplay);
    productionLowWarning(worldLogic.idea, ideaDisplay);
    productionLowWarning(worldLogic.idea, towerIdeaDisplay);
    productionLowWarning(foodProductionRate, foodProduction);
    productionLowWarning(woodProductionRate, woodProduction);
    productionLowWarning(stoneProductionRate, stoneProduction);
    productionLowWarning(ideaProductionRate, ideaProduction);
}

function productionLowWarning(resource, display) {
    // Apply CSS class 'upkeep' to display if resource is negative
    if (resource < 0) {
        display.classList.add('upkeep');
    } else {
        display.classList.remove('upkeep');
    }
}

function formatNumber(number) {
    // Format large numbers with 'k' suffix
    const formattedNumber = Math.floor(number).toLocaleString();

    if (number >= 1000) {
        const suffix = 'k';
        const truncatedNumber = parseFloat(formattedNumber.replace(/,/g, '')); // Remove commas and parse as float
        const roundedNumber = truncatedNumber >= 10000 ? (truncatedNumber / 1000).toFixed(1) : Math.floor(truncatedNumber / 100) / 10; // Round to 1 decimal place if >= 10k
        return roundedNumber + suffix;
    } else {
        return formattedNumber;
    }
}

// Function to update Resource Buttons
function updateResourceButtons() {
    // Show or hide resource assignment buttons based on available idle workers
    if (worldLogic.idleWorkers <= 0) {
        hide(assignFoodBtn);
        hide(assignWoodBtn);
        hide(assignStoneBtn);
        hide(assignIdeaBtn);
    } else {
        show(assignFoodBtn);
        show(assignWoodBtn);
        show(assignStoneBtn);
        show(assignIdeaBtn);
    }

    // Update recall buttons for each worker type
    recallButtonDisplay(worldLogic.ideaWorkers, recallIdeaBtn);
    recallButtonDisplay(worldLogic.foodWorkers, recallFoodBtn);
    recallButtonDisplay(worldLogic.stoneWorkers, recallStoneBtn);
    recallButtonDisplay(worldLogic.woodWorkers, recallWoodBtn);
}

// Helper function for Resource Buttons
function recallButtonDisplay(workerType, btnType) {
    // Show or hide recall button based on the number of workers of a specific type
    if (workerType > 0) {
        show(btnType);
    } else {
        hide(btnType);
    }
}

// Function to Update Town Buttons
function updateTownButtons() {
    // Show or hide town management buttons based on game state
    createButtonHelper(worldLogic.buildHouse, createHouseBtn);
    createButtonHelper(worldLogic.spawn, createWorkerBtn);
    createButtonHelper(worldLogic.buildtower, createtowerBtn);
    createButtonHelper(worldLogic.buildStorage, createStorageBtn);
    createButtonHelper(worldLogic.buildTrader, createTraderBtn);

    // Hide trader and tower display if they are not built
    if (worldLogic.trader == 0) {
        hide(traderDisplay);
    }
    if (worldLogic.tower == 0) {
        hide(towerDisplay);
    }
}

function createButtonHelper(condition, buttonType) {
    // Show or hide button based on condition
    if (condition) {
        show(buttonType);
    } else {
        hide(buttonType);
    }
}

let isPaused = false;

function gameStartandPause() {
    // Start or pause the game loop
    if (isPaused == false) {
        requestAnimationFrame(gameLoop);
    }
}

export function gameLoop() {
    // Main game loop
    worldLogic.handleEvents();
    LogDisplay.displayEvents();
    buffer.eventLog();
    buffer.updateBuffTimers();
    updateResourceButtons();
    updateTownButtons();
    updateDisplay();
    updateTraderButtonDisplay();
    updateTowerBtnDisplay();
    gameStartandPause();
    autoSave();
}

gameLoop();

// Store for Keyboard inputs
let input = [];

// Event Listener for keyboard inputs
document.addEventListener('keyup', function (e) {
    input += e.key;
    if (textParse('pause', input)) {
        show(pausedDisplayText);
        startPauseControl.src = './BasilLand/images/pause.png';
        isPaused = true;
    }
    if (textParse('start', input)) {
        hide(pausedDisplayText);
        startPauseControl.src = './BasilLand/images/Play.png';
        isPaused = false;
        gameLoop();
    }
    if (textParse('basil', input)) {
        cheat();
    }
    if (textParse('help', input)) {
        helpDisplay.classList.remove('hide-class');
    }
});

helpDisplay.addEventListener('click', function () {
    // Show or hide help display
    helpDisplay.classList.add('hide-class');
});

// Pause Play Button
startPauseControl.addEventListener('click', function (e) {
    // Event listener for pause/play button
    if (isPaused) {
        startPauseControl.src = './BasilLand/images/Play.png';
        isPaused = false;
        gameLoop();
        hide(pausedDisplayText);
    } else {
        startPauseControl.src = './BasilLand/images/pause.png';
        isPaused = true;
        show(pausedDisplayText);
    }
});

function cheat() {
    // Cheat function to set initial game state
    worldLogic.houses = 50;
    worldLogic.workers = 140;
    worldLogic.trader = 1;
    worldLogic.tower = 1;
    worldLogic.gold = 10000;
    worldLogic.food = 10000;
    worldLogic.wood = 10000;
    worldLogic.stone = 10000;
    worldLogic.refinedIdeas = 100000;
}
