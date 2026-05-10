const DOMAIN = import.meta.env.VITE_AWS_COGNITO_DOMAIN
const REGION = import.meta.env.VITE_REGION
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI

const CODE_VERIFIER_KEY = 'code_verifier'
const TOKEN_KEY = 'token_'

const generateCodeVerifier = () => {
    const array = new Uint8Array(32);
    window.crypto.getRandomValues(array);
    return btoa(String.fromCharCode.apply(null, array)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    }

// some functions are synchronous while others are asynchronous
// async is a javascript function that returns a promise (i.e., it promises to do something and will return back when it's done)
// sync functions is a linear function where code is executed one line at a time. 

const generateCodeChallenge = async (verifier) => {
    const encoder = new TextEncoder()
    const challenge = encoder.encode(verifier)
    const digest = await crypto.subtle.digest('SHA-256', challenge)
    return btoa(String.fromCharCode.apply(null, new Uint8Array(digest))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
        }

export async function redirectToLogin() {
    //create a verifier
    const verifier = generateCodeVerifier()
    //create a challenge from the verifier
    const challenge = await generateCodeChallenge(verifier)
    //store the verifier locally (it will be needed to resolve the challenge)
    sessionStorage.setItem(CODE_VERIFIER_KEY, verifier)
    // redirect to the login url

    const params = new URLSearchParams ({
        response_type: 'code',
        client_id: CLIENT_ID,
        redirect_uri: REDIRECT_URI,
        scope: 'openid email',
        code_challenge: challenge,
        code_challenge_method: 'S256'
    })
    const cognitoLoginUrl = `https://${DOMAIN}.auth.${REGION}.amazoncognito.com/oauth2/authorize?${params}`

    window.location.href = cognitoLoginUrl
}



export const exchangeCodeForToken = async (code) => {
    // code goes here...
    const verifier = sessionStorage.getItem(CODE_VERIFIER_KEY)
    if (!verifier)
        throw new Error('No code verifier found in session storage')

    const body = new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: CLIENT_ID,
        redirect_uri: REDIRECT_URI,
        code: code,
        code_verifier: verifier
    })

    const url = `https://${DOMAIN}.auth.${REGION}.amazoncognito.com/oauth2/token`
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body
    })
    if (!response.ok) { // received a non-success http code
        // extract the error messsage from the response
        const error_msg = await response.text()
        throw new Error(`Token exchange failed: ${error_msg}`)
    }

    const data = await response.json()
    const token = data.access_token

    sessionStorage.setItem(TOKEN_KEY, token)
    sessionStorage.removeItem(CODE_VERIFIER_KEY)

    return token
}

export const getAccessToken = () => {
    return sessionStorage.getItem(TOKEN_KEY)
}


// export function clearSession() {
//     sessionStorage.removeItem(TOKEN_KEY)
//     sessionStorage.removeItem(CODE_VERIFIER_KEY)
// }
