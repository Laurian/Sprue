var gui	= new dat.GUI({
	// closed: true,
	// load: presets2,
	// preset: 'Intro'
});

function wrap3D(obj, ui, f, g, p) {
	var w = {
		obj:	obj,
		ui: 	ui,
		face:   f,
		faceGroup: g,
		parent: p,

		data: {
			originX: 0, rotateX: 0, scaleX: 0, X: 0, 
			originY: 0, rotateY: 0, scaleY: 0, Y: 0, 
			originZ: 0, rotateZ: 0, scaleZ: 0, Z: 0, 
			scale: 1,
			lights:  true,
	      opacity: 1
		},

		controllers: {
		},

		init: 	function() {

			// w.obj.bind('webkitTransitionEnd', function() {
			// 	// console.log('transend!');
			// 	animating = false;
			// 	// if (faceGroup) faceGroup.render(light, true, true);
			// 	// else if (w.face) w.face.render(light, true);
			// });

			w.sync();

			gui.remember(w.data);

			var position = w.ui.addFolder('Position');
			w.controllers.X = position.add(w.data, 'X');
			w.controllers.X.onChange(function (value){
				if (value == w.obj.x()) return;
				w.obj.x(value);
				w.update();
			});
			w.controllers.Y = position.add(w.data, 'Y');
			w.controllers.Y.onChange(function (value){
				if (value == w.obj.y()) return;
				w.obj.y(value);
				w.update();
			});
			w.controllers.Z = position.add(w.data, 'Z');
			w.controllers.Z.onChange(function (value){
				if (value == w.obj.z()) return;
				w.obj.z(value);
				w.update();
			});

		    w.controllers.opacity = position.add(w.data, 'opacity', 0, 1).step(0.1);
		    w.controllers.opacity.onChange(function (value){
		      $(obj).css('opacity', value);
		      w.update();
		    });

			var rotation = w.ui.addFolder('Rotation');
			w.controllers.rotateX = rotation.add(w.data, 'rotateX').step(0.25);
			w.controllers.rotateX.onChange(function (value){
				if (value == w.obj.rotationX()) return;
				w.obj.rotationX(value);
				w.update();
			});
			w.controllers.rotateY = rotation.add(w.data, 'rotateY').step(0.25);
			w.controllers.rotateY.onChange(function (value){
				if (value == w.obj.rotationY()) return;
				w.obj.rotationY(value);
				w.update();
			});
			w.controllers.rotateZ = rotation.add(w.data, 'rotateZ').step(0.25);
			w.controllers.rotateZ.onChange(function (value){
				if (value == w.obj.rotationZ()) return;
				w.obj.rotationZ(value);
				w.update();
			});

			var scale = w.ui.addFolder('Scale');
			w.controllers.scale = scale.add(w.data, 'scale').min(0).step(0.01);
			w.controllers.scale.onChange(function (value){
				if (value == w.obj.scale()) return;
				w.obj.scale(value);
				w.update();
			});


			w.revsync();

			for (controller in w.controllers) {
				w.controllers[controller].updateDisplay();
			}
		},

		sync: 	function() {
			w.data.X = w.obj.x();
			w.data.Y = w.obj.y();
			w.data.Z = w.obj.z();
			w.data.rotateX = w.obj.rotationX();
			w.data.rotateY = w.obj.rotationY();
			w.data.rotateZ = w.obj.rotationZ();
			w.scaleX = w.obj.scaleX();
			w.scaleY = w.obj.scaleY();
			w.scaleZ = w.obj.scaleZ();
			w.scale = w.obj.scale();

		},

		revsync: 	function() {
			w.obj.x(w.data.X);
			w.obj.y(w.data.Y);
			w.obj.z(w.data.Z);
			w.obj.rotationX(w.data.rotateX);
			w.obj.rotationY(w.data.rotateY);
			w.obj.rotationZ(w.data.rotateZ);
			w.obj.scale(w.scaleX, w.scaleY, w.scaleZ);
			w.obj.scale(w.scale);
			w.update();
		},

		update: function() {
			w.obj.update();
			w.sync();

			for (controller in w.controllers) {
				w.controllers[controller].updateDisplay();
			}
		}
	};
	w.init();
	return w;
}

	
$('.stage').each(function (i, stage) {
	var $stage	= $(Sprite3D.stage(stage));
	
	$stage.find('.xyz').each(function (i, obj) {
		var folder = gui.addFolder('Obj ' + i);
		wrap3D(Sprite3D.create(obj), folder);
		$(obj).datgui({
			gui: folder,
			css: {
				top: '0px',
				left: '0px',
				fontSize: '16px'
			},
			range: {
				top: [0, 300],
				left: [0, 300]
			}					
		});
	});
});