import jwt from "jsonwebtoken"
const isAuth = async (req, res, next) => {
        try {
                // console.log("COOKIES:", req.cookies);
                // console.log("TOKEN TYPE:", typeof req.cookies.token);
                const token = req.cookies.token
                if (!token) {
                        return res.status(401).json({ message: "token not found" })
                }

                const decodeToken = jwt.verify(token, process.env.JWT_SECRET)
                if (!decodeToken) {
                        return res.status(400).json({ message: "token not verify" })
                }
                // console.log(decodeToken);
                req.userId = decodeToken.userId || decodeToken.id
                next()


        } catch (error) {
                console.log("JWT ERROR:", error.message)
                return res.status(401).json({ message: "Invalid token" })
        }

}
export default isAuth