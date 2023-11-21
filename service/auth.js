import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

// const sessionIdToUserMap = new Map();

export function generateRandomKey(length) {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomKey = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    randomKey += charset.charAt(randomIndex);
  }
  return randomKey;
}


export function setUser(user) {
  const expirationTime = 10; // 10 seconds for testing
  const token = jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    SECRET_KEY,
    { expiresIn: "40s" }
  );
  // console.log('Decoded Token:', jwt.decode(token));
  return token;
}

// expiresIn: "10h" // it will be expired after 10 hours
        //expiresIn: "20d" // it will be expired after 20 days
        //expiresIn: 120 // it will be expired after 120ms
        //expiresIn: "120s" // it will be expired after 120s
// export function setUser(id, user) {
//   sessionIdToUserMap.set(id, user);
// }

// export function getUser(token) {
//   if (!token) return null;
//   try {
//     return jwt.verify(token, SECRET_KEY);
//   } catch (error) {
//     return error;
//   }
// }

export function getUser(token) {
  if (!token) return null;
  try {
    const decodedToken = jwt.verify(token, SECRET_KEY);

    // Assuming the decoded token contains user information
    const user = {
      _id: decodedToken._id,
      email: decodedToken.email,
      // Add other properties as needed
    };

    return user;
  } catch (error) {
    // Handle token verification error
    throw new Error("Invalid token");
  }
}


export function setRandomGeneratedKey() {
  const key = generateRandomKey(3);

  return jwt.sign(key, { expiresIn: "1d" });
  
}

// export function setUser(id, user) {
//   sessionIdToUserMap.set(id, user);
// }

export function getRandomGeneratedKey(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return error;
  }
}
