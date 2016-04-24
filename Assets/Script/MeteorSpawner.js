var Metior:GameObject;
var Timer=5.0;
var rotatespeed : float = 20;
var RotateDirection:Vector3;

function Start () {
	Timer=0;
RotateDirection.x =Random.Range(0.0,1.0);
	RotateDirection.y =Random.Range(0.0,1.0);
	RotateDirection.z =Random.Range(0.0,1.0);
	//rotatespeed=Random.Range(5,10);
}

function Update () {
	
		
 transform.Rotate(RotateDirection * Time.deltaTime * rotatespeed);
 
Timer -=Time.deltaTime;

if(Timer <=0){
	
	Instantiate(Metior,transform.position,transform.rotation);
	Timer= Random.Range(1,10);
	
	}
}