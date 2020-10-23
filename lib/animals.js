const sharp = require("sharp");
const path = require("path");

let assetPath;

function setAssetPath(path) {
    assetPath = path;
}

const ANIMALS = {
    "pig": {
        prefix: "p",
        suffix: "ig",
        soundPrefix: "oi",
        soundSuffix: "nk",
        head: {
            x: 15,
            y: 10,
            scale: -30
        },
        body: {
            x: 170,
            y: 70,
            baseColor: "#E4BA9E",
            rotate: 0,
            scale: 100
        }
    },
    "chicken": {
        prefix: "ch",
        suffix: "icken",
        soundPrefix: "clu",
        soundSuffix: "ck",
        head: {
            x: 0,
            y: 10,
            scale: -20
        },
        body: {
            x: 110,
            y: 5,
            baseColor: "#DCDBDC",
            rotate: -70,
            scale: 100
        }
    },
    "dog": {
        prefix: "d",
        suffix: "og",
        soundPrefix: "woo",
        soundSuffix: "f",
        head: {
            x: -5,
            y: -5,
            scale: 10
        },
        body: {
            x: 155,
            y: 40,
            baseColor: "#E2B266",
            rotate: -30,
            scale: 80
        }
    },
    "whale": {
        prefix: "wh",
        suffix: "ale",
        soundPrefix: "Spla",
        soundSuffix: "sh",
        head: {
            x: 0,
            y: -10,
            scale: 0
        },
        body: {
            x: 155,
            y: 40,
            baseColor: "#099cec",
            rotate: -30,
            scale: 80
        }
    }
}

class Chimera {
    constructor({name, image, headAnimal, bodyAnimal}) {
        this.name = name;
        this.image = image;
        this.headAnimal = headAnimal;
        this.bodyAnimal = bodyAnimal;
    }
}

class Animal {
    constructor({id, prefix, suffix, soundPrefix, soundSuffix, head, body}) {
        this.id = id;
        this.prefix = prefix;
        this.suffix = suffix;
        this.soundPrefix = soundPrefix;
        this.soundSuffix = soundSuffix;
        this.head = head;
        this.body = body;
    }

    get headImage() {
        return sharp(path.join(assetPath, `${this.id}-head.png`));
    }
    get bodyImage() {
        return sharp(path.join(assetPath, `${this.id}-body.png`));
    }

    get sound() {
        return path.join(assetPath, `${this.id}-sound.wav`);
    }
}


async function mergeAnimals({head: headAnimal, body: bodyAnimal}) {
    const name = headAnimal.prefix + bodyAnimal.suffix;

    const head = headAnimal.head;
    const body = bodyAnimal.body;

    const scale = ((body.scale || 100) + (head.scale || 0));

    const transformedHead = await headAnimal.headImage
            .rotate(body.rotate, {background: "#00000000"})
            .resize( scale, null, {position: "left"})
            .tint(body.baseColor)
            .toBuffer()

    const image = bodyAnimal
            .bodyImage
            .composite( [ {input: transformedHead,  top: body.y + head.y, left: body.x + head.x}] )
    
    return new Chimera({name, image, headAnimal, bodyAnimal});
}


function getAnimal(id) {
    const data = ANIMALS[id];

    if (!data){
        return null;
    }
    return new Animal({
        ...data,
        id
    });
}

function getAnimalIds() {
    return Object.keys(ANIMALS);
}

module.exports = {
    getAnimal,
    mergeAnimals,
    getAnimalIds,
    setAssetPath
}