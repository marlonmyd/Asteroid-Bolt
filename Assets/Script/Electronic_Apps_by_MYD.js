@script ExecuteInEditMode()


//*****Resistor Circuit****//
var OhmsLaw=true;
var OhmsLawBG:Texture2D;
private  var R1=0.0;
private  var R2=0.0;
var Rt=0.0;
var Rt1=0.0;
var Rt2=0.0;
var R1String="";
var R2String="";
var RtString="";
var Rt1StringWindow : Rect = Rect (0.0, 0.0, 1194.81, 1200);
var XSpacing=100.0;
var YSpacing=100.0;
var SeriesConnection=false;
var ParallelConnection=false;
var nativeResulution=1200.0;
var guiSkin:GUISkin;
var FunctionSelect= "Series Circuit";
var addlift:PlayAdsSDK;
var LevelToLoad="";

var MainMenu=false;
var MainMenuButton : Rect = Rect (0.0, 0.0, 1194.81, 1200);
var BGMainMenuTexture:Texture2D;
var BG:GameObject;


var Formula=false;
var FormulaBackToMain=false;
var FormulaInt=0;
var FormulaButton : Rect = Rect (0.0, 0.0, 1194.81, 1200);
var FormulaTexture:Texture2D[];
//*****RLED Circuit****//
var RledCircuit=false;
var RLEDBG:Texture2D;
var RLED=0.0;  // Resistor Resistance for LED
private  var Es = 12.0; // source voltage
private  var 	Eled= 2.0; // is the voltage drop across the LED, measured in volts (V),
 private var 	Iled= 0.07; // is the current through the LED, measured in Amperes (Amps/A)
var EsString="";
var EledString="";
var IledString="";

//**** Diagram*****//
var Diagram=false;
var DiagramPlane:GameObject;
var ZenerDiodeTesterImage:Texture2D;
var FYCCTesterwithPowerSupply:Texture2D[];
var DiagramInt=1;
//**** Swiping AI*****//
var StartPos:Vector2;
var SwipeID = -1;
var minMovement = 20.0;

function Start () {
BG.active =true;
}
function PlayAdds(){
//addlift.enabled=false;
//yield WaitForSeconds(3.0);
Application.LoadLevel(LevelToLoad);
//addlift.enabled=true;
PlayAdsSDK.ShowLoadingScreen( true );
		PlayAdsSDK.Show();
//yield WaitForSeconds(6.0);
//addlift.PlayAds_InterstitialClosed();
yield WaitForSeconds(5.0);
//Application.LoadLevel(LevelToLoad);

}
function ConvertTextFieldToInt(){

float.TryParse(R1String,R1);
float.TryParse(R2String,R2);
float.TryParse(EsString,Es);
float.TryParse(EledString,Eled);
float.TryParse(IledString,Iled);

}
function DiagramAI(){
if(Diagram){
if(DiagramInt < 0){
	DiagramInt = 7;
}
if(DiagramInt > 7){
	DiagramInt = 0;
}
if(DiagramInt == 0){
	DiagramPlane.GetComponent.<Renderer>().material.mainTexture = ZenerDiodeTesterImage;
}
if(DiagramInt == 1){
	DiagramPlane.GetComponent.<Renderer>().material.mainTexture = FYCCTesterwithPowerSupply[0];
}
if(DiagramInt == 2){
	DiagramPlane.GetComponent.<Renderer>().material.mainTexture = FYCCTesterwithPowerSupply[1];
}
if(DiagramInt == 3){
	DiagramPlane.GetComponent.<Renderer>().material.mainTexture = FYCCTesterwithPowerSupply[2];
}
if(DiagramInt == 4){
	DiagramPlane.GetComponent.<Renderer>().material.mainTexture = FYCCTesterwithPowerSupply[3];
}
if(DiagramInt == 5){
	DiagramPlane.GetComponent.<Renderer>().material.mainTexture = FYCCTesterwithPowerSupply[4];
}
if(DiagramInt == 6){
	DiagramPlane.GetComponent.<Renderer>().material.mainTexture = FYCCTesterwithPowerSupply[5];
}
if(DiagramInt == 7){
	DiagramPlane.GetComponent.<Renderer>().material.mainTexture = FYCCTesterwithPowerSupply[6];
}

}
}


