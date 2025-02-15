import {
  openDB
} from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', {
        keyPath: 'id',
        autoIncrement: true
      });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log("put to the database")
  const jateDB = await openDB("jate", 1)
  const TX = jateDB.transaction("jate", "readwrite")
  const store = TX.objectStore("jate")
  const request = store.put({
    id: 1,
    value: content
  })
  const result = await request
  console.log("data saved to database", result.value)
}

// } console.error('putDb not implemented');

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log("get from database")
  const jateDB = await openDB("jate", 1)
  const TX = jateDB.transaction("jate", "readonly")
  const store = TX.objectStore("jate")
  const request = store.put({
    id: 1,
    value: content
  })
  const result = await request
  result
    ?
    console.log("data retreived form database", result.value) :
    console.log("data not found in database")
}
console.error('getDb not implemented');


initdb();