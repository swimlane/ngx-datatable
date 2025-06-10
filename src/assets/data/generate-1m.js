const fs = require('fs');
const path = require('path');

const generateData = numEntries => {
  const data = [];
  for (let i = 0; i < numEntries; i++) {
    data.push({
      id: i + 1,
      name: `Item ${i + 1}`,
      gender: Math.random() > 0.5 ? 'male' : 'female',
      age: Math.floor(Math.random() * 100),
      address: {
        state: `State ${Math.floor(Math.random() * 50) + 1}`,
        city: `City ${Math.floor(Math.random() * 100) + 1}`
      }
    });
  }
  return data;
};

const writeDataToFile = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

const outputPath = path.join(__dirname, '1m.json');
const data = generateData(1000000);
writeDataToFile(outputPath, data);
console.log(`Generated 1 million entries and saved to ${outputPath}`);
