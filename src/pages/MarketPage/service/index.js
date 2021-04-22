import api from '../../../service/axios'
import { APIFunctionType, APIKey } from '../../../configuration/market.config'
import { organizations } from '../../../utilities/constants'

export function findEndpoint(keyword, onSuccess, onError) {
    api.get(`query?function=${APIFunctionType.SYMBOL_SEARCH}&keywords=${keyword}&apikey=${APIKey}`)
        .then(response => {
            onSuccess && onSuccess(organizations)
        })
        .catch(error => {
            onError && onError(error)
        });
}

// function modifyData({ bestMatches }) {
//     return bestMatches.map(object => {
//         let newObj = {};
//         Object.entries(object).forEach(item => {
//             const name = item[0].split(" ")[1];
//             const value = item[1];
//             newObj[name] = value;
//         });
//         return newObj;
//     })
// }

