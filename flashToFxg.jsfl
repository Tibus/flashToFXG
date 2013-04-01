var doc = fl.getDocumentDOM();
var library = doc.library;
var items = library.items;

// JSFL
fl.outputPanel.clear();

// get url from .fla and add ./bin folder
var url = doc.pathURI.split(doc.name).join("") + "ui/";
FLfile.createFolder(url);
 
// Clear the output panel 
fl.outputPanel.clear()

var item;
var length = items.length;
var getters = "";
var imports = "";
var register = "";
var initialWidth = doc.width;
var initialHeight = doc.height;

//for each items
for(var i = 0; i<length; i++)
{
	item = items[i];
	//if item as linkage parameters
	if(item.linkageExportForAS)
	{
		library.selectItem(item.name, true);
	
		doc.library.addItemToDocument({x:0, y:0});
    
    	var w = doc.selection[0].width;
    	var h = doc.selection[0].height;
    
   		doc.width = Math.ceil(w);
		doc.height = Math.ceil(h);

		fl.trace(item.name+" : "+w+"/"+h+" : "+doc.width+"/"+doc.height);
				
		doc.deleteSelection();
		
		if(item.itemType == "button")
		{
			//if it's a simple button, export 1st and 2nd frame
			library.editItem(item.name);
			doc.exportFXG(url + items[i].linkageClassName+"Up.fxg");
			getters += logGetter(items[i].linkageClassName+"Up");
			register += logRegisters(items[i].linkageClassName+"Up");
			imports += logImports(items[i].linkageClassName+"Up");
			
			item.timeline.currentFrame = 1;
			doc.exportFXG(url + items[i].linkageClassName+"Down.fxg");
			getters += logGetter(items[i].linkageClassName+"Down");
			register += logRegisters(items[i].linkageClassName+"Down");
			imports += logImports(items[i].linkageClassName+"Down");
		}else
		{
			library.editItem(item.name);
			doc.exportFXG(url + items[i].linkageClassName+".fxg");
			getters += logGetter(items[i].linkageClassName);
			register += logRegisters(items[i].linkageClassName);
			imports += logImports(items[i].linkageClassName);
		}
	}
	
	doc.editScene(0);
}

doc.editScene(0);
<<<<<<< HEAD
=======
doc.width = initialWidth;
doc.height = initialHeight;

fl.trace(imports);
fl.trace(getters);
fl.trace(register);

function logGetter(name)
{
	var getName = name.charAt(0).toLowerCase() + name.slice(1);
	var string = "";
	string += "\npublic function get "+getName+"() : Texture";
	string += "\n{";
	string += "\n	return getTexture("+name+")";
	string += "\n}\n";
	return string;
}

function logRegisters(name)
{
	var string = "";
	string += "\nregisterTexture("+name+");";
	return string;
}

function logImports(name)
{
	var string = "";
	string += "\nimport ui."+name+";";
	return string;
}
>>>>>>> add dynamic width and height for every .fxg
