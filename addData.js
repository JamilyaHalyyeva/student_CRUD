import inquirer from "inquirer";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import queryDB from "./queryDB.js";

export default async function addData(info) {
  try {
    const answer = await inquirer.prompt([
      { type: "input", name: "name", message: "Please enter your Name" },
      {
        type: "input",
        name: "surname",
        message: "Please enter your Surname",
      },
      { type: "number", name: "phone", message: "Please enter your Phone Number" },
      {
        type: "list",
        name: "age",
        message: "Are you older than 18 years ",
        choices: [
          { name: "Yes ", value: "Adult" },
          { name: "No", value: "Minor" },
        ],
      },
    ]);

    const data = {
        id:uuidv4(),
      name: answer.name,
      surname: answer.surname,
      phone: answer.phone,
      age: answer.age
      
    };
    info.push(data);

    if (fs.existsSync("db.json")) {
      addDetails(info);
    }

else{
    fs.appendFile("db.json", "[]",function(error){
  if (error) {
    console.log("Creating file unsuccessful");
  }
  console.log("db.json file created successfully");
  addDetails(info);
    })
}
  } catch (error) {
    console.log("Something went wrong", error);
  }
}

async function addDetails(info){

    await fs.writeFile("db.json", JSON.stringify(info), function(error){
 if (error ) {
    console.log("Error writing to the Database");
 }
 console.log("Data added successfully");
    })

}

queryDB(addData);