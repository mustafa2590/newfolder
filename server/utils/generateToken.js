import jwt from 'jsonwebtoken'

const generateToken = (res, userId) => {
    try {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1d' })
            // This generates a JWT using the jsonwebtoken library.
            // The payload is { userId }, meaning the token will include the user's ID as the payload.
            // process.env.JWT_SECRET is used as the secret key to sign the token, which should be stored securely (preferably in environment variables to avoid hard-coding it).
            // expiresIn: '1d' sets the token to expire in one day (24 hours).
        // res.cookie( name_of_cookie, value_of_cookie, cookie_options )
        res.cookie('jwt', token, {
            // This sets the jwt token as a cookie on the response object.
            // 'jwt' is what we're naming the cookie.
            httpOnly: true,
            // Ensures the cookie is accessible only via HTTP(S) requests and not JavaScript on the client side. This is an important security feature, as it helps protect the cookie from client-side XSS attacks.
            secure: false,
            // This makes the cookie only accessible over HTTPS if set to true & should be in production.
            // In a production environment, cookies should be sent over HTTPS for security reasons. During development, you might not have HTTPS enabled locally, so this condition allows for development without HTTPS.
            sameSite: 'strict',
            // This prevents the cookie from being sent with cross-origin requests. SameSite='Strict' ensures that the cookie is only sent in a first-party context (i.e., when the user is on your site).
            // This can help mitigate CSRF (Cross-Site Request Forgery) attacks, as the cookie won’t be sent with requests from other websites.
            // If your application requires cross-site requests (e.g., from different subdomains), you may need to adjust this to SameSite='Lax' or SameSite='None'
            maxAge: 1000 * 60 * 69 * 24
            // This sets the cookie expiration to 1 day (24 hours), corresponding to expiresIn: '1d' from the JWT settings.
            // Important: maxAge is in milliseconds, so you’re correctly calculating the expiration to match the token's expiration.
        })
    } catch (error) {
        console.log("token failed NoOoOoo")
        res.status(500).json({ message: 'Token generation failed' })
        throw error
    }
}

export default generateToken