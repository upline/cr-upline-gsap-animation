//gsap.registerPlugin(ScrollTrigger);

function findElement(params){
    if(params['is_trigger'] == 'element'){
        return el.querySelector(".animate");
    }
    if(params['is_trigger'] == 'class'){
        return document.querySelectorAll(params['trigger_class']);
    }
    throw new Error('Element not found');
}


const element = findElement(params);


//Конфигурируем TO задержку и продолжительность
const crMotionTo = {
    delay : params['to_option_delay']/100,
    duration : params['to_option_duration']/100,
};
//Добавляем изменеие по осям
if(params['to_is_translate'] == 'xyz'){
    crMotionTo.x = params['to_option_x'];
    crMotionTo.y = params['to_option_y'];
    crMotionTo.z = params['to_option_z'];
}
//Добавляем изменеие по осям в процентах
if(params['to_is_translate'] == 'percent'){
    crMotionTo.xPercent = params['to_option_x_percent'];
    crMotionTo.yPercent = params['to_option_y_percent'];
}
//Добавляем изменения в размере
if(params['to_is_scale'] == 'all'){
    crMotionTo.scale = params['to_option_scale']/100;
}
if(params['to_is_scale'] == 'xy'){
    crMotionTo.scaleX = params['to_option_scale_x']/100;
    crMotionTo.scaleY = params['to_option_scale_y']/100;
}
//Добавляем вращение
if(params['to_is_rotate'] == 'z'){
    crMotionTo.rotation = params['to_option_rotation_z'];
}
if(params['to_is_rotate'] == 'xy'){
    crMotionTo.rotationX = params['to_option_rotation_x'];
    crMotionTo.rotationY = params['to_option_rotation_y'];
}
if(params['to_is_rotate'] == 'xyz'){
    crMotionTo.rotation = params['to_option_rotation_z'];
    crMotionTo.rotationX = params['to_option_rotation_x'];
    crMotionTo.rotationY = params['to_option_rotation_y'];
}
//Добавляем искажение
if(params['to_is_skew'] == 'xy'){
    crMotionTo.skewX = params['to_option_skew_x'];
    crMotionTo.skewY = params['to_option_skew_y'];
}

//stagger
if(params['to_is_stagger'] == 'on'){
    crMotionTo.stagger = params['to_option_stagger'];
}
//ease
if(params['to_is_ease'] == 'on'){
    crMotionTo.ease = params['to_option_ease'];
}
//repeat
if(params['to_is_repeat'] == 'on'){
    crMotionTo.repeat = params['to_option_repeat'];
    crMotionTo.repeatDelay = params['to_option_repeat_delay'];
}
//yoyo
if(params['to_is_yoyo'] == 'on'){
    crMotionTo.yoyo = params['to_option_yoyo'];
    crMotionTo.yoyoEase = params['to_option_yoyo_ease'];
}
//more css
if(params['to_is_more_css'] == 'on'){
    crMotionTo.backgroundColor = params['to_option_background_color'];
}






// //Конфигурируем FROM
// const crMotionFrom = {};
// if(!params['from_option_x'] == 0){
// 	crMotionFrom.x = params['from_option_x'];
// }
// if(!params['from_option_y'] == 0){
// 	crMotionFrom.y = params['from_option_y'];
// }
// if(!params['from_option_rotation'] == 0){
// 	crMotionFrom.rotation = params['from_option_rotation'];
// }
// if(params['from_option_delay']>0){
// 	crMotionFrom.delay = params['from_option_delay'];
// }
// if(params['from_option_duration']>0){
// 	crMotionFrom.duration = params['from_option_duration'];
// }

// crMotionTo.scrollTrigger = {
// 	trigger: element,
// 	start: "bottom bottom",
// 	toggleActions: "play pause reverse pause",
// 	scrub: 1,
// };
console.log(crMotionTo);
if(params['type']=="to"){
    gsap.to(element, crMotionTo);

}
// else if(params['type']=="from"){
// 	gsap.from(element, crMotionFrom);

// }else if(params['type']=="fromto"){
// 	gsap.fromTo(element, crMotionTo, crMotionFrom);
// }