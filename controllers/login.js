export default (req, res) => {
    const { email, password } = req.body;

    if(!email && !password) {
        return res.render('login', {
            foo: 'foo'
        })
    }

}