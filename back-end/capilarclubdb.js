const fs = require('fs')
const bodyParser = require('body-parser')
const jsonServer = require('json-server')
const jwt = require('jsonwebtoken')


const server = jsonServer.create()
const router = jsonServer.router('./db/database.json')
const admindb = JSON.parse(fs.readFileSync('./db/admins.json', 'UTF-8'))
const customerdb = JSON.parse(fs.readFileSync('./db/customers.json', 'UTF-8'))
const workerdb = JSON.parse(fs.readFileSync('./db/workers.json', 'UTF-8'))
const productdb = JSON.parse(fs.readFileSync('./db/products.json', 'UTF-8'))
const appointmentdb = JSON.parse(fs.readFileSync('./db/appointments.json', 'UTF-8'))
const orderdb = JSON.parse(fs.readFileSync('./db/orders.json', 'UTF-8'))
const servicedb = JSON.parse(fs.readFileSync('./db/services.json', 'UTF-8'))
const actionsdb = JSON.parse(fs.readFileSync('./db/actions.json', 'UTF-8'))

const institutedb = JSON.parse(fs.readFileSync('./db/institutes.json', 'UTF-8'))
const labsdb = JSON.parse(fs.readFileSync('./db/labs.json', 'UTF-8'))
const programsdb = JSON.parse(fs.readFileSync('./db/programs.json', 'UTF-8'))
const partnersdb = JSON.parse(fs.readFileSync('./db/partners.json', 'UTF-8'))

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(jsonServer.defaults());

const SECRET_KEY = "./config/config.json"
const expiresIn = '1h'


// Create a token from a payload 
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn })
}

// Verify the token 
function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ? decode : err)
}

// Check if the user exists in database
function isAuthenticated({ customername, password, }) {
  return customerdb.customers.findIndex(customer => customer.customername === customername && customer.password === password) !== -1
}

function adminisAuthenticated({ username, password, }) {
  return admindb.admins.findIndex(admin => admin.username === username && admin.password === password) !== -1
}

////////////////////////////// New User ////////////////////////////////

server.post('/api/customers/register', (req, res) => {
  console.log("register endpoint called; request body:");
  console.log(req.body);
  const { customername, password, } = req.body;

  if (isAuthenticated({ customername, password }) === true) {
    const status = 401;
    const message = 'Customer Name and Password already exist';
    res.status(status).json({ status, message });
    return
  }

  const access_token = createToken({ customername, password })
  console.log("Access Token:" + access_token);
  res.status(200).json({ access_token })


  fs.readFile("./db/customers.json", (err, data) => {
    if (err) {
      const status = 401
      const message = err
      res.status(status).json({ status, message })
      return
    };

    // Get current users data
    var data = JSON.parse(data.toString());

    // Get the id of last user
    const customer = (req.body);

    var id = data.customers.length ? Math.max(...data.customers.map(x => x.id)) + 1 : 1;
    data.customers.push({
      id: id,
      ...customer

    });

    var writeData = fs.writeFile("./db/customers.json", JSON.stringify(data), (err, result) => {  // WRITE

      if (err) {
        const status = 401
        const message = err
        res.status(status).json({ status, message })
        return

      }

    });
  });

})

////////////////////////////// New Admin ////////////////////////////////

server.post('/api/admin/register', (req, res) => {
  console.log("register endpoint called; request body:");
  console.log(req.body);
  const { username, password, } = req.body;

  if (isAuthenticated({ username, password }) === true) {
    const status = 401;
    const message = 'Username and Password already exist';
    res.status(status).json({ status, message });
    return
  }

  const access_token = createToken({ username, password })
  console.log("Access Token:" + access_token);
  res.status(200).json({ access_token })


  fs.readFile("./db/admins.json", (err, data) => {
    if (err) {
      const status = 401
      const message = err
      res.status(status).json({ status, message })
      return
    };

    // Get current users data
    var data = JSON.parse(data.toString());



    // Get the id of last user
    const admin = (req.body);

    var id = data.admins.length ? Math.max(...data.admins.map(x => x.id)) + 1 : 1;
    data.admins.push({
      id: id,
      ...admin

    });

    var writeData = fs.writeFile("./db/admins.json", JSON.stringify(data), (err, result) => {  // WRITE

      if (err) {
        const status = 401
        const message = err
        res.status(status).json({ status, message })
        return

      }

    });
  });

})

