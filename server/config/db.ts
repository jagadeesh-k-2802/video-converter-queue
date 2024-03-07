import { JSONFilePreset } from 'lowdb/node';

// Using local JSON based db for simplicity
const createDB = async () => {
  const defaultData = { jobs: {} };
  const db = await JSONFilePreset('db.json', defaultData);
  return db;
};

export default createDB;
