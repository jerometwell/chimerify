#!/usr/bin/env node
const {getAnimal, mergeAnimals, getAnimalIds} = require("./animals");
const terminalImage = require("terminal-image");

function displayHelp() {
    console.log("usage: chimera [head] [body]");
    console.log("Animals: ", getAnimalIds());
}

async function display(chimera) {
    console.log(`${chimera.headAnimal.id} + ${chimera.bodyAnimal.id}`)
    
    console.log(await terminalImage.buffer(await chimera.image.toBuffer(), {width: 50, height: 20}) );
    console.log(`The ${chimera.name} says ${chimera.headAnimal.soundPrefix}${chimera.bodyAnimal.soundSuffix}!`);
}

async function main() {
    try {
        const [headName, bodyName] = process.argv.slice(2);

        if(headName == "--help" || headName == "-h") {
            displayHelp();
            return;
        }

        if(!headName || !bodyName) {
            throw new Error("Missing Animal Parameters");
        }

        const head = getAnimal(headName);
        if(!head) {
            throw new Error(`Unknown animal: ${headName}`);
        }

        const body = getAnimal(bodyName);
        if(!body) {
            throw new Error(`Unknown animal: ${bodyName}`);
        }

        const chimera = await mergeAnimals({head, body});

        await display(chimera);
    } catch (e) {
        console.error(`👀 Oops! `, e);
    }
}

main();