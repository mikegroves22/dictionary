document.getElementById("search").addEventListener("keyup",(e)=>{
    const search = document.getElementById("search").value
    if (e.key === 'Enter' &&  search !="") {
        document.getElementById("word").innerHTML = search
        words(search)
      }
})

document.querySelector("img").addEventListener("click",()=>{
    document.getElementById("word-sound").play()
})

async function words(search) {
    const response = await fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + search);
    
    

    const word = await response.json();

    if(word.title){
        document.getElementById("word").innerHTML = word.title
    }else{

    
document.querySelector("img").style.display = "block"
 document.getElementById("word-sound").src = word[0].phonetics[0].audio
    document.getElementById('meanings').innerHTML = ""

//partsOfSpeech
    let meanings = document.getElementById('meanings');
    for (let i = 0; i <= word[0].meanings.length -1; i++) {
        
        let partOfSpeech = document.createElement('div');
        partOfSpeech.innerHTML = word[0].meanings[i].partOfSpeech
        partOfSpeech.classList = "partOfSpeech"
        partOfSpeech.id = "partOfSpeech" + i
        meanings.appendChild(partOfSpeech);


        
         partOfSpeech = document.getElementById('partOfSpeech' + i);
        for (let j = 0; j < word[0].meanings[i].definitions.length; j++) {
//definitions
            let definition = document.createElement('div');
            definition.innerHTML = "Definition " + (i+1) + ": " + word[0].meanings[i].definitions[j].definition
            definition.classList = "definition"
            partOfSpeech.appendChild(definition);

// examples
            if(word[0].meanings[i].definitions[j].example === undefined){
                // do nothing
            }
            else{

            
            let example = document.createElement('div');
            example.innerHTML =  "example: "+word[0].meanings[i].definitions[j].example
            example.classList = "example"
            partOfSpeech.appendChild(example);
        }
    }; 
            
        }
    };
  

  
}

 
