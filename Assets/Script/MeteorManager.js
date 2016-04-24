#pragma strict
var rotatespeed : float = 5;
var RotateDirection:Vector3;
var Player:GameObject;
var Explosion:GameObject;

function Start () {
RotateDirection.x =Random.Range(0.0,1.0);
	RotateDirection.y =Random.Range(0.0,1.0);
	RotateDirection.z =Random.Range(0.0,1.0);
	rotatespeed=Random.Range(5,10);
}

function Update () {
	Player=GameObject.Find("Player");
 transform.Rotate(RotateDirection * Time.deltaTime * rotatespeed);
}

function OnTriggerEnter (other : Collider) {
		if(other.tag =="bullet"){
		Destroy(other.gameObject);
		Destroy(gameObject);
		Player.GetComponent(PlayerControl).Score +=1;
		Player.GetComponent(PlayerControl).SpeedLevel +=1;
		Instantiate(Explosion,transform.position,transform.rotation);
		}
	}