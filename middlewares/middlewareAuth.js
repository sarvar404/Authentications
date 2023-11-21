import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { getUser } from "../service/auth.js";

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

export function checkForAuthentication(request, response, next) {
  // const tokenCookie = request.cookies?.token;
  const tokenCookie = request.cookies && request.cookies.token;
  request.user = null;

  if (!tokenCookie) return next();

  const token = tokenCookie;
  const user = getUser(token);

  request.user = user;

  return next();
}

export function restrictTo(roles) {
  return function (request, response, next) {
    if (!request.user)
      return response
        .status(401)
        .json({ success: false, message: "Invalid Credentials" });
    console.log(roles);
    process.exit();
    if (!roles.includes(request.user.role))
      return response
        .status(401)
        .json({ success: false, message: "UnAuthorized" });
    return next();
  };
}

// authMiddleware.js

export const authSecurityHeader = (request, res, next) => {
  const xSecurityHeader = request.headers["x-security-header"];

  if (xSecurityHeader === process.env.SECRET_HEADER) {
    next(); // Proceed to the next middleware/route
  } else {
    res.status(401).json({ error: "Authentication Failed." });
  }
};

export const verifyAccessToken = (request, response, next) => {
  const tokenFromCookie = request.cookies && request.cookies.token;
  const authorizationHeader = request.headers["authorization"];

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return response.status(401).json({ error: "Invalid authorization header" });
  }

  const token = authorizationHeader.split("Bearer ")[1];

  jwt.verify(token, SECRET_KEY, (error, decodedToken) => {
    if (error) {
      // console.log(error);

      if (error.name === "TokenExpiredError") {
        // console.log("Token has expired");
        return response.status(401).json({ error: "Token has expired" });
      } else {
        // console.log("Invalid token");
        return response.status(401).json({ error: "Invalid token" });
      }
    }

    // console.log("Token is valid");
    // Attach the decoded token to the request for future use
    request.decodedToken = decodedToken;

    // Continue to the next middleware or route handler
    next();
  });
};



// export const verifyAccessToken = (request, response, next) => {
//   const token = request.cookies && request.cookies.token;
//   const autherizationHeaderValues = request.headers["authorization"];
//   if (!autherizationHeaderValues || !autherizationHeaderValues.startsWith('Bearer')) return next();
//   const reciviedToken = autherizationHeaderValues.split("Bearer ")[1];

  

//   if (!token) {
//     return response.status(401).json({ error: "Time out." });
//   }



//   if (token !== reciviedToken) {
//     return response.status(401).json({ error: "UnAuthorized." });
//   }

//   try {
//     const decoded = jwt.verify(token, SECRET_KEY);
//     request.user = decoded; // Set the user information in the request object
//     next();
//   } catch (error) {
//     return response.status(401).json({ error: "Invalid access token." });
//   }
// };

// export function checkForAuthentication(request, response, next) {
//     const autherizationHeaderValues = request.headers["autherization"];
//     request.user = null;

//     if (!autherizationHeaderValues || !autherizationHeaderValues.startsWith('Bearer')) return next();

//     const token = autherizationHeaderValues.split("Bearer ")[1];
//     const user = getUser(token);

//     request.user = user;

//     return next();
// }

// export  function restrictTo(roles) {
//     console.log(roles, "here")
//     return function(request, response, next) {
//         console.log(request.user?.role)
//         if (!request.user) return response.status(401).json({ success: false, message: "Invalid Credentials" });
//         if (!roles.includes(request.user.role)) return response.status(401).json({ success: false, message: "UnAuthorized" });
//         return next();
//     }
// }

export async function restrictToLoggedinUserOnly(request, response, next) {
  // const userUid = request.headers["authorization"];
  // if (!userUid) {
  //   return response.status(401).json({ success: false, message: "Invalid credentials" });
  // }
  // const token = userUid.split("Bearer ")[1];
  // const user = getUser(token);
  // if (!user) {
  //   return response.status(401).json({ success: false, message: "Invalid User" });
  // }
  // response.user = user;
  // next();
}

export async function checkAuth(request, response, next) {
  // const userUid = request.cookies?.uid;
  // if (!userUid) {
  //   // Handle missing authentication (e.g., send 401 or redirect to login)
  //   return response.status(401).json({ success: false, message: "Authentication required" });
  // }
  // const user = getUser(userUid);
  // request.user = user;
  // next();
}

// export async function restrictToLoggedinUserOnly(request, response, next) {
// //   const userUid = request.cookies.uid;

// console.log(request.headers)
// const userUid = request.headers["authorization"];

//   if (!userUid) return response.status(404).json({success: false, message: "Invalid credentials"});

//   const token = userUid.split("Bearer ")[1];
//   const user = getUser(token);

//   if (!user) return response.status(404).json({success: false, message: "Invalid User"});

//   response.user = user;
//   next();

// }

// export async function checkAuth (request, response, next) {
//     const userUid = request.cookies?.uid;
//     const user = getUser(userUid);
//     request.user = user;
//     next();
// }
