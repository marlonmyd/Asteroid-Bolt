var MouseExit:Sprite;
var MouseHover:Sprite;
var MouseUp:Sprite;
var MenuManager:GameObject;
var MenuGUI:GameObject;
function Start () {

}

function Update () {

}
function OnMouseEnter () {
		if(tag=="retry"){
		gameObject.GetComponent(Animator).enabled=true;
		}
		if(tag=="play"|| tag=="info"||tag=="exit"){
		gameObject.GetComponent(SpriteRenderer).sprite =MouseHover;
		}
		if(tag == "play"){
		
		}
		if(tag == "info"){
		
		}
		if(tag == "exit"){
		
		}
	}
function OnMouseDown () {
		if(tag=="retry"){
		Application.LoadLevel("BangusGame");
		}
		if(tag=="play"||tag== "info"||tag=="exit"){
		gameObject.GetComponent(SpriteRenderer).sprite=MouseUp;
		
		}
		if(tag == "playagain"){
		
		Application.LoadLevel("BangusGame");
		//MenuManager.GetComponent(MenuManagerByMYD).save();
		}
		
		
		if(tag == "play"){
	
		
		}
		
		
		if(tag == "exit"){
		
		Application.Quit();
		}
			if(tag == "info"){
		
		Application.LoadLevel("Info");
		}
		
		//MenuManager.GetComponent(MenuManagerByMYD).Info ="";
	}
function OnMouseExit () {
		if(tag=="play"||tag== "info"||tag=="exit"){
		gameObject.GetComponent(SpriteRenderer).sprite= MouseExit;
		
		}
		if(tag=="retry"){
		gameObject.GetComponent(Animator).enabled=false;
		}
	}