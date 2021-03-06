// From USD , To SEK, Amount 20
// SEK = 10.317416 EUR
// 20 USD is worth 160 KR. You can spend these in the following countries: Sweden


// http://data.fixer.io/api/latest?access_key=b4179bff1d0d0420cbd28deac410366f&format=1

const axios = require('axios');

// const getExtchangeRate = (from , to) => {
//     return axios.get('http://data.fixer.io/api/latest?access_key=b4179bff1d0d0420cbd28deac410366f&format=1').then((response) => {
//           const euro = 1 / response.data.rates[from];
//           const rate = euro * response.data.rates[to];
//           return rate;
//      });
// };

const getExtchangeRate = async (from , to) => {

    try {
        const response = await axios.get('http://data.fixer.io/api/latest?access_key=b4179bff1d0d0420cbd28deac410366f&format=1');
     
        const euro = 1 / response.data.rates[from];
        const rate = euro * response.data.rates[to];

        if (isNaN(rate)) {
            throw new Error();
        }

        return rate;
    } catch (e) {
        throw new Error(`Unable to get extchange rate for ${from} and ${to}`);
    }

};

// const getCountries = (currencyCode) => {
//   return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`).then((response) => {
//       return response.data.map((country) => country.name);
//   })
// };


const getCountries = async (currencyCode) => {
      
    try {
        const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);

        return response.data.map((country) => country.name);
    } catch (e) {
        throw new Error(`Unable to get countries that use ${currencyCode}`);
    }
    
  };


// getExtchangeRate('USD', 'SEK').then((rate) => {
//      console.log(rate);
// });

// getCountries('SEK').then((countries) => {
//      console.log(countries);
// });


// const convertCurrency = (from, to, amount) => {
     
//     let convertedAmount;

//     return getExtchangeRate(from, to).then((rate) => {

//         convertedAmount = (amount * rate).toFixed(2);

//     //    console.log(convertedAmount);
//        return getCountries(to);
//     }).then((countries) => {
//         //  console.log(countries);

//          return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend these in the following countries: ${countries.join(', ')}`;
//     });
// };


const convertCurrency = async (from, to, amount) => {
    const rate = await getExtchangeRate(from, to);
    const countries = await getCountries(to);
    const convertedAmount = (amount * rate).toFixed(2);
    return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend these in the following countries: ${countries.join(', ')}`;
};

convertCurrency('USD', 'SEK', 20).then((message) => {
    console.log(message);
}).catch((e) => {
    console.log(e.message);
}); 




// Ex. Handling eroors 

// const add = async (a, b) => a + b;

// const doWork = async () => {
//     const result = await add(12, 13);
//      return result;
// };

// const add = async (a, b) => a + b + c;

// const doWork = async () => {
     
//     try {
//         const result = await add(12, 13);
//         return result;
//     } catch (e) {
//         return 404;
//     }


// };


// const doWork = async () => {
//      return 10;
// };

// doWork().then((data) => {
//    console.log(data);
// }).catch((e) => {
//     console.log('Somthing went wrong');
// }); 