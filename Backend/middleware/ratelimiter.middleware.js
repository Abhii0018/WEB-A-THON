import rateLimit from "express-rate-limit";

export const apiLimiter = rateLimit({
    windowMs: 1*60*1000, // 1 minute
    max:2, // Limit each IP to 2 requests per windowMs
    message:{ 
        success:false,
        message:"Too many requests from this IP, please try again after a minute"
    },
    standardHeaders: true,
    legacyHeaders: false
});

export default apiLimiter;

