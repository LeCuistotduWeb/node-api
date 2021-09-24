console.log('debut');

/*
* CALLBACK
*
* */
// getMembers(member => {
//     console.log(member)
//     getArticles(member, articles =>{
//         console.log(articles)
//     });
// })
// function getMembers(next){
//     setTimeout(()=>{
//         next('member 1')
//     }, 1500);
// }
// function getArticles(member, next){
//     setTimeout(()=>{
//         next([1,2,3,4])
//     }, 1500);
// }
// END CALLBACK


/*
* PROMISE
*
* */
// getPromiseMembers()
//     .then(res => {
//         console.log(res)
//         return getPromiseArticles(res)
//     }).then(res => {
//     console.log(res)
// }).catch(err => console.log(err))
//
// function getPromiseMembers(){
//     return new Promise((resolve,reject) => {
//         setTimeout(() => {
//             // reject('Error during...')
//             resolve('member 1')
//         }, 1500);
//     })
// }
// function getPromiseArticles(){
//     return new Promise((resolve, reject) => {
//         setTimeout(()=>{
//             // reject('Error during...')
//             resolve([1,2,3,4])
//         }, 1500);
//     })
// }
// END PROMISE


/*
* PROMISE PARALLELE
*
* */
// let p1 = new Promise((resolve, reject) => {
//     setTimeout(()=>{
//         resolve('All good.')
//         // reject('Error during...')
//     },1500)
// })
//     .then((res)=>console.log(res))
//     .catch(err => console.error(err))
//
// let p2 = new Promise((resolve, reject) => {
//     setTimeout(()=>{
//         resolve('All very good.')
//         // reject('Error during...')
//     },1500)
// })
//     .then((res)=>console.log(res))
//     .catch(err => console.error(err))
//
// Promise.all([p1, p2]).then(res => {
//     console.log(res)
// });
// END PROMISE PARALLELE


/*
* ASYNC / AWAIT
*
* */
// async function viewArticle(){
//     const members = await getAsyncMembers()
//     const articles = await getAsyncArticles()
//     console.log(articles, members)
// }
// viewArticle()

/*
* Similaire à async function viewArticle(){} viewArticle()
* !!! doit avoir un point virgule sur la ligne d'avant pour fonctionner
* */
(async ()=>{
    try {
        const members = await getAsyncMembers()
        const articles = await getAsyncArticles()
        console.log(articles, members)
    }
    catch (err) {
        console.error(err)
    }
})()

function getAsyncMembers(){
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            // reject('Error during...')
            resolve('member 1')
        }, 1500);
    })
}
function getAsyncArticles(){
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            // reject('Error during...')
            resolve([1,2,3,4])
        }, 1500);
    })
}
// END ASYNC / AWAIT
console.log('fin')