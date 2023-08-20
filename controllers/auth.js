
const Login = async (req, res) => {
    try {
        res.send("Hello World");
    } catch (error) {
        console.log(error);
    }
}

module.exports = { Login };