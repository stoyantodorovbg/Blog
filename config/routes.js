const userController = require('./../controllers/user');
const homeController = require('./../controllers/home');
const articleController = require('./../controllers/article');
const contactController = require('./../controllers/contact');
const usersController = require('./../controllers/Users');
const profileController = require('./../controllers/profile');
const listingController = require('./../controllers/listing');
const newsController = require('./../controllers/news');

module.exports = (app) => {
    app.get('/profile/profile', profileController.profileGet);
    app.get('/editProfile/:id', profileController.profileEditGet);
    app.post('/profile/profile/:id', profileController.profileEditPost);


    app.get('/', homeController.welcome);
    app.get('/home', homeController.index);

    app.get('/contactUs', contactController.createGet);
    app.post('/about/contactUs', contactController.createPost);
    app.get('/sentMessage', contactController.sentGet);
    app.get('/about/messages/:id', contactController.messagesGet)

    app.get('/listings', listingController.listingsGet);
    app.get('/listingInput', listingController.createGet);
    app.post('/about/listingInput', listingController.createPost);
    app.get('/sentListing', listingController.sentGet);
    app.get('/listings/details/:id', listingController.detailsGet);
    app.get('/listings/delete/:id', listingController.deleteGet);
    app.post('/listings/delete/:id', listingController.deletePost);

    app.get('/Users', usersController.usersGet);


    app.get('/aboutUs', homeController.aboutUs);

    app.get('/blog', homeController.blog);

    app.get('/user/register', userController.registerGet);
    app.post('/user/register', userController.registerPost);

    app.get('/user/login', userController.loginGet);
    app.post('/user/login', userController.loginPost);

    app.get('/user/logout', userController.logout);

    app.get('/article/create', articleController.createGet);
    app.post('/article/create', articleController.createPost);

    app.get('/article/details/:id', articleController.detailsGet);

    app.get('/article/edit/:id', articleController.editGet);
    app.post('/article/edit/:id', articleController.editPost);

    app.get('/article/delete/:id', articleController.deleteGet);
    app.post('/article/delete/:id', articleController.deletePost);

    app.get('/news', newsController.newsGet);

    app.get('/news/create/:id', newsController.createGet);
    app.post('/news/create', newsController.createPost);

    app.get('/news/details/:id', newsController.detailsGet);

    app.get('/news/edit/:id', newsController.editGet);
    app.post('/news/edit/:id', newsController.editPost);

    app.get('/news/delete/:id', newsController.deleteGet);
    app.post('/news/delete/:id', newsController.deletePost);

    app.get('/article/removePics/:id', articleController.removePicsGet);
    app.post('/article/removePics/:id', articleController.removePicsPost);

};

