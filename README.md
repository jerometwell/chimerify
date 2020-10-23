# Chimerify
A CLI for merging animals (badly)

![example chimera](example.png)

```sh
Usage: chimerify <head> <body> [options]

Options:
  -h, --help          Show help                                        [boolean]
      --version       Show version number                              [boolean]
      --list-animals  List all available animals                       [boolean]
      --sfx           use sound effects              [boolean] [default: "true"]
```

```sh
chimerify dog pig

# turn off sfx
chimerify dog pig --no-sfx
```

## Animal Addition Guide

The first step in creating your new animal hybrid is to ensure you have a healthy stock of base animals to choose from for your experiments. The initial set of animals can be further expanded by adding your own.

### Assets

To enable your animal to be viewed and merged, you will need two images one for the head, and one for the body. These should be a side view with the animals head expected on the right-hand side.

These need placing in the assets folder and should following the naming convention:
* `[animal]-head.png`
* `[animal]-body.png`

i.e. `pig-head.png`

To create new animals, the easiest approach is to take the assets from an existing animal and modify them to suit your purposes. 

If you do wish to create your own aim for heads of about 67*67 pixels and bodies of 256*256 pixels. 

For best results use simple textures and colours as most terminals will struggle to render these.

### Data

To create an animal, add a new key to the ANIMALS const in animals.js with the id of your animal (look at the others for metadata inspiration). 

An example for a dog might look like the below:

```js
"dog": {//This is the key that will be used to identify the animal
        //When merging this is the split used for the name
        prefix: "d", 
        suffix: "og",
        //When merging this is the split used for the sound the animal makes
        soundPrefix: "woo",
        soundSuffix: "f",
        //This controls the head's position
        head: {
            x: -5,
            y: -5,
            scale: 10
        },
        //This controls the body's position as well as the expected animal colour
        body: {
            x: 155,
            y: 40,
            baseColor: "#E2B266",
            rotate: -30,
            scale: 80
        }
    }
```

### Layout

Some trial and error might be required to get the x/y/rotate parameters correct for head and body.

Example parameters can be seen in the above data. 
