import { takeLatest, all, call, put, select } from "redux-saga/effects";
import { getDocument, updateDocument } from "../../utils/firebase.utils";
import { fetchPortfolioSuccess, fetchPortfolioFailed } from "./portfolio.action";
import { PORTFOLIO_ACTION_TYPES } from "./portfolio.types";
import { selectorCurrentUser } from "../user/user.selector";
import { selectorPortfolio } from "../portfolio/portfolio.selector";


// const user = 
//     {
//         "uid": "yJVOIlOuz8eap0kvpDJpXkhXXhk1",
//         "email": "daniel.havlas07@gmail.com",
//         "emailVerified": false,
//         "isAnonymous": false,
//         "providerData": [
//             {
//                 "providerId": "password",
//                 "uid": "daniel.havlas07@gmail.com",
//                 "displayName": null,
//                 "email": "daniel.havlas07@gmail.com",
//                 "phoneNumber": null,
//                 "photoURL": null
//             }
//         ],
//         "stsTokenManager": {
//             "refreshToken": "AOEOulY9qCHetaiu7d16tct5T1td191VcZ_1Cb4toGKobzzL4Ht5XkzqDbdaZndrMGqBLPtrQyVZdqsJa49-dYSAraBsDVaegyY2_jMTfhSqs_g44alNJgkWmYnllDKEW9eQ6b9uhUlMZn2ql7sK5fo4Xu0XyMACfMu7i9eGthf4kvkxjI6SyjHhPnXe2q3OUZaoFMmuCvEs8pkE5Sjs6rrGNY8SdeZFHQ",
//             "accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjUyZmEwZjE2NmJmZjZiODU5N2FjMGFlMDRlNTllZmYxOTk1N2MyYmIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vY29pbm1hcmtldC1kYiIsImF1ZCI6ImNvaW5tYXJrZXQtZGIiLCJhdXRoX3RpbWUiOjE2NjIwNzQ3OTcsInVzZXJfaWQiOiJ5SlZPSWxPdXo4ZWFwMGt2cERKcFhraFhYaGsxIiwic3ViIjoieUpWT0lsT3V6OGVhcDBrdnBESnBYa2hYWGhrMSIsImlhdCI6MTY2MjA3ODA5OSwiZXhwIjoxNjYyMDgxNjk5LCJlbWFpbCI6ImRhbmllbC5oYXZsYXMwN0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiZGFuaWVsLmhhdmxhczA3QGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.eixKZcd9evGXwFPi94hftzBpBXqjmDVorSXkHSbRL6aT1SgHGLYL4cB1kfuDSiCZh0C82IQpG57_zEhu7hGLYMb4ZJ2McX5YqKXfPLroyNhtNMNkivLoIqJTvvDkDouC0DN8AxY-ccH7LBe-12Dnc8mhEbzvqtAYbOYg-sCrJfocNqdaX6gzICIOtP6HoVHmNZfaqPr1IEBcmtQsFrzmWA0_AtIpLl4UUODdLHjA1f4U9-Bl_NmpF9-92X4rS7rGDf6nyyQdJh3LjV-vKXlvhBHetCr62WnJt_lhEQPuCIpr3Yneb3JwVxajKIWa5vSrI10OsPwPgaJ-xGQ94rFSMQ",
//             "expirationTime": 1662081697644
//         },
//         "createdAt": "1661459905088",
//         "lastLoginAt": "1662074797837",
//         "apiKey": "AIzaSyCtUiO-2Df0y_KNtDd_N_MuCafRYsef5kw",
//         "appName": "[DEFAULT]"
//     }


export function* fetchPortfolioAsync(){
    const user = yield select(selectorCurrentUser)
    try {
        const doc = yield call(getDocument,user)
        yield put(fetchPortfolioSuccess(doc))
    } catch (error) {
        yield put(fetchPortfolioFailed(user))
    }
}

function* postDocument() {
    const user = yield select(selectorCurrentUser)
    const portfolio = yield select(selectorPortfolio)
    yield call(updateDocument,user,{portfolio})
}

export function* onFetchPortfolio () {
    yield takeLatest(PORTFOLIO_ACTION_TYPES.FETCH_PORTFOLIO_START,fetchPortfolioAsync)
}
export function* onPostPortfolio () {
    yield takeLatest(PORTFOLIO_ACTION_TYPES.SET_PORTFOLIO,postDocument)
}


export function* portfolioSaga(){
    yield all([call(onFetchPortfolio)])
}
