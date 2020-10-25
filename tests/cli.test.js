const path = require('path');
const exec = require('child_process').exec;
const {getAnimalIds} = require("../lib/animals");

/**
 * exec the cli with the passed args and cwd
 */
function cli(args = [], cwd = '.') {
    return new Promise(resolve => {
        exec(`node ${path.resolve('./cli.js')} ${args.join(' ')}`,
            { cwd },
            (error, stdout, stderr) => {
                const code = error && error.code ? error.code : 0;
                resolve({
                    code,
                    error,
                    stdout,
                    stderr
                })
            }
        )
    })
}

describe("--version", () => {
    let result;
    beforeEach(async () => {
        result = await cli(['--version']);
    });
    it("should exit successfully", () => {
        expect(result.code).toBe(0);
    })
});

describe("Merge Tests", () => {
    const animals = getAnimalIds();

    // produce a test for every animal combination
    animals.forEach((id1, ix1) => {
        animals.forEach((id2, ix2) => {
            test(`chimerify ${id1} ${id2}`, async() => {
                result = await cli([id1, id2, "--no-sfx"]);

                expect(result.code).toBe(0);
            })
        });
    });
});

