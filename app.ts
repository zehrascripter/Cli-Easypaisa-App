#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

console.log(chalk.greenBright.bold(`
💰💰💰💰💰💰💰💰💰💰💰💰💰💰💰💰💰💰💰💰💰💰💰💰💰💰💰💰💰💰💰💰💰💰💰💰💰💰💰💰💰💰
                             Welcome to Easypaisa App                                    
💰💰💰💰💰💰💰💰💰💰💰💰💰💰💰💰💰💰💰💰💰💰💰💰💰💰💰💰💰💰💰💰💰💰💰💰💰💰💰💰💰💰
`));


let pin = '55555';
console.log(chalk.bgBlueBright(`
************************
The pin code is    ${pin}
************************
`));

let amount : number = 50000;


let ans = await inquirer.prompt([
    {
        name : "pin",
        type : "password",
        message : "ENTER YOUR 5 DIGIT PIN"
    }
])
if (ans.pin === pin){
    console.log(chalk.magentaBright(`Correct Pincode`));
while(true){
     let options = await inquirer.prompt([
        {
            name : "ans",
            type : "list",
            message : "Please select any option",
            choices : ["Chack Balance" , "Send Money" , "Bill Payments" , "Mobile Packages" , "Easyload" , "Exit"]
        }
    ]); 
    if (options.ans === "Chack Balance"){
        console.log(chalk.cyanBright.bold.italic(`✅ Your avaiable balance is ${amount}`));
        

    }else if(options.ans === "Send Money"){
        let sendto = await inquirer.prompt([
            {
                name : "send",
                type : "list",
                message : "Please select an option to send money",
                choices : ["easypaisa Transfer" , "Bank Transfer" , "CNIC Transfer"]
            }
        ]);
        if(sendto.send === "easypaisa Transfer"){
            let num = await inquirer.prompt([
                {
                    type : "number",
                    name : "rcvr",
                    message : "Enter receiver's mobile number"
                },
                {
                    type : "number",
                    name : "money",
                    message : "Enter an amount to send"
                }
            ]);
            if (num.money > amount){
                console.log(chalk.bgRedBright.italic.bold(`❌Sorry! you have insuffient balance. Your availabe balance is ${amount}`));
                
            } else if (num.money <= amount) {
                amount = amount-num.money;
                console.log(chalk.greenBright.italic.bold(`✅ You have successfuly transfered ${num.money}Rs to ${num.rcvr} and now your avaiable balance is ${amount}Rs`));
            };

        }else if(sendto.send === "Bank Transfer"){
            let bankName = await inquirer.prompt([
                {
                    type : "list",
                    name : "bank",
                    message : "Plase select an option for bank transfer",
                    choices : ["UBL" , "HBL" , "Habib Metro" , "Bank AlHabib" , "Bank Alfalah" , "Dubai islamic bank" , "Faisal bank" , "Allied bank" , "Meezan Bank"]
                },
                {
                    type : "number",
                    name : "cash",
                    message : "Enter an amount to transfer"
                }
            ]);
            if (bankName.cash > amount){
                console.log((`❌ Sorry! you have insufficient balance. Your available balance is ${amount}`));
                
            }else if(bankName.cash <= amount)
                if ((bankName.bank === "UBL") || (bankName.bank === "HBL") || (bankName.bank === "Habib Metro")
                 || (bankName.bank === "Bank AlHabib") || (bankName.bank === "Bank Alfalah")
                  || (bankName.bank ==="Dubai islamic bank") || (bankName.bank === "Faisal bank") 
                  || (bankName.bank === "Allied bank") || (bankName.bank === "Meezan Bank"))
                  amount = amount-bankName.cash;  
            console.log(chalk.yellowBright.bold.italic(`✅ You have successfuly transfered ${bankName.cash}rs to ${bankName.bank} your available balance is ${amount-bankName.cash}rs`));
        
        }else if (sendto.send === "CNIC Transfer"){
            let cnc = await inquirer.prompt([
                {
                    type : "number",
                    name : "nic",
                    message : "Enter CNIC number to send Money"
                },
                {
                    type : "number",
                    name : "amt",
                    message : "Enter an amount to send"
                }
            ]);
            if(cnc.amt > amount){
                console.log(chalk.bgRedBright.bold(`❌ Sorry! You have insuffient balance. Your total balance is ${amount}Rs`));
                
            }else if (cnc.amt <= amount) {
                amount = amount-cnc.amt;
                console.log(chalk.greenBright.bold.italic(`✅ You have successfuly transfered ${cnc.amt}Rs to ${cnc.nic}. Now your available balance is ${amount}Rs`));
                
            }
        }
    }else if(options.ans === "Bill Payments"){
        let bill = await inquirer.prompt([
            {
                name : "bills",
                type : "list",
                message : "Please select an option for bill payments",
                choices : ["KE" , "Sui Gass" , "Water and sewerage"]
            },
            {
                name : "amounts",
                type : "confirm",
                message : "Your bill is 10,000 rs, Do You want to pay"
            }
        ]);
        if(bill.amounts === true){
            amount = amount - 10000;
            console.log(chalk.blueBright.italic.bold(`✅ Your ${bill.bills} bill is paid now. Your new balance is ${amount}Rs`));
            
        }

    }else if(options.ans === "Mobile Packages"){
        let pkg = await inquirer.prompt([
            {
                name : "ans",
                type : "confirm",
                message : "Do you want to reactive your last mount package"
            }
        ]);
        if (pkg.ans === true){
            amount = amount - 2000;
            console.log(chalk.greenBright.italic.bold(`✅ You have successfuky subscribed again your previous package. Now your available balance is ${amount}Rs`));
        }

    }else if (options.ans === "Easyload"){
        let esyload = await inquirer.prompt([
            {
                name : "num",
                type : "number",
                message : "Enter a number for easyload"
            },
            {
                name : "load",
                type : "number",
                message : "Enter an amount for easyload"
            }
        ]);
        if (esyload.load > amount){
            console.log(chalk.bgRedBright.italic.bold(`❌ Sorry! you have in suffient balance. Your availabe balance is ${amount}Rs`));
            
        }else {
            amount = amount - esyload.load;
            console.log(chalk.magentaBright.italic.bold(`✅ ${esyload.load}Rs is successfuly sent to ${esyload.num}. Now your available balance is ${amount}Rs`));
            
        }
    }else if (options.ans === "Exit"){
        console.log(chalk.yellow.bold.italic(`☺️☺️☺️☺️ Thanks for using easypaisa App ☺️☺️☺️☺️`));
        
    break;
    }
}
  
}else{
    console.log(chalk.bgMagentaBright.bold.italic(`❌ Sorry! You enterd invalid Pincode`));
    
};









