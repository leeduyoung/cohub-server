module.exports = function(router, passport) {
    router.use(passport.authenticate('bearer', {session:false}));
    
    router.get('/testapi', function(req, res) {
        res.json({secretData: 'abc123'});
    });

}