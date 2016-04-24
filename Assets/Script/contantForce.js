#pragma strict

function Start () {
GetComponent(ConstantForce).torque =Vector3(Random.Range(30,50),0,0);
}

function Update () {

}