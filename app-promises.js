const users = [{
    id: 1,
    name: 'Hamam',
    schoolId: 101
}, {
    id: 2,
    name: 'Rouaa',
    schoolId: 102
}, {
    id: 3,
    name: 'Salma',
    schoolId: 103
}, {
    id: 4,
    name: 'Naya',
    schoolId: 104
}];


const grades = [{
    id: 1,
    schoolId: 101,
    grade: 100 
}, {
    id: 2,
    schoolId: 102,
    grade: 99 
}, {
    id: 3,
    schoolId: 103,
    grade: 98 
}, {
    id: 4,
    schoolId: 104,
    grade: 97
}, {
    id: 5,
    schoolId: 101,
    grade: 80 
}];


var getUser = (id) => {
     return new Promise((resolve, reject) => {
         const user = users.find((user) => user.id === id);
         if (user) {
             resolve(user);
         } else {
             reject(`Unable to find user with id ${id}.`);
         };
     });
};

const getGrades = (schoolId) => {
     return new Promise((resolve, reject) => {
        resolve(grades.filter((grade) => grade.schoolId === schoolId));
     });
};

const getStatus = (userId) => {
    let user;
     return getUser(userId).then((tempUser) => {
         user = tempUser;
           return getGrades(user.schoolId);
     }).then((grades) => {

        let average = 0;

        if (grades.length > 0) {
            
            average = grades.map((grade) => grade.grade).reduce((a, b) => a + b) / grades.length;
        }

        return `${user.name} has a ${average}% in the class.`;

        // console.log(average);

     });
};


// const getStatusAlt = (userId) => {
//      return 'Naya';
// };

// console.log(getStatusAlt());

// Async Awite

// const getStatusAlt = async (userId) => {
//     throw new Error('This is an error');
//     return 'Naya';
// };

const getStatusAlt = async (userId) => {
    const user = await getUser(userId);
    const grades = await getGrades(user.schoolId);

    // console.log(user, grades);

    let average = 0;

    if (grades.length > 0) {
        
        average = grades.map((grade) => grade.grade).reduce((a, b) => a + b) / grades.length;
    }

    return `${user.name} has a ${average}% in the class.`;
};

getStatusAlt(1).then((status) => {
    console.log(status);
}).catch((e) => {
   console.log(e);
});

// getStatusAlt(1).then((name) => {
//       console.log(name);
// }).catch((e) => {
//      console.log(e);
// });




// getStatus(1).then((status) => {
//     console.log(status);
// }).catch((e) => {
//    console.log(e);
// });

// getGrades(101).then((grades) => {
//     console.log(grades);
// }).catch((e) => {
//    console.log(e);
// });

// getUser(3).then((user) => {
//     console.log(user);
// }).catch((e) => {
//    console.log(e);
// });