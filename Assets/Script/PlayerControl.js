var ForwardSpeed=5.0;
var Bullet:GameObject;
var BulletSpawner:GameObject;
var HP=100.0;
var HPMax=100.0;
var HPImage:UI.Image;
var Ani:Animator;
var Rotate=true;
var HScore=0;
var Score=0;
var ScoreTxt:UI.Text;
var HScoreTxt:UI.Text;
var HScoreScoreTxt:UI.Text;
var SpeedLevel=0;
var Explosion:GameObject;
var ExplosionSpawner:GameObject;
var HScorePanel:GameObject;
var GameOver=false;
var PlayingGui:GameObject;


function HScoreManager(){
	HScorePanel.active=true;
	yield WaitForSeconds(2);
	
}
function Save(){
	 PlayerPrefs.SetInt("HScore", HScore);
	
}
function Load(){
	
	HScore=PlayerPrefs.GetInt("HScore");
}
function Start () {
	Load();
Screen.sleepTimeout = SleepTimeout.NeverSleep;
}
function HitManager(){
	transform.eulerAngles.x =Random.Range(45,180);
	//Ani.enabled=true;
	//yield WaitForSeconds(1.0);
	//Ani.enabled=false;
	
}
function Update () {
	
	if(GameOver){
		PlayingGui.active=false;
		if (Input.touchCount > 0 ){
			Application.LoadLevel("loading");
		}
	}
	if(Score >=HScore){
		HScore=Score;
		 Save();
	}
	if(HP <=0){
		
		HScoreManager();
		GameOver=true;
	}
	if(Rotate){
		
			transform.localRotation.y =Random.Range(45,180);
	}
	
	if(SpeedLevel >=10){
		ForwardSpeed +=5;
		SpeedLevel=0;
	}
	ScoreTxt.text="Score: " +Score.ToString("F0");
	HScoreTxt.text=HScore.ToString("F0");
	HScoreScoreTxt.text=Score.ToString("F0");
	HPImage.fillAmount=HP/HPMax;
	
	transform.Translate(Vector3.forward * ForwardSpeed * Time.deltaTime);
	
	if (Input.GetButtonDown("Fire1")) {
		Instantiate(Bullet,BulletSpawner.transform.position,BulletSpawner.transform.rotation);
			if(GameOver){
		
			Application.LoadLevel("loading");
		}
	}
	
	
}

function OnTriggerEnter (other : Collider) {
		if(other.tag =="Meteor"){
		
		HP -=10.0;
		Instantiate(Explosion,ExplosionSpawner.transform.position,ExplosionSpawner.transform.rotation);
		Destroy(other.gameObject);
		if (Application.platform == RuntimePlatform.Android){
		Handheld.Vibrate();
		}
	HitManager();
	
	
	
		
		}
	}