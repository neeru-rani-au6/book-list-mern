var User = require("../models/user");
var bcrypt = require('bcrypt');
var { createToken } = require('../middleware/authentication');
const { use } = require("../routes/users");
module.exports = ({
    async register(req, res) {
        try {
            const password = req.body.password;
            req.body.password = await bcrypt.hash(req.body.password, 10);
            await User.create({ ...req.body });
            return res.json({ success: true, message: 'user register successfully' })
        } catch (error) {
            console.log(error);
            if (error.code === 11000) {
                return res.status(400).json({ error: "Email Id is already exisits" });
            }
            res.status(400).send(error);
        }
    },
    async login(req, res) {
        try {
            const email = req.body.email;
            const password = req.body.password;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ error: "User does not exists" })
            }
            console.log(password, user.password);
            const isMatch = await bcrypt.compare(req.body.password, user.password);
            if (!isMatch) {
                return res.status(400).json({ error: "Invalid Password" });
            }
            var token = await createToken(user);
            // there we save all data in cookie.
            res.cookie('token', token);
            return res.json({
                name: user.name,
                email: user.email,
                id: user._id,
                token: token
            });
        } catch (error) {
            console.log(error)

        }
    },
    async logout(req, res) {
        // this is for logout the user.
        try {
            // there we clear all data in cookie.
            res.clearCookie('token');
            return res.json({ message: "logged out" });
        } catch (error) {
            console.log(error)
            res.status(400).send(error)

        }
    }
})