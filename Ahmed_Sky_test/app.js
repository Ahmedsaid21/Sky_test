
// creating a new file
$('#selectfile').on('change', handleFile);


// array for the movies
var programmesArray;


//this puts the movies in a file 
function handleFile(e) {
  var file = e.target.files[0];

  // this reads the
  var reader = new FileReader();
  reader.readAsText(file);

  // this loads the text files to parse to xml using jason 
  reader.onload = function(data) {
    var xmlParser = new DOMParser();
    var doc = xmlParser.parseFromString(data.target.result, 'application/xml');
    var jsonString = xml2json(doc).replace('undefined', '');
    programmesArray = JSON.parse(jsonString).programmeList.programme;
  }
}





// this is the java scriopt for the slidfer 
$(".slider").on("change", handleSliderChange);


function handleSliderChange(e) {
  if (programmesArray === undefined) {
    return; 
  }

  // changes the text into a intgeger
  var moodNumber = parseInt(e.target.value);

  // thjis finds the mood and decideds which movie goes where
  var moodSliderValue;

  if (moodNumber < 5) {
    moodSliderValue = e.target.dataset.left;
  } else {
    moodSliderValue = e.target.dataset.right;
  }

  // this links the mood to the slider 
  var matchingProgrammesArray = programmesArray.filter(function(programme) {
    return programme.mood === moodSliderValue;
  });


  // when the movie is found it goes into an array and adds the movie to the layout i have created  with there mages and index
  if (matchingProgrammesArray.length > 0) {

    
    $('.icon').each(function(index) {

      
      if (matchingProgrammesArray[index]) {

        
        $(this).attr('src', matchingProgrammesArray[index].image)

        
        $(`.movie-name:eq(${index})`).text(matchingProgrammesArray[index].name);
      }
    });
  } else {

  }

}
