// module.exports = func => {
//   return (req, res, next)=>{
//     func(req, res, next).catch(next);
//   }
// }

module.exports = (func: (arg0: any, arg1: any, arg2: any) => Promise<any>) => {
  return (request:any, response:any, next:any)=>{
    func(request, response, next).catch(next)
  }
}