const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    
    let status = err.status || 500;
    let message = err.message || 'Something went wrong!';
    
    // Handle specific types of errors
    if (err.name === 'ValidationError') {
        status = 400;
        message = err.message;
    } else if (err.name === 'NotFoundError') {
        status = 404;
        message = err.message || 'Resource not found';
    } else if (err.name === 'DatabaseError') {
        status = 500;
        message = 'Database error occurred';
    }
    
    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
        return res.status(status).json({
            error: {
                message,
                status
            }
        });
    }
    
    res.status(status).render('error', {
        title: `Error ${status}`,
        message,
        error: process.env.NODE_ENV === 'development' ? err : {}
    });
};

const notFoundHandler = (req, res, next) => {
    const err = new Error('Page not found');
    err.status = 404;
    next(err);
};

module.exports = {
    errorHandler,
    notFoundHandler
}; 