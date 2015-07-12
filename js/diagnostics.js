$(document).ready(function() {
	var log = $("#log");
	var myo = Myo.create(0);

	myo.on('arm_recognized', function() {
		$("#arm-status").removeClass().addClass("on");
	});
	myo.on('arm_lost', function() {
		$("#arm-status").removeClass().addClass("off");
	});
	myo.on('connected', function() {
		$("#connect-status").removeClass().addClass("on");
	});
	myo.on('disconnected', function() {
		$("#connect-status").removeClass().addClass("off");
	});
	myo.on('lock', function() {
		$("#lock-status").get("i").removeClass("fa-unlock").addClass("fa-lock");
	});
	myo.on('unlock', function() {
		$("#lock-status").get("i").removeClass("fa-lock").addClass("fa-unlock");
	});

	myo.on('imu', function(data) {
		$("#o-x").val(data.orientation.x);
		$("#o-y").val(data.orientation.y);
		$("#o-z").val(data.orientation.z);
		$("#o-w").val(data.orientation.W);

		$("#g-x").val(data.gyroscope.x);
		$("#g-y").val(data.gyroscope.y);
		$("#g-z").val(data.gyroscope.z);

		$("#a-x").val(data.accelerometer.x);
		$("#a-y").val(data.accelerometer.y);
		$("#a-z").val(data.accelerometer.z);
	});

	myo.on('pose', function(pose_name, edge) {
		var pmsg = pose_name + (edge ? " on" : " off") + "\n";
		$("#pose-history").html($("#pose-history").html() + pmsg);
		$("#pose-history").scrollTop($("#pose-history")[0].scrollHeight);
	});

	myo.on('rest', function() {
		$("#pose").prop("src", "ui/img/myo_icon_white.png");
	});
	myo.on('wave_left', function(){
		$("#pose").prop("src", "ui/img/wave_left.png");
	});
	myo.on('fist', function(){
		myo.requestBluetoothStrength();
		$("#pose").prop("src", "ui/img/fist.png");
	});
	myo.on('wave_right', function(){
		$("#pose").prop("src", "ui/img/wave_right.png");
	});
	myo.on('fingers_spread', function() {
		$("#pose").prop("src", "ui/img/spread.png");
	});
	myo.on('thumb_to_pinky', function() {
		$("#pose").prop("src", "ui/img/unlock.png");
	});

	myo.on('connected', function() {
		setInterval(function() {
			myo.requestBluetoothStrength();
		}, 100);
	});

	myo.on('bluetooth_strength', function(BTS) {
		var width = ((BTS * -1 - 40 ) / 50 ) * 100  + '%';
		$('#bt-strength > .progress-bar').width(width).html(width);
	});
});
