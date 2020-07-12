export const destroySession = (req, res, next) => {
    req.session.destroy();
    return next();
};

export const login = (req, res, next) => {
    // if (req.session.loggedin && req.session.username) return res.redirect('home');
    const { method, session } = req;

    if (method === "GET") {
        let resObj = {}
        if (session.username && session.bad_login) {
            resObj = {username : session.username, bad_login : session.bad_login}
        }
    return res.render('login', resObj);
    }

    next();

    // if (method === 'GET') {
    //     return res.render('login', {
    //         badLogin: false,
    //         badUser: false,
    //         badPass: false
    //     })
    // }


    // if (method === 'POST') {
    //     console.log('post')
    //     const { username, password } = req.body;
    //     if (!username && !password) {
    //         return res.status(400).render('login', {
    //             badLogin: true,
    //             badUser: true,
    //             badPass: true
    //         })
    //     } else if (!username || !password) {
    //         console.log(2)

    //         const responseVars = {};
    //         !username ? responseVars.badUser = true : responseVars.badPass = true;
    //         console.log('world', responseVars);
    //         return res.status(400).render('login', {
    //             badLogin: true,
    //             ...responseVars
    //         })
    //     } else {
    //         console.log('down here')
    //         return next();
    //     }
    // }
}