
module.exports = function(app, passport) {



    /*app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    })

    app.get('/home',function(req,res){
        res.render('home.ejs');// load the home.ejs file
    })*/


    app.get('/signUp',function(req,res){
        res.render('signUp',{message:req.flash('signupMessage')}); // load the signUp.ejs file
    })

    app.get('/login',function(req,res){
        res.render('login',{message:req.flash('loginMessage')}); //load the login.ejs file
    })

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));



    // =====================================
    // PROFILE SECTION =========================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile', {
            user : req.user
           // get the user out of session and pass to template
        });
        //console.log(req.user.id);
        //console.log(req.isAuthenticated());
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });


    // route middleware to make sure
    function isLoggedIn(req, res, next) {

        // if user is authenticated in the session, carry on
        if (req.isAuthenticated())
            return next();

        // if they aren't redirect them to the home page
        res.redirect('/login');
    }



};