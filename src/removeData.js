import inquirer from "inquirer";
import fs from "fs";
import queryDB from "./queryDB.js";
import dbFileCheck from "./dbFileCheck.js";

export default async function removeData(info){
     dbFileCheck();
     try {
        const answer = await inquirer.prompt([
            { type: "input", name: "id", message: "Please enter  user id " },
          ]);

          let remnantData=[];
          let isAMatch=false;
          info.forEach(element => {
            if (element.id !== answer.id) {
                remnantData.push(element);
            }
            if (element.id=== answer.id) {
                isAMatch= true;                
            }
          });
          if (!isAMatch) {
            console.log(`${answer.id} doesn't exist.`);
            return;
          }

          await fs.writeFile("db.json", JSON.stringify(remnantData), function(error){
              if (error) {
                console.log("Error while updating database ");
                
              }
              console.log("User deleted successfully");

          })
      
        
     } catch (error) {
        console.log("Somthing is wrong");
     }
}
queryDB(removeData);