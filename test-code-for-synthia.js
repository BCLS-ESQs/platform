// OLD CODE - Synthia should optimize this
function oldDocumentGenerator(name, data) {
    console.log("Starting generation...");
    var templatePath = "templates/" + name;
    var content = require("fs").readFileSync(templatePath);
    var result = content.toString().replace("{{PLACEHOLDER}}", data.value);
    console.log("Done with generation");
    return result;
}
