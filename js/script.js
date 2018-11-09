document.getElementById('audio_status').style.display="none";

var student_id = '970054364';
var reaction_time;
var audio_playing = false;
var play_times = 0;
var audio_tree = ['audio/stimuli/m2_sample.wav', 'audio/stimuli/m2_1.wav', 'audio/stimuli/m2_2.wav', 'audio/stimuli/m4_1.wav', 'audio/stimuli/m4_2.wav', 'audio/stimuli/m6_1.wav', 'audio/stimuli/m6_2.wav', 'audio/stimuli/m8_1.wav', 'audio/stimuli/m8_2.wav'];
var random_file = [[0,1,3,5],[0,2,4,6],[0,1,3,5],[0,2,4,6]];
var tnum = 0;
var audio_idx = 0;

function ROUND_TO(n, digits) {
     if (digits === undefined) {
       digits = 0;
     }
     var multiplicator = Math.pow(10, digits);
     n = parseFloat((n * multiplicator).toFixed(11));
     var test =(Math.round(n) / multiplicator);
     return +(test.toFixed(digits));
   }

function hideD(){
	document.getElementById('direction').hidden = true;
}
function showD(){
	document.getElementById('direction').hidden = false;
}
   
function enableNext(){
	nextButton.disabled = false;
	saveButton.disabled = true;
}
   
function NextStimuli(){
	audio_idx++;
	if ( audio_idx == random_file[tnum].length ){
		document.getElementById('message-title').innerHTML = "<h2>You have completed the experiment.Thank you!</h2>";
	}
	play_times = 0;
	document.getElementById('message').innerHTML = 5-play_times;
	document.getElementById('recordingsList').innerHTML = "";
	recordButton.disabled = true;
	stopButton.disabled = true;
	pauseButton.disabled = true;
	nextButton.disabled = true;
	document.getElementById('audioIDX').innerHTML = "Playing NO." + (audio_idx) + " (" + (2*audio_idx) + " measures)";
	document.getElementById('tNO').innerHTML = audio_idx;
}
 
function DeleteRecording(){
	
	document.getElementById('recordingsList').innerHTML = "";
}
 
function MAKE_A_SOUND(file)
{
	var audio = new Audio(file);
	audio.play();
	document.getElementById('audio_status').style.display="block";
	audio.addEventListener("ended", function()
	{
		recordButton.disabled = false;
	     audio.currentTime = 0;
	     audio_playing = false;
		 play_times++;
		 
		 document.getElementById('audio_status').style.display="none";
		 document.getElementById('message').innerHTML = 5-play_times;
	});
}

document.getElementById('send').addEventListener('click', () =>
{
	student_id = document.getElementById('name').value;
	tnum = Number(document.getElementById('tnum').value)-1;
	document.getElementById('enterID').innerHTML = "<h4>Your Student ID:</h4>";
	document.getElementById('studentID').innerHTML = student_id;
	document.getElementById('trialNO').innerHTML = tnum;
	if (tnum == 2 || tnum == 3)
		document.getElementById('tl').innerHTML = "<b><i>3. MOVE along to the rhythm while listening!</i></b>";
	else if (tnum == 0 || tnum == 1)
		document.getElementById('tl').innerHTML = "<b><i>3. DO NOT MOVE while listening.</i></b>";
});

document.addEventListener('keypress', function(LISTEN)
{
	if ( (LISTEN.keyCode == 112 || LISTEN.which == 112) && audio_playing === false )
	{
		audio_file = audio_tree[random_file[tnum][audio_idx]];
		console.log('Playing: ' + audio_file);
		if (play_times < 5){
			MAKE_A_SOUND(audio_file);
			audio_playing = true;
		}
	}
	else {}
});
