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