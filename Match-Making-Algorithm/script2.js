const orgObjList = [
  {name:'Release-1', colVal : 1}, {name : 'Release-2', colVal : 1}, {name : 'Release-3', colVal : 1},
    {name : 'Release-4', colVal : 1}, {name : 'Release-5', colVal : 2}, {name : 'Release-6', colVal : 2},
    {name : 'Release-7', colVal : 2}, {name : 'Release-8', colVal : 2}, {name : 'Release-9', colVal : 1},
    {name : 'Release-10', colVal : 1},{name : 'Release-11', colVal : 1}
];

orgObjList.forEach(item => console.log(`[name: ${item.name}, colVal: ${item.colVal}]`));

//Match Making to group the releases into 3 columns in each row
//Assume there is at least 1 release in the list

let rowNum = 1;
let colSum = 0;
const totalItems = orgObjList.length;
const limit = 3; // limit to 3 columns

orgObjList.forEach((item, curIndex) =>{
   
    if(!item.row){ //this item is not assigned a row yet
        item.row = rowNum; //set the row number of the first item in the row
        colSum = item.colVal; //reset to first item of the new row
        
        if(curIndex < (totalItems - 1) ){
            //Skip the match making if it is last item
            
            //Start to match make with rest of the items
            for(let i = curIndex+1; i < totalItems; i++){
                colSum += orgObjList[i].colVal;
                
                if(colSum <= limit && (!orgObjList[i].row)){
                    //Match this unassigned item within the limit
                    orgObjList[i].row = rowNum; //set the same row number
                    
                }else{
                    //Either unmatched or the item has been already assigned
                   colSum -= orgObjList[i].colVal; //revert to original and skip this item

                }
            }
            
        } 
        
       rowNum++; //increment to next row for match making, assuming the above match making is completed to the best fit 
    }
                
});

console.log('After match making is completed.............');
orgObjList.forEach(item => console.log(`[name: ${item.name}, colVal: ${item.colVal}, row: ${item.row}]`));

console.log('After sorting the rows......................');

orgObjList.sort((a,b) => a.row - b.row);

orgObjList.forEach(item => console.log(`[name: ${item.name}, colVal: ${item.colVal}, row: ${item.row}]`));


const renderSortedRelease = (objList) => {
  
    const tableArray = [];
    
    //loop each row number starting from 1 to find matching rows of the data object elements
    for (let i = 1; i <= objList.length; i++){
        
        let newRowArray = [];
        
        objList.forEach(el =>{
           
            //Find the matching row of the elements
            if(el.row === i){
                 
                let markup = `<td colspan="${el.colVal}" style="background-color:${el.row % 2? 'white': 'yellow'}; text-align: center; font-weight: 800">${el.name}</td>`;
                newRowArray.push(markup);               
            }
                       
        });
        
        if(newRowArray.length > 0)
            tableArray.push(newRowArray.join(''));
    }
    
    const finalTableStr = tableArray.map(rowEl => `<tr>${rowEl}</tr>`).join('');
    
    document.getElementById('sorted-releases').insertAdjacentHTML('beforeend',finalTableStr);
}

//const renderReleases = () => {
//    
//    const markup = `
//                <tr>
//                    <td colspan="1" style="background-color:yellow; text-align: center">Release 1</td>
//                    <td colspan="1" style="background-color:yellow; text-align: center">Release 2</td>
//                    <td colspan="1" style="background-color:yellow ;text-align: center">Release 3</td>
//                </tr>
//    `;
//    
//    document.getElementById('sorted-releases').insertAdjacentHTML('beforeend',markup);
//        
//};

const clearReleases = () => {
    
    document.getElementById('sorted-releases').innerHTML = '';
        
};

document.getElementById('btn-releases').addEventListener('click', event => renderSortedRelease(orgObjList));

document.getElementById('btn-releases-clear').addEventListener('click',clearReleases);




