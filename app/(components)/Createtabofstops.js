
// import { buses } from "./buses";
// export  async function Createtabofstops() {

//     const fs = require("fs");
//     const { writeFile } = require("fs/promises");
//     const fse = require('fs-extra');
//         const fetchPromises = buses.map((url) =>
//           fetch(`http://localhost:3000/api/${url}`)
//         );
//         const responses = await Promise.all(fetchPromises);
    
//         const dataArray = await Promise.all(
//           responses.map(async (response) => {
//             const data = await response.json();
    
//             return data;
//           })
//         );
// let table=[]


//         const mapped = dataArray.map((api, indeks) => {
        
//             return api[0].map((each, i) => {
        
//               return each.map((data, indeks) => {
              
//                 const stops = data?.stops?.map((each, i) => {
                
//                   if (!table.includes(each)&&each!==null) {
//                     table.push(each.replace(/\n/g, " "))
//                   }
//                   return null
//                 });
      
            
//               });
//             });
//           });
    


          




//           await fse.outputFile(
//             `app/components)/busstops.js`,
//        `export const table=${[JSON.stringify(table)]}`
        
//           );














// return table
// }