////////////////////////// Authenticate ///////////////////////////

server.post('/api/customers/authenticate', (req, res) => {
  console.log("login endpoint called; request body:");

  console.log(req.body);
  const { customername, password } = req.body;
  const access_token = createToken({ customername, password, })
  console.log("Access Token:" + access_token);

  const customer = customerdb.customers.find(u => u.customername === customername && u.password === password);
  const appointments = appointmentdb.appointments.filter(x => x.customer_id === customer.id );
  const orders = orderdb.orders.filter(x => x.customer_id === customer.id );


  if (isAuthenticated({ customername, password }) === false) {
    const status = 401
    const message = 'Incorrect user name or password'
    res.status(status).json({ status, message })
    return

  }

  if (isAuthenticated({ customername, password }) === true) {
    const { password, ...userWithoutPassword } = customer;
    res.status(200).json({ access_token, ...userWithoutPassword, })

  }

})

////////////////////////// Admin Authenticate ///////////////////////////

server.post('/api/admin/authenticate', (req, res) => {
  console.log("login endpoint called; request body:");

  console.log(req.body);
  const { username, password } = req.body;
  const access_token = createToken({ username, password, })
  console.log("Access Token:" + access_token);

  const admin = admindb.admins.find(u => u.username === username && u.password === password);

  if (adminisAuthenticated({ username, password }) === false) {
    const status = 401
    const message = 'Incorrect user name or password'
    res.status(status).json({ status, message })
    return

  }

  if (adminisAuthenticated({ username, password }) === true) {
    const { password, ...userWithoutPassword } = admin;
    res.status(200).json({access_token, ...userWithoutPassword})
 
  }

})

/////////////////////////////// Refresh-Token ////////////////

server.post('/api/customers/refresh-token', (req, res) => {

  res.status(200).json({  })

})

server.get('/api/customers', (req, res) => {
    const customers = customerdb.customers;
    res.status(200).json(customers)

})

server.get('/api/workers', (req, res) => {
  const workers = workerdb.workers;
  res.status(200).json(workers)

})

server.get('/api/appointments', (req, res) => {
  const appointments = appointmentdb.appointments;
  res.status(200).json(appointments)

})

server.get('/api/orders', (req, res) => {
  const orders = orderdb.orders;
  res.status(200).json(orders)

})

server.get('/api/products', (req, res) => {
  const products = productdb.products;
  res.status(200).json(products)

})

server.get('/api/services', (req, res) => {
  const services = servicedb.services;
  res.status(200).json(services)

})

server.get('/api/actions', (req, res) => {
  const actions = actionsdb.actions;
  res.status(200).json(actions)

})

server.get('/api/institutes', (req, res) => {
  const institutes = institutedb.institutes;
  res.status(200).json(institutes)

})

server.get('/api/labs', (req, res) => {
  const labs = labsdb.labs;
  res.status(200).json(labs)

})

server.get('/api/programs', (req, res) => {
  const programs = programsdb.programs;
  res.status(200).json(programs)

})

server.get('/api/partners', (req, res) => {
  const partners = partnersdb.partners;
  res.status(200).json(partners)

})

server.use(/^(?!\/api).*$/, (req, res, next) => {
  if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
    const status = 401
    const message = 'Error in authorization format'
    res.status(status).json({ status, message })
    return
  }
  try {
    let verifyTokenResult;
    verifyTokenResult = verifyToken(req.headers.authorization.split(' ')[1]);

    if (verifyTokenResult instanceof Error) {
      const status = 401
      const message = 'Access token not provided'
      res.status(status).json({ status, message })
      return
    }
    next()
  } catch (err) {
    const status = 401
    const message = 'Error access_token is revoked'
    res.status(status).json({ status, message })
  }
})

/////////////////////////////////////////////////////// Files ///////////////////////////////////////////////////

// New File



// SET STORAGE



server.use(router)

server.listen(5000, () => {
  console.log('CapilarClub API on port 5000')
})