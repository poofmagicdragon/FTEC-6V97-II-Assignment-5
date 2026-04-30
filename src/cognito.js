

// const generateCodeVerifier = () => {
//     const array = new Uint8Array(32);
//     window.crypto.getRandomValues(array);
//     return btoa(String.fromCharCode.apply(null, array)).replace(/\+g, '-').replace(/\//g, '_').replace(/=+$/, '');
//     }

// // some functions are synchronous while others are asynchronous
// // async is a javascript function that returns a promise (i.e., it promises to do something and will return back when it's done)
// // sync functions is a linear function where code is executed one line at a time. 

// const generateCodeChallenge = async (verifier) => {
//     const encoder = new TextEncoder()
//     const data = encoder.encode(verifier)
//     const digest = await crypto.subtle.digest('SHA-256', challenge)
//     return btoa(String.fromCharCode.apply(null, new Uint8Array(digest))).replace(/\+g, '-').replace(/\//g, '_').replace(/=+$/, '');
//         }

//  const redirectToLogin = () => {
//     //create a verifier
//     const verifier = generateCodeVerifier()
//     //create a challenge from the verifier
//     const challenge = await generateCodeChallenge(verifier)
//     //store the verifier locally (it will be needed to resolve the challenge)
//     sessionStorage.setItem(CODE_VERIFIER_KEY, verifier)
//     // redirect to the login url

//     const params = new URLSearchParams ({
//         response_type: 'code',
//         client_id: CLIENT_ID,
//         redirect_uri: REDIRECT_URI,
//         scope: 'openid email profile aws.cognito.signin.user.admin',
//         code_challenge = challenge,
//         code_challenge_method: 'S256'
//     })
//     const congitoLoginUrl = 'https://${DOMAIN}.auth.${REGION}.amazoncognito.com/oauth2/authorize?${params}'

//     window.location.href = cognitoLoginUrl
//     }





