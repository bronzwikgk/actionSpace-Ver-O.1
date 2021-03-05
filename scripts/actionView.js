/**
 * class that mostly interacts with controller and Data from dom.
 * It' takes care of the rendering part of the view.
 * It works first registering a custom function from the controller class
 */
class ActionSpaceView {
    model;
    constructor(model, elements) {
        this.model = model
        this.elements = elements

    }

    updateDomContent=(data)=> {
        this.model.updateJson(data)
        document.getElementById('actionOutput-block').innerHTML=data
    }

    getDomContent() {

    }
    updateDom(cmd) {
        console.log("update Dom Called")
        const headingDiv = document.createElement("div");
        headingDiv.classList.add("div-block");
        headingDiv.contentEditable = "true";
        const editor = document.getElementsByTagName("divblock")[0];

        editor.appendChild(headingDiv);
        headingDiv.focus();

        if (cmd === "headingBlock") {

            document.execCommand("formatBlock", false, '<h1>');
        } else if (cmd === "paraBlock") {
            document.execCommand("formatBlock", false, '<p>');

        }
    }
}