var h : float;
var v : float ;
function KeyBoard () {
		switch (Application.platform)
		{
			case RuntimePlatform.OSXWebPlayer:
			case RuntimePlatform.WindowsWebPlayer:
			case RuntimePlatform.NaCl:
			case RuntimePlatform.WindowsEditor :
			case RuntimePlatform.FlashPlayer:
			case RuntimePlatform.OSXPlayer:
			case RuntimePlatform.WindowsPlayer:
			
			DiagramPlane.transform.rotation= Quaternion.Euler (0,0,0);
			DiagramPlane.transform.localScale= Vector3(2.536843,1.613224,7.083264);
			
			h=  Input.GetAxis ("Horizontal");
			v=  Input.GetAxis ("Vertical");
			if(Input.anyKeyDown){
			if(h < 0){
			DiagramInt -=1;
			FormulaInt -=1;
			}
			if(h >0){
			DiagramInt +=1;
			FormulaInt +=1;
			}
			}
			break;
			case RuntimePlatform.Android:
			case RuntimePlatform.IPhonePlayer:
			break;
		

		}
}

function SwipeAi(){
   for each (var T in Input.touches) {
       var P = T.position;
       if (T.phase == TouchPhase.Began && SwipeID == -1) {
         SwipeID = T.fingerId;
         StartPos = P;
       } else if (T.fingerId == SwipeID) {
         var delta = P - StartPos;
         if (T.phase == TouchPhase.Moved && delta.magnitude > minMovement) {
          SwipeID = -1;
          if (Mathf.Abs (delta.x) > Mathf.Abs (delta.y)) {
              if (delta.x > 0) {
 
                 Debug.Log ("Swipe Right Found");
              if(Formula){
			  FormulaInt -=1;
			  }
			  } else {
			 if(Formula){
				FormulaInt +=1;
				
			  }
                 Debug.Log ("Swipe Left Found");
              }
          } 
          else {
              if (delta.y > 0) {
 
                 Debug.Log ("Swipe Up Found");
				 DiagramInt -=1;
              } else {
				DiagramInt +=1;
                 Debug.Log ("Swipe Down Found");
              }
          }
         } else if (T.phase == TouchPhase.Canceled || T.phase == TouchPhase.Ended)
          SwipeID = -1;
       } 
    }
}
function Update () {
//R1=R1String.ToString();
ConvertTextFieldToInt();
SwipeAi();
DiagramAI();
KeyBoard ();

if(FormulaInt < 0){
	FormulaInt = 4;
	}
if(FormulaInt > 4){
	FormulaInt = 0;
	}	

if(Formula){
	if(FormulaInt ==0){
		BG.GetComponent.<GUITexture>().texture=FormulaTexture[0];
	}
	if(FormulaInt ==1){
		BG.GetComponent.<GUITexture>().texture=FormulaTexture[1];
	}
	if(FormulaInt ==2){
		BG.GetComponent.<GUITexture>().texture=FormulaTexture[2];
	}
	if(FormulaInt ==3){
		BG.GetComponent.<GUITexture>().texture=FormulaTexture[3];
	}
	if(FormulaInt ==4){
		BG.GetComponent.<GUITexture>().texture=FormulaTexture[4];
	}

}
	 if (Input.GetKeyDown (KeyCode.Escape) )
			{
				if(FormulaBackToMain){
					FormulaBackToMain=false;
				}
				else{
					FormulaBackToMain=true;
				}
			}
}
function OnGUI(){

var scale : Vector3 = Vector3(Screen.width / nativeResulution, Screen.height / nativeResulution,1.0f);
 var   guiMatrix = Matrix4x4.TRS(Vector3.zero, Quaternion.identity, scale);
GUI.matrix = guiMatrix;

GUI.skin = guiSkin;
var Rt1StringWindow=Rt1StringWindow;
// Make a multiline text area that modifies stringToEdit.
		
		
		if(MainMenu){
			RledCircuit=false;
			OhmsLaw=false;
			BG.GetComponent.<GUITexture>().texture=BGMainMenuTexture;
			var MainMenuButton=MainMenuButton;
			if(GUI.Button(MainMenuButton, "Resistor")){
				OhmsLaw=true;
				MainMenu=false;
			}
			MainMenuButton.y +=100;
			if(GUI.Button(MainMenuButton, "RLED")){
				RledCircuit=true;
				MainMenu=false;
			}
			MainMenuButton.y +=100;
			if(GUI.Button(MainMenuButton, "Formula")){
				Formula=true;
				MainMenu=false;
				FormulaInt =4;
			}
				MainMenuButton.y +=100;
			if(GUI.Button(MainMenuButton, "Diagram")){
				Formula=false;
				MainMenu=false;
				Diagram=true;
				BG.active=false;
				FormulaBackToMain=false;
				
			}
			
		
		}
		if (Formula  || Diagram) {
		
		var FormulaButton = FormulaButton;
		
			
			if(FormulaBackToMain){
			if(GUI.Button(FormulaButton, "Back To Main")){
				MainMenu=true;
				Formula=false;
				Diagram=false;
				BG.active=true;
				PlayAdds();
			}
			FormulaButton.x += 400;
			//if(GUI.Button(FormulaButton, "Next")){
				
			//}
			}
		
		}
		if(RledCircuit){
		BG.GetComponent.<GUITexture>().texture=RLEDBG;
		GUI.Label (Rect ( Rt1StringWindow), "Voltage Source");
		Rt1StringWindow.y += YSpacing;
		EsString = GUI.TextArea (Rect (Rt1StringWindow), EsString, 200);
		Rt1StringWindow.y += YSpacing;
		GUI.Label (Rect ( Rt1StringWindow), "Voltage Drop by LED");
		Rt1StringWindow.y += YSpacing;
		EledString = GUI.TextArea (Rect (Rt1StringWindow), EledString, 200);
		Rt1StringWindow.y += YSpacing;
		GUI.Label (Rect ( Rt1StringWindow), "Current of LED");
		
		Rt1StringWindow.y += YSpacing;
		IledString = GUI.TextArea (Rect (Rt1StringWindow), IledString, 200);
		
		Rt1StringWindow.y += YSpacing;
		GUI.Label (Rect ( Rt1StringWindow), "RLED");
		Rt1StringWindow.y += YSpacing;
		GUI.Box(Rect(Rt1StringWindow),RLED.ToString("f"));
		Rt1StringWindow.y += YSpacing;
		if(GUI.Button(Rt1StringWindow, "Calculate")){
			Calculate();
			PlayAdds();
		}
		Rt1StringWindow.y += YSpacing;
		if(GUI.Button(Rt1StringWindow, "Back To Main")){
			RledCircuit=false;
			MainMenu=true;
		}
		}
		if(OhmsLaw){
			BG.GetComponent.<GUITexture>().texture=OhmsLawBG;
		
		GUI.Label (Rect ( Rt1StringWindow), "Ohms Law");
		Rt1StringWindow.y += YSpacing;
		
		if(GUI.Button(Rt1StringWindow, FunctionSelect)){
			
			if(ParallelConnection){
				ParallelConnection=false;
				SeriesConnection=true;
				
				FunctionSelect="Series Circuit";
			}
			else{
				SeriesConnection=false;
				ParallelConnection=true;
				FunctionSelect="Parallel Circuit";
			}
			
		Calculate();
			}
		Rt1StringWindow.y += YSpacing;
		GUI.Label (Rect ( Rt1StringWindow), "R1");
		Rt1StringWindow.y += YSpacing;
		R1String = GUI.TextArea (Rect (Rt1StringWindow), R1String, 200);
		Rt1StringWindow.y += YSpacing;
		GUI.Label (Rect ( Rt1StringWindow), "R2");
		Rt1StringWindow.y += YSpacing;
		R2String = GUI.TextArea (Rect (Rt1StringWindow), R2String , 200);
		Rt1StringWindow.y += YSpacing;
			GUI.Label (Rect ( Rt1StringWindow), "Rtotal");
		Rt1StringWindow.y += YSpacing;
		// alt 490 = ohms   + "Ω"
		 GUI.Box(Rect(Rt1StringWindow),Rt.ToString("f"));
		Rt1StringWindow.y += YSpacing + 30;
		if(GUI.Button(Rt1StringWindow, "Calculate")){
			Calculate();
			PlayAdds();
		}
		Rt1StringWindow.y += YSpacing + 50 ;
		
		if(GUI.Button(Rt1StringWindow, "Back To Main")){
			OhmsLaw=false;
			MainMenu=true;
		}
		}
}
function Calculate(){
if(RledCircuit){
	RLED= (Es - Eled) / Iled;
}

if(SeriesConnection){
	Rt=R1 + R2;
}
if(ParallelConnection){
	//Rt1=R1 * R2;
	//Rt2=R1 + R2;
	//Rt= Rt1/Rt2;
	Rt= R1 * R2 /( R1 + R2);
	
}
}