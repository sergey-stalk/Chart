function readFile(object) {
    var file = object.files[0]
    var reader = new FileReader()
    data = [];
    reader.onload = function() {
      rawData = JSON.parse(reader.result);
    }
    reader.readAsText(file)
    $('svg').remove();
}

$('#file').change(function () {
  readFile($('#file')[0]); 
});