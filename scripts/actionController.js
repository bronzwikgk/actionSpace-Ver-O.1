/**
 * Controller :: listen and conduct action || event on  View && Model
 */

class ActionController extends ehhEvent {

    constructor(context, view,model) {
        super(context);
        this.view = view;
        this.model=model;

        this.on('updateEditor',this.view.updateDomContent)
    }



}
