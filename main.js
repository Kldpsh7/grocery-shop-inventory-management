const baseUrl='https://crudcrud.com/api/7c20eb2a7dab41ddbf6b17d27dbf1e6f/shop'

document.getElementById('inputForm').addEventListener('submit',(e)=>{
    e.preventDefault()
    let name=e.target.name.value;
    let disc=e.target.disc.value;
    let quant=e.target.quant.value;
    let obj={
        name,
        disc,
        quant
    };
    axios.post(baseUrl,obj)
    .then((res)=>{
        console.log(res.data)
        displayItem(res.data)
        document.getElementById('name').value='';
        document.getElementById('disc').value='';
        document.getElementById('quant').value='';
    })
    .catch((err)=>console.log(err))
})

function displayItem(item){
    let li=document.createElement('li');
    li.id=item._id;
    li.style="margin:5px";
    let span=document.createElement('span');
    span.innerText=`${item.name} || ${item.disc} || ${item.quant}`;
    li.appendChild(span);
    let buyBtn=document.createElement('button');
    buyBtn.style="background:yellow;float:right;";
    buyBtn.innerText='Buy';
    buyBtn.className='buy';
    li.appendChild(buyBtn);
    let numBox=document.createElement('input');
    numBox.type='number'
    numBox.style="float:right;width:125px"
    numBox.placeholder='Purchase quantity';
    li.appendChild(numBox);
    document.getElementById('list').appendChild(li)
}

document.getElementById('list').addEventListener('click',e=>{
    if (e.target.className=='buy'){
        let eid=e.target.parentElement.id;
        let buying=parseInt(e.target.parentElement.lastElementChild.value);
        let stock=parseInt(e.target.parentElement.firstElementChild.innerText.split(' || ')[2]);
        if (buying<1){
            alert('Please enter a valid buying quantity');
        }
        else if (buying>stock){
            alert('Not Enough Items in Stock');
        }
        else{
            let name=e.target.parentElement.firstElementChild.innerText.split(' || ')[0];
            let disc=e.target.parentElement.firstElementChild.innerText.split(' || ')[1];
            let quant=stock-buying;
            let obj={
                name,
                disc,
                quant
            }
            axios.put(`${baseUrl}/${eid}`,obj)
            .then(res=>{
                axios.get(`${baseUrl}/${eid}`)
                .then(res=>{
                    document.getElementById(eid).firstElementChild.innerText=`${res.data.name} || ${res.data.disc} || ${res.data.quant}`;
                    document.getElementById(eid).lastElementChild.value='';
                })
                .catch(err=>console.log(err))
            })
            .catch(err=>console.log(err))
        }
    }
})

window.addEventListener('DOMContentLoaded',()=>{
    axios.get(baseUrl)
    .then(res=>{
        res.data.forEach(element => {
            displayItem(element)
        });
    })
    .catch((err)=>console.log(err))
})