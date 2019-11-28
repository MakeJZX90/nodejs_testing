var db_options = {}
var cnf = {}

function SetDbOption() {
    if (process.argv[2] == "test_home") {
        cnf = {
            showlog: false,
            HttpPort: 80,
            path: "127.0.0.1"
        }
        db_options = {
            user: 'sa',
            password: 'sa',
            server: 'localhost',
            database: 'testdb'
        };
    }
    if (process.argv[2] == "cit") {
        cnf = {
            showlog: false,
            HttpPort: 8080,
            path: "127.0.0.1"
        }
        db_options = {
            user: 'sa',
            password: 'sa',
            server: 'localhost',
            database: 'testms'
        };
    }
}

SetDbOption();

module.exports.db_options = db_options;
module.exports.SetDbOption = SetDbOption;
module.exports.cnf = cnf;