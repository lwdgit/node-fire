const test = require('ava');
const exec = require('./_exec');
const testDir = 'quick_test' + Math.random();

test('test2 with second param', (t) => {
    let ret = exec(command, '');
    t.regex(ret, new RegExp(testDir));
    ret = exec(cleanCommand, '');
    t.regex(ret, new RegExp('^((?!' + testDir + ')[\\w\\W])+$'), 'rm failed, you may delete it manualy');
    t.pass();
});


let command = `
cd ../ && mkdir ${testDir} && cd ${testDir}
cat << EOF > package.json
{
  "scripts": {
    "open": "fire open http://127.0.0.1",
    "copy": "fire shelljs cp ...package.json,package.json2",
    "combo": "fire mathjs random 0 100 | xargs touch ",
    "math": "fire mathjs add 42423.321 32132",
    "ls": "fire shelljs ls stdout"
  },
  "devDependencies": {
    "mathjs": "^3.9.3",
    "open": "^0.0.5",
    "shelljs": "^0.7.6",
    "node-fire": "latest"
  }
}
EOF

npm install
npm run math
npm run copy
npm run combo
npm run ls

`;
let cleanCommand = `
cd ..
rm -rf ${testDir}
ls
`;