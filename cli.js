#!/usr/bin/env node
const yargs = require('yargs/yargs');
const package = require("./package.json");
const terminalImage = require("terminal-image");

function listAnimals() {
    console.log("Animals: ", getAnimalIds());
}

async function showChimera(chimera) {
    console.log(`${chimera.headAnimal.id} + ${chimera.bodyAnimal.id}`)
    
    console.log(await terminalImage.buffer(await chimera.image.toBuffer(), {width: 50, height: 20}) );
    console.log(`The ${chimera.name} says ${chimera.headAnimal.soundPrefix}${chimera.bodyAnimal.soundSuffix}!`);
}

function assertAnimal(id) {
    const animal = getAnimal(id);
    if(!animal) {
        throw new Error(`Unknown animal: ${id}`);
    }

    return animal;
}


const argParser = yargs()
    .usage('Usage: $0 <head> <body> [options]')
    .help('h')
    .version(package.version)
    .option('list-animals', {
        type: 'boolean',
        description: 'List all available animals'
    })

async function main(args) {
    try {
        if(args.listAnimals) {
            return listAnimals();
        }
        const [headId, bodyId] = args._

        if(!headId || !bodyId) {
            throw new Error(`You must provide two animals!`);
        }

        const head = assertAnimal(headId);
        const body = assertAnimal(bodyId);

        const chimera = await mergeAnimals({head, body});

        await showChimera(chimera);
    } catch (e) {
        console.error(`👀 Oops! `, e);
    }
}

const args = argParser.parse(process.argv.slice(2));
main(args);