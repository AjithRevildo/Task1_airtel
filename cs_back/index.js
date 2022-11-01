const express = require('express')
const app = express()
const os = require('os')
const cors = require('cors')
const exec = require('child_process').exec; 

app.use(cors())
app.get('/info',async(req,res)=>{
      var result_arr = []
      var nameof
 exec('wmic logicaldisk get   Size',(error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }

   
  const values = (stdout.slice(4).trim().split(" "));

  var isNumber = function isNumber(value) 
{
   return typeof value === 'number' && isFinite(value);
}

  for(let i = 0; i< values.length;i++){
  
    if(!isNumber(i[0])){
        if(values[i].match(/[0-9]/gm) != null){
              result_arr.push(values[i].match(/[0-9]/gm).join(""))
           
        }
    }
   
  }

});
exec('wmic logicaldisk get Name ',(error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
   nameof = (stdout.slice(4).match(/[a-z]/igm))
  for(let i = 0 ;i < nameof.length;i++){

    console.log(`${nameof[i]} drive contians ${result_arr[i]} kb`)
}
});


//chips
const totalRAM = os.cpus();

//os realses
const home = os.release()

//totalmen
const ost = os.totalmem()

//userinfo
const userinfo = os.userInfo()
console.log(`owner: ${userinfo.username}`)

//drivelist


console.log(`version : Windows ${home}`)
// Print the result in MB
console.log(`Chip used: ${totalRAM[0].model}`)
console.log(`Total RAM: ${((ost/ (1024 * 1024))/1024).toFixed(3)} RAM`);
const ram = ((ost/ (1024 * 1024))/1024).toFixed(3)
const freeRAM = os.freemem();
// Print the result in MB
console.log(`Free RAm: ${((freeRAM / (1024 * 1024))/1024).toFixed(3)} RAM`);
const FREE = ((freeRAM / (1024 * 1024))/1024).toFixed(3)
console.log(result_arr)
console.log(nameof)

setTimeout(()=>{
     res.json({"owner":userinfo.username,
"version":home,"chip":totalRAM[0].model,"Total RAM":ram,"Free RAM":FREE,"result":result_arr,"NAME":nameof})
},2000)
   

}) 


app.listen(5000,(req,res)=>{
    console.log('im listenign to port')
})
