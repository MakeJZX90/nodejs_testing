'use strict';
//const CONCURRENCY = process.env.WEB_CONCURRENCY || 1;
var Cg = require('./app-config.js');

const express = require("express");
const app = express();
const sql = require('mssql')

var cookieParser = require("cookie-parser");
var path = require('path');
var bodyParser = require('body-parser');
const jsonParser = express.json();
var JsonFind = require('json-find');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('views', path.join(__dirname + '/views'));
app.engine('html', require('hogan-express'));
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, '/public')));

/////////////////////////

var start_day = (new Date()).getDay()
var uuid = require('uuid');
var IsRestarted = false;
var pool;


sql.on('error', err => {
    console.log('Error on sql query', err);
})


async function startApp() {
    return new Promise(async function(resolve, reject) {
        try {
            console.log('Cg.cnf.HttpPort=' + Cg.cnf.HttpPort)
            pool = await sql.connect(Cg.db_options)
            let qr = await pool.request().query('SELECT GETDATE() as curdate')
            console.log('date=' + JSON.stringify(qr.recordset[0]))
            resolve();
        } catch (err) {
            console.log('Error on startApp', err);
            reject(err);
        } finally {

        }
    });
}

startApp().then(function() {
    console.log('service started successfully ' + (new Date()));
    IsRestarted = true;
}).catch(function(err) {
    console.error('error on app begin', err)
});

var router = express.Router();

router.get('/',  function(req, res, next) {
    try {
        console.log('uuid of request =  ' + uuid());

        res.render('index', { title: ' (заголовок) ' });
    } catch (error) {
        res.sendStatus(400);
        console.log('Error on get ' + error);
    }
});

router.post("/req_getEmp", async function(req, res, next) {
    try {
        let qr = await pool.request().query("select emp.id id,  emp.dname name,   count(w_material.idw) countmat , ISNULL(sum(w_material.price), 0) summat "+
            " from (select id, emp.surname + ' ' + SUBSTRING(emp.name, 1, 1) +'.' + " +
            " ' ' + SUBSTRING(emp.patternname, 1, 1) +'.' dname from emp) emp left join w_material  on emp.id = w_material.idw " +
            " group by emp.id, emp.dname  order by id")     
        return res.json(qr.recordset);
    } catch (error) {
        console.log('Ошибка при выполнении запроса на сервер req_getEmp ' + error)
        return res.json({ "Status_message": "Ошибка при выполнении запроса на сервер" });
    }
});

router.get("/getData", async function(req, res, next) {
    try {
        if (IsRestarted == false) {
            console.error("Не запущен");
            return res.send("Не запущен");
        }
      //  console.log(' headers=' + JSON.stringify(req.headers));
      //  console.log(' req.query=' + JSON.stringify(req.query));
        let ClientData = { id: req.query.id}
        let qr = await pool.request().query('select emp.id id, emp.name name, emp.surname surname, emp.patternname pattern, '+ 
            '  w_material.material material, w_material.price price from emp left join w_material  on emp.id = w_material.idw ' +
            ' where emp.id =' + ClientData.id);
        res.render('resultmat',  {id: qr.recordset[0].id, "surname": qr.recordset[0].surname, "name": qr.recordset[0].name, "pattern": qr.recordset[0].pattern, "data": qr.recordset} );
    } catch (error) {
        console.log('Ошибка при выполнении запроса на сервер getData ' + error)
        return res.json({ "Status_message": "Ошибка при выполнении запроса на сервер" });
    }
});

router.post("/DeleteEmp", async function(req, res, next) {
    try {
        if (IsRestarted == false) {
            console.error("Не запущен");
            return res.send("Не запущен");
        }

        let ClientData = JsonFind(req.body);
        let qr = await pool.request().query('delete from emp where id = '+ClientData.id)
        res.json({"Status_message" : "successfully"});
    } catch (error) {
        console.log('Ошибка при выполнении запроса на сервер DeleteEmp ' + error)
        return res.json({ "Status_message": "Ошибка при выполнении запроса на сервер" });
    }
});

