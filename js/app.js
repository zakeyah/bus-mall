const names=['bag','banana','bathroom','boots','breakfast','bubblegum','chair','cthulhu','dog-duck','dragon','pen','pet-sweep','scissors','shark','sweep','tauntaun','unicorn','usb','water-can','wine-glass']

const leftImage=document.getElementById('left-image');
const middleImage=document.getElementById('middle-image');
const rightImage=document.getElementById('right-image');
const imagesSection=document.getElementById('images-section');
const resultsSection=document.getElementById('results-section');
const resultButton=document.getElementById('result-button')
let chancess=25;
function Products (name){
    this.name=name;
    this.path=`./image/${name}.jpg`;
    this.votes = 0;
    this.views = 0;
    Products.all.push(this);
}
Products.all=[];
for(let i=0 ; i<names.length;i++){
  new Products(names[i])
}

function render(){
let leftIndex = randomNumber(0, Products.all.length -1);
let middleIndex = randomNumber(0, Products.all.length -1);
let rightIndex = randomNumber(0, Products.all.length -1);
while(leftIndex===middleIndex || middleIndex===rightIndex || leftIndex===rightIndex){
 leftIndex = randomNumber(0, Products.all.length -1);
 middleIndex = randomNumber(0, Products.all.length -1);
 rightIndex = randomNumber(0, Products.all.length -1);
}
Products.all[leftIndex].views++;
Products.all[middleIndex].views++;
Products.all[rightIndex].views++;

leftImage.src = Products.all[leftIndex].path;
leftImage.title = Products.all[leftIndex].name;
leftImage.alt = Products.all[leftIndex].name;

middleImage.src = Products.all[middleIndex].path;
middleImage.title = Products.all[middleIndex].name;
middleImage.alt = Products.all[middleIndex].name;

rightImage.src = Products.all[rightIndex].path;
rightImage.title = Products.all[rightIndex].name;
rightImage.alt = Products.all[rightIndex].name;
}

imagesSection.addEventListener('click', handleClick);
function handleClick(event){
  if(event.target.id !=='images-section'){
    for (let i=0 ; i<Products.all.length;i++){
      if (Products.all[i].name === event.target.title){
        Products.all[i].votes++;
        break;
      }
    }
    if (chancess=== 0){
     imagesSection.removeEventListener('click',handleClick)
     resultButton.addEventListener('click', finish);
    }else{
      chancess--
      render()
    }

  }
}
function finish(){
  const ulEl= document.createElement('ul')
  resultsSection.appendChild(ulEl)
  for (let i=0 ;i<Products.all.length;i++){
    let liEl = document.createElement('li');
    ulEl .appendChild(liEl)
    liEl.textContent=` - ${Products.all[i].name} had ${Products.all[i].votes} votes and was shown ${Products.all[i].views} times .`
  }

}

render();



function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}