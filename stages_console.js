import { getCurrentStageIndex } from 'https://jslib.k6.io/k6-utils/1.3.0/index.js';

export const options = {
  stages: [
    { target: 1, duration: '2s' },
    { target: 2, duration: '2s' },
  ],
};

// check(res,{
//         'Status is 200' : (r) => r.status == 200
//         //'Message is correct' : (r) => r.body.message.indexOf == ('Save notification to hub success')
//     })
//     if (getCurrentStageIndex() === 0) {
//       console.log('1st Stage');
//     } else if (getCurrentStageIndex() ===1) {
//       console.log('2nd Stage');
//     } else {
//       console.log('Last stage');
//     }

// check(res,{
//     'Status is 200' : (r) => r.status == 200
//     //'Message is correct' : (r) => r.body.message.indexOf == ('Save notification to hub success')
// })
// if (getCurrentStageIndex() === 0) {
//   console.log('1st Stage');
// } else if (getCurrentStageIndex() ===1) {
//   console.log('2nd Stage');
// } else {
//   console.log('Last stage');
// }
