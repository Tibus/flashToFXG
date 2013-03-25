var doc = fl.getDocumentDOM();
var library = doc.library;
var items = library.items;

// get url from .fla and add ./bin folder
var url = doc.pathURI.split(doc.name).join("") + "bin/";
FLfile.createFolder(url);

var item;
var length = items.length;

//for each items
for(var i = 0; i<length; i++)
{
	item = items[i];
	//if item as linkage parameters
	if(item.linkageExportForAS)
	{
		if(item.itemType == "button")
		{
			//if it's a simple button, export 1st and 2nd frame
			library.editItem(item.name);
			doc.exportFXG(url + items[i].linkageClassName+"Up.fxg");
			item.timeline.currentFrame = 1;
			doc.exportFXG(url + items[i].linkageClassName+"Down.fxg");
		}else
		{
			library.editItem(item.name);
			doc.exportFXG(url + items[i].linkageClassName+".fxg");
		}
	}
}

doc.editScene(0);
