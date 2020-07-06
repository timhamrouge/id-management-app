export default (req, res, next) => {
    // if (req.session.loggedin && req.session.username) return res.redirect('home');
    
    // const { username, password } = req.body;

    // console.log(username, password);

    // // if no password and no user/email, do something
    // if (!username || !password) {
    //     return res.render('login', {
    //         foo: 'bar'
    //     })
    // } else next();


    // return res.render('login')
    console.log('in login');
    next();
}