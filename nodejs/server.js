/* -------------------------------------DAAAAAAAAAAAAAAAAMMM -----------------------------------------------------------------*/
var express = require('express'); // Créer un serveur
var morgan = require('morgan'); // Charge le middleware de logging
var favicon = require('serve-favicon'); // Charge le middleware de favicon
var bodyParser = require('body-parser'); // Parsing JSON
var session = require('express-session');
var logger = require('log4js').getLogger('Server');
var app = express();

app.use(morgan('combined')); // Active le middleware de logging

app.use(express.static(__dirname + '/public')); // Indique que le dossier /public contient des fichiers statiques (middleware chargé de base)
//app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: false }));
/*
 app.use(function (req, res) { // Répond enfin
 res.send('Hello world!');

 });
 */


// config
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

/* On affiche le formulaire d'enregistrement */

app.get('/', function(req, res){
    res.redirect('/login');
});

app.get('/login', function(req, res){
    res.render('login');
});

app.post('/login', function (req, res) {
    // TODO vérifier si l'utilisateur existe
    var username = req.body.username;
    var pass = req.body.password;
    check(username,pass,res);
});

app.get('/inscription', function (req, res) {
    // TODO ajouter un nouveau utilisateur
    res.render('register');
});
app.get('/rep', function (req, res) {
    res.render('rep');
});
app.post('/easy', function (req, res) {
    // TODO ajouter un nouveau utilisateur


    var mail = req.body.email;
    var nom = req.body.nom;
    var prenom = req.body.prenom;
    var sexe = req.body.sexe;
    var taille = req.body.taille;
    var tel = req.body.tel;
    var ville = req.body.ville;
    var site = req.body.website;
    var pass = req.body.password;
    var dateNaissance = req.body.birthdate;
    //var age = req.body.age;
    var photo = req.body.profilpic;
    var couleur = req.body.couleur;
    inscrire(mail,nom,prenom,sexe,taille,tel,ville,site,pass,dateNaissance,photo,couleur,res);

});
/* On affiche le profile  */
app.get('/profile', function (req, res) {
    // TODO

    if (session.open) {
        res.render('profile', {

            email: session.mail,
            nom: session.nom,
            prenom: session.prenom,
            profilepic: session.photo,
            couleur: session.couleur

        });
    }

    // On redirige vers la login si l'utilisateur n'a pas été authentifier
    //res.render('profile');
    // Afficher le button logout
});

app.post('/supprimerProfil', function (req, res) {
    if (session.open) {
        connection.query("delete from users where id = " + session.email, function (err, rows, fields) {
            if (!err) {
                logger.info('bien ouej t as suppr un compte!');;
                session.open = false;
            }
            else {
                logger.info('noob!');
            }
        });
    }
    else res.redirect('/login');
});

logger.info('server start');
app.listen(1313);

var mysql = require('mysql');


function check(username,pass,redir){
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'pictionnary'
    });

    connection.connect();

    connection.query("select * from users where email='" + username + "' AND password='"+pass+"'",function(err,rows, fields){
        if(!err) {
            if (rows.length > 0) {
                logger.info('Authentification valide !');

                session.open = true;
                session.mail = rows[0].email;
                session.nom = rows[0].nom;
                session.couleur = rows[0].couleur;
                session.prenom = rows[0].prenom;
                session.photo = rows[0].profilepic;

                redir.redirect('/profile');
            }
            else {
                logger.info('CA MARCHE PAS :(  !');
               redir.redirect('/login');
            }
        }
    });

    connection.end();
}


function inscrire(mail,nom,prenom,sexe,taille,tel,ville,site,pass,dateNaissance,photo,couleur,res){
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'pictionnary'
    });

    connection.connect();

    connection.query("INSERT INTO users (email,password,nom,prenom,tel,website,sexe,birthdate,ville,taille,couleur,profilepic) VALUES ('"+mail+"', '"+pass+"', '"+nom+"', '"+prenom+"','"+tel+"','"+site+"','"+sexe+"','"+dateNaissance+"','"+ville+"','"+taille+"','"+couleur+"','"+photo+"')" ,function(err,rows){
        if(!err) {

            logger.info('personne ajoutée!');
            /*
            session.open = true;
            session.mail = mail;
            session.nom = nom;
            session.prenom = prenom;
            session.photo = photo;
            session.couleur = couleur;
            */
            res.redirect('/rep');
            }
            else {
            logger.info('CA MARCHE PAS :(  !');
            throw err;
            }

    });

    connection.end();
}








