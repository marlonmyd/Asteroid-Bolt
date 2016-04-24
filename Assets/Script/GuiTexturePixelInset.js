@script ExecuteInEditMode()
transform.position = Vector3.zero;
transform.localScale = Vector3.zero;
var TutorialTexture : Texture2D[];
var TextureInt =0;
function Start () {
//ChangeTexture();
}

function Update () {
if(TextureInt >5){
TextureInt =5;
}
if(TextureInt < 0){
TextureInt =0;
}
GetComponent.<GUITexture>().pixelInset = Rect (0, 0, Screen.width , Screen.height);
if(TextureInt ==0){
//guiTexture.texture = TutorialTexture[0];
}
if(TextureInt ==1){
//guiTexture.texture = TutorialTexture[1];
}
if(TextureInt ==2){
//guiTexture.texture = TutorialTexture[2];
}
if(TextureInt ==3){
//guiTexture.texture = TutorialTexture[3];
}
if(TextureInt ==4){
GetComponent.<GUITexture>().texture = TutorialTexture[4];
}
if(TextureInt ==5){
//guiTexture.texture = TutorialTexture[5];
}

}