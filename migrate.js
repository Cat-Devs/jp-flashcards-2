const fs = require('fs');
const dataModel = require('./data model/jp_flashcards.json');
const FLASHCARDS_SEED = __dirname + '/offline/migrations/flashcards-seed.json';

let data = [];

const cleanup = () => {
  try {
    fs.unlinkSync(FLASHCARDS_SEED);
  } catch (err) {
    console.log('file does not exist');
  }
};

const add = (item) => {
  data.push(item);
};

const save = (item) => {
  fs.appendFileSync(FLASHCARDS_SEED, JSON.stringify(item, null, 2), {
    encoding: 'utf8',
  });
};

(() => {
  cleanup();
  const tableData = dataModel.DataModel[0].TableData;
  for (let i = 0; i < tableData.length; i++) {
    const tableDataItem = Object.keys(tableData[i])
      .map((item) => ({ [item]: Object.values(tableData[i][item])[0] }))
      .reduce((acc, curr) => ({ ...acc, ...curr }));

    add(tableDataItem);
  }
  save(data);
})();
