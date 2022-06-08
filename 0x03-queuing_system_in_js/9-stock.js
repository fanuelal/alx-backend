import express from 'express';
import redis from 'redis';
import { promisify } from 'util';

const client = redis.createClient();
const app = express();
const clientGet = promisify(client.get).bind(client);
const clientSet = promisify(client.set).bind(client);
const listProducts = [
  { Id: 1, name: 'Suitcase 250', price: 50, stock: 0 },
  { Id: 2, name: 'Suitcase 450', price: 100, stock: 10 },
  { Id: 3, name: 'Suitcase 650', price: 350, stock: 2 },
  { Id: 4, name: 'Suitcase 1050', price: 550, stock: 15 }
]
const getItemById = (id) => {
    for(const item in listProducts){
	if (item.Id === id) return item;
    }
}

const reserveStockById = async(itemId, stock) => {
    await clientSet(itemId, stock);
}

const getCurrentReservedStockById = async(itemId) => {
    const reserved = await clientGet(itemId);
    return reserved;
}
const app = express();
app.listen(1245, () => {
    listProducts.forEach((product) => reserveStockById(product.itemId,
						       product.initialAvailableQuantity))
});
app.get('/list_products', (req, res) => res.send(JSON.stringify(listProducts)));
app.get('/list_products/:itemId', async (req, res) => {
  const id = Number(req.params.itemId);
  const item = getItemById(id);

  if (item.length > 0){
      item.currentQuality = stock;
      res.json(item);
      return;
  }
    res.status(404).json({ status: 'Product not found'});
});

app.get('/reserve_product/:itemId', async (req, res) => {
    const itemId = Number(req.params.itemId);
  
    const item = getItemById(itemId);
  
    if (item.length < 1) {
      res.status(404).json({ status: 'Product not found' });
      return;
    }
  
    const stock = await getCurrentReservedStockById(itemId);
  
    if (stock < 1) {
      res.status(403).json({ status: 'Not enough stock available', itemId });
      return;
    }

    reserveStockById(itemId, stock);
    res.json({ status: 'Reservation confirmed', itemId });
});


const client = redis.createClient();
const get = promisify(client.get).bind(client);

function reserveStockById(itemId, stock) {
    client.set(itemId, stock);
}
  
async function getCurrentReservedStockById(itemId) {
    const stock = await get(itemId);
    return stock;
}
