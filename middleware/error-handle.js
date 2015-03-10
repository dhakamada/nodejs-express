module.exports = function(app, callback){

    /// catch 404 and forwarding to error handler
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    /// error handlers

    // development error handler
    // will print stacktrace
    if (app.get('env') !== 'production') {
        app.use(function(err, req, res, next) {
            if (err.code === 'EBADCSRFTOKEN'){
                res.status(403);
                res.send('csrf error');

            }else{
                res.status(err.status || 500);
                res.render('error', {
                    message: err.message,
                    error: err
                });
            }
        });
    }

    // production error handler
    // no stacktraces leaked to user
    if (app.get('env') === 'production') {
        app.use(function(err, req, res, next) {
            if (err.code === 'EBADCSRFTOKEN'){
                res.status(403);
                res.send('form tampered with');

            }else{
                res.status(err.status || 500);
                res.render('error', {
                    message: err.message,
                    error: err
                });
            }
        });
    }

    callback();
}