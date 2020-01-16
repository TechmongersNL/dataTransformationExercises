const rawData = [
  {
    Men_117: "67.5",
    testKey: 10,
    Women_118: "55",
    Periods: "1900JJ00"
  },
  {
    Men_117: "68.5",
    testKey: 10,
    Women_118: "44",
    Periods: "1901JJ00"
  },
  {
    Men_117: "100.4",
    testKey: 10,
    Women_118: "50",
    Periods: "1902JJ00"
  },
  {
    Men_117: "200.5",
    testKey: 10,
    Women_118: "33",
    Periods: "1903JJ00"
  },
  {
    Men_117: "300",
    testKey: 10,
    Women_118: "21",
    Periods: "1904JJ00"
  }
];

/*
{
    id: "Men_117",
    data: [
      {
        x: 1900,
        y: 67.5
      }
    ]
  }
*/

const allKeys = Object.keys(rawData[0]); // ["men", "women", "periods"]

const ids = allKeys.slice(0, -1);

let arr = [];
ids.forEach(idName => arr.push({ id: idName, data: [] }));

/*
arr = [
  { id: key, data: [] },
  {...}
]
*/

rawData.forEach(dataPoint => {
  const keysToLookFor = arr.map(e => e.id);
  keysToLookFor.forEach(key => {
    const newdata = {
      x: dataPoint.Periods,
      y: dataPoint[key]
    };
    arr.find(el => el.id === key).data.push(newdata);
  });
});

console.log(arr);

/*
 {
    Men_117: "300",
    Women_118: "21",
    Periods: "1904JJ00"
  }
*/
