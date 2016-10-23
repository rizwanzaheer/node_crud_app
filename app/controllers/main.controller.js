module.exports = {
    showHome: (req, res) => {
        // show the home page!
        console.log(`Hello, I'm responce: ${res}`);
        res.render('pages/home');

    }
};