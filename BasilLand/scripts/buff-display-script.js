import { buffDisplay } from "./doc-object-script.js";

class WorldBuffs {
    constructor() {
        this.buffs = {
            food: { name: 'food-buff', status: false, timer: 10, image: `<img id="food-buff" src="./BasilLand/images/food.png" title="Farming" class="hidden"></img>` },
            wood: { name: 'wood-buff', status: false, timer: 10, image: `<img id="wood-buff" src="./BasilLand/images/wood.png" title="Lumbering" class="hidden"></img>` },
            stone: { name: 'stone-buff', status: false, timer: 10, image: `<img id="stone-buff" src="./BasilLand/images/stone.png" title="Mining" class="hidden"></img>` },
            idea: { name: 'idea-buff', status: false, timer: 10, image: `<img id="idea-buff" src="./BasilLand/images/idea.png" title="Thinking" class="hidden"></img>` },
            house: { name: 'house-buff', status: false, timer: 10, image: `<img id="house-buff" src="./BasilLand/images/roomupgrade.png" title="More Rooms" class="hidden"></img>` },
            worker: { name: 'worker-buff', status: false, timer: 10, image: `<img id="worker-buff" src="./BasilLand/images/twinupgrade.png" title="Twins" class="hidden"></img>` }
        };

        this.log = Object.values(this.buffs);
    }

    updateBuffTimers() {
        for (const buff of this.log) {
            if (buff.status && buff.name !== 'house-buff' && buff.name !== 'worker-buff') {
                buff.timer -= 0.001;
                if (buff.timer <= 0) {
                    buff.status = false;
                    buff.timer = 10;
                }
            }
        }
    }

    populateBuffBar() {
        buffDisplay.innerHTML = this.log.map(buff => buff.image).join('');
    }

    eventLog() {
        for (const buff of this.log) {
            const buffImg = document.getElementById(buff.name);
            buffImg.classList.toggle('hidden', !buff.status);
        }
    }
}

export const buffer = new WorldBuffs();
buffer.populateBuffBar();
