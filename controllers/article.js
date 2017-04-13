const Article = require('mongoose').model('Article');

module.exports = {
    createGet: (req, res) => {
        res.render('article/create');
    },

    createPost: (req, res) => {
        let articleParts = req.body;

        let errorMsg = '';

        if (!req.isAuthenticated()) {
            errorMsg = 'You should be logged in to make articles!';
        } else if (!articleParts.title) {
            errorMsg = 'Invalid title!';
        } else if (!articleParts.content) {
            errorMsg = 'Invalid content!';
        }
        if (errorMsg) {
            res.render('article/create', {error: errorMsg});
            return;
        }

        // Insert, save in base and set multiply image files
        let images = req.files.images;

        if (images) {
            for (let image of images) {
                let filename = image.name;
                image.mv(`./public/pictures/${filename}`, err => {
                    if (err) {
                        console.log(err.message);
                    }
                });
            }

            let imageArray = [];
            for (let image of images) {
                imageArray.push(`/pictures/${image.name}`);
            }

            articleParts.pathImage = imageArray;
        }

        // Insert, save in base and set pdf file
        let pdf = req.files.pdf;

        if (pdf) {
            let pdfname = pdf.name;
            pdf.mv(`./public/files/${pdfname}`, err => {
                if (err) {
                    console.log(err);
                }
            });

            articleParts.pathPdf = `/files/${pdfname}`;
        }

        let userId = req.user.id;
        articleParts.author = userId;
        Article.create(articleParts).then(article => {
            req.user.articles.push(article.id);
            req.user.save(err => {
                if (err) {
                    res.render('article/create', {error: err.message});
                } else {
                    res.redirect('/blog');
                }
            });
        })
    },
    detailsGet: (req, res) => {
        let id = req.params.id;

        Article.findById(id).populate('author').then(article => {
            if(!req.user){
                res.render('article/details', {article: article, isUserAuthorized: false});
                return;
            }

            req.user.isInRole('Admin').then(isAdmin => {
                let isUserAuthorized = isAdmin || req.user.isAuthor(article);

                res.render('article/details',{article: article, isUserAuthorized: isUserAuthorized});
            });
        });
    },
    editGet: (req, res) => {
        let id = req.params.id;

        if (!req.isAuthenticated()){
            let returnUrl = `/article/edit/${id}`;
            req.session.returnUrl = returnUrl;

            res.redirect('/user/login');
            return;
        }

        Article.findById(id).then(article => {
            req.user.isInRole('Admin').then(isAdmin => {
                if(!isAdmin && !req.user.isAuthor(article)){
                    res.redirect('/blog');
                    return;
                }
                res.render('article/edit', article)
            });
        });
    },
    editPost: (req, res) => {
        let id = req.params.id;

        let articleArgs = req.body;

        let errorMsg = '';
        if (!articleArgs.title){
            errorMsg = 'Article title cannot be empty!';
        } else if (!articleArgs.content){
                errorMsg = 'Article content cannot be empty!';
        }

        if (errorMsg){
            res.render('article/edit', {error: errorMsg})
        } else {
            Article.update({_id: id}, {$set: {title: articleArgs.title, content: articleArgs.content}})
                .then(updateStatus => {
                    res.redirect(`/article/details/${id}`);
                })
        }
    },
    deleteGet: (req, res) => {
        let id = req.params.id;

        if(!req.isAuthenticated()){
            let returnUrl = `/article/delete/${id}`;
            req.session.returUrl = returnUrl;

            res.redirect('/user/login');
            return;
        }

        Article.findById(id).then(article => {
            req.user.isInRole('Admin').then(isAdmin => {
                if (!isAdmin && !req.user.isAuthor(article)){
                    res.redirect('/blog');
                    return;
                }
                res.render('article/delete', article)
            });
        });
    },
    deletePost: (req, res) => {
        let id = req.params.id;
        Article.findOneAndRemove({_id: id}).populate('author').then(article => {
            let author = article.author;

            //Index of the article's ID in the author's articles.
            let index = author.articles.indexOf(article.id);

            if(index < 0){
                let errorMsg = 'Article was not found for that author!';
                res.render('article/delete', {error: errorMsg})
            } else {
                //Remove count element after givven index
                let count = 1;
                author.articles.splice(index, count)
                author.save().then((user) => {
                    res.redirect('/blog');
                });

            }

        })
    }

};
