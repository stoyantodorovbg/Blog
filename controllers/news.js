const News = require('mongoose').model('News');

module.exports = {

    createGet: (req, res) => {
        res.render('news/create');
    },
   //createGet: (req, res) => {
   //    let id = req.params.id;

   //    if (!req.isAuthenticated()){
   //        let returnUrl = `/news/news/${id}`;
   //        req.session.returnUrl = returnUrl;

   //        res.redirect('/user/login');
   //        return;
   //    }
   //    New.findById(id).populate.then(anew => {
   //        if(!req.user){
   //            res.render('news/create', {anew: anew, isUserAuthorized: false});
   //            return;
   //        }
   //        req.user.isInRole('Admin').then(isAdmin => {
   //            let isUserAuthorized = isAdmin;

   //            res.render('news/create',{anew: anew, isUserAuthorized: isUserAuthorized});
   //        });
   //    });
   //},
    newsGet: (req, res) => {
        News.find({}).then(news => {
            if (req.user) {
                req.user.isInRole('Admin').then(isAdmin => {
                    let isUserAuthorized = isAdmin;

                    res.render('news/news', {
                        news: news, isUserAuthorized: isUserAuthorized
                    });
                });
            } else{
                res.render('news/news', {
                    news: news
                });
            }
        });
    },

    createPost: (req, res) => {
        let newsParts = req.body;

        let errorMsg = '';

        req.user.isInRole('Admin').then(isAdmin => {
            if (!isAdmin){
                errorMsg = 'You should be Admin to publish news!';
            } else if (!newsParts.title) {
                errorMsg = 'Invalid title!';
            } else if (!newsParts.content) {
                errorMsg = 'Invalid content!';
            }else if (!newsParts.author) {
                errorMsg = 'Invalid author!';
            }
        });
        if (errorMsg) {
            res.render('news/create', {error: errorMsg});
            return;
        }

       // // Insert, save in base and set multiply image files
//
       // let images = req.files.images;
//
       // if (images) {
       //     for (let image of images) {
       //         let filename = image.name;
       //         image.mv(`./public/pictures/${filename}`, err => {
       //             if (err) {
       //                 console.log(err.message);
       //             }
       //         });
       //     }
//
       //     let imageArray = [];
       //     for (let image of images) {
       //         imageArray.push(`/pictures/${image.name}`);
       //     }
//
       //     newParts.pathImage = imageArray;
       // }

        let news = [];
        News.create(newsParts).then(newsStory => {
            news.push(newsStory.id);
            newsStory.save(err => {
                if (err){
                    res.render('news/create', {error: err.message});
                } else {
                    res.redirect('/news');
                }
            });
        })
    },
    detailsGet: (req, res) => {
        let id = req.params.id;

        News.findById(id).then(newsStory => {
         if(!req.user){
              res.render('news/details', {newsStory: newsStory, isUserAuthorized: false});
              return;
         }

            req.user.isInRole('Admin').then(isAdmin => {
                let isUserAuthorized = isAdmin;

                res.render('news/details', {newsStory: newsStory, isUserAuthorized: isUserAuthorized});
            });
        });
    },
    editGet: (req, res) => {
        let id = req.params.id;

        if (!req.isAuthenticated()){
            let returnUrl = `/new/edit/${id}`;
            req.session.returnUrl = returnUrl;

            res.redirect('/user/login');
            return;
        }

        News.findById(id).then(newsStory => {
            req.user.isInRole('Admin').then(isAdmin => {
                if(!isAdmin){
                    res.redirect('/news');
                    return;
                }
                res.render('news/edit', newsStory)
            });
        });
    },
    editPost: (req, res) => {
        let id = req.params.id;

        let newArgs = req.body;

        let errorMsg = '';
        if (!newArgs.title){
            errorMsg = 'New title cannot be empty!';
        } else if (!newArgs.content){
            errorMsg = 'New content cannot be empty!';
        } else if (!newArgs.author){
            errorMsg = 'New author cannot be empty!';
        }

        if (errorMsg){
            res.render('news/edit', {error: errorMsg})
        } else {
            News.update({_id: id},
                {$set: {title: newArgs.title, content: newArgs.content,author: newArgs.author, source: newArgs.source}})
                .then(updateStatus => {
                    res.redirect(`/news/details/${id}`);
                })
        }
    },
    deleteGet: (req, res) => {
        let id = req.params.id;

        if(!req.isAuthenticated()){
            let returnUrl = `/news/delete/${id}`;
            req.session.returUrl = returnUrl;

            res.redirect('/user/login');
            return;
        }

        News.findById(id).then(newsStory => {
            req.user.isInRole('Admin').then(isAdmin => {
                if (!isAdmin){
                    res.redirect('/news');
                    return;
                }
                res.render('news/delete', newsStory)
            });
        });
    },
    deletePost: (req, res) => {
        let id = req.params.id;
        News.findOneAndRemove({_id: id}).then(newsStory => {
            res.redirect('/news');
        });

    }


};