router.post("/InsertEmp", async function(req, res, next) {
    try {
        if (IsRestarted == false) {
            console.error("Не запущен");
            return res.send("Не запущен");
        }

        let ClientData = JsonFind(req.body);
       let qr = await pool.request();
         qr.input('name', sql.NVarChar, ClientData.name)
         qr.input('surname', sql.NVarChar, ClientData.surname)
         qr.input('pattern', sql.NVarChar, ClientData.pattern)
        await qr.query('insert into emp (name,surname,patternname) values (@name, @surname, @pattern)', (err, result) => {
            console.dir(result)
         })   

        res.json({"Status_message" : "ok"});
    } catch (error) {
        console.log('Ошибка при выполнении запроса на сервер InsertEmp ' + error)
        return res.json({ "Status_message": "Ошибка при выполнении запроса на сервер" });
    }
});


router.post("/req_getmat", async function(req, res) {
    try {
        if (IsRestarted == false) {
            console.error("Не запущен");
            return res.send("Не запущен");
        }

        let ClientData = JsonFind(req.body);
        let qr = await pool.request().query('select id, row_number() over(ORDER BY id) rown, material, price from w_material where idw = ' + ClientData.idw + ' order by id');
        res.json(qr.recordset);
    } catch (error) {
        console.log('Ошибка при выполнении запроса на сервер req_getmat ' + error)
        return res.json({ "Status_message": "Ошибка при выполнении запроса на сервер" });
    }
});

router.post("/DB_oper", async function(req, res, next) {
    try {
        if (IsRestarted == false) {
            console.error("Не запущен");
            return res.send("Не запущен");
        }
        let ClientData = JsonFind(req.body);
     //   console.log('DB_oper ClientData = ' + JSON.stringify(ClientData)) 
        let qr;
        for(var i = 0; i < ClientData.data.length; i++) {
            var item = ClientData.data[i];
            switch (item.send_type) {
                case 1:
                     qr = await pool.request();
                     qr.input('id', sql.NVarChar, item.id)
                     qr.input('material', sql.NVarChar, item.material)
                     qr.input('price', sql.NVarChar, item.price)
                     await qr.query('insert into w_material (idw,material,price) values (@id, @material, @price)')
                 /*    await qr.query('insert into w_material (idw,material,price) values (@id, @material, @price)', (err, result) => {
                        console.log(' InsMat comepleted')
                     }) */
                    break;
                case 2:
                    qr = await pool.request();
                    qr.input('id', sql.NVarChar, item.id)
                    qr.input('material', sql.NVarChar, item.material)
                    qr.input('price', sql.NVarChar, item.price)
                    await qr.query('update w_material  set material =@material , price = @price where id = @id')
                  /*  await qr.query('update w_material  set material =@material , price = @price where id = @id', (err, result) => {
                        console.log(' update comepleted')
                     }) */
                    break;
                case 3:
                     qr = await pool.request();
                     await qr.query('delete from w_material where id = ' + item.id);
                 /*    await qr.query('delete from w_material where id = ' + item.id, (err, result) => {
                        console.log(' delete comepleted')
                     })  */
                    break;
                default:
                    break;
            }
        }

        res.json({"Status_message" : "ok"});
    } catch (error) {
        console.log('Ошибка при выполнении запроса на сервер DB_oper ' + error)
        return res.json({ "Status_message": "Ошибка при выполнении запроса на сервер" });
    }
});


/* APP EXIT  */

process.on('unhandledRejection', (reason, err) => {
    console.log('Unhandled Rejection at: Promise', err, 'reason:', reason);
});
process.on('uncaughtException', function(err) {
    console.error('uncaughtException error text ' + err);
});


process.stdin.resume();
/* APP EXIT  */


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use('/', router);

var http = require('http');
var server = http.createServer(app);
server.listen(Cg.cnf.HttpPort , Cg.cnf.path);

// catch 404 and forward to error handler
/*router.use(function(req, res, next) {
    // next(createError(404));
});*/

module.exports = app;