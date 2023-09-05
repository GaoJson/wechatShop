


export function createRequest<T=any>(path:string,methods:string,param:any):Promise<T> {
  
  const baseUrl = "https://api.yuehaigj.com/api/";
  

 return new Promise((resolve, reject)=>{
  wx.request(
      {
        url:baseUrl+path,
        data:param,
        header:{
          'content-type': 'application/x-www-form-urlencoded'
        },
        
        method:methods=="POST"?"POST":"GET",
        
        responseType:"text",
        success:function (res) {
            resolve(res.data as T)
        },
        fail:function(error) {
          reject(error)
        }
        
      },
    )


 })
}

