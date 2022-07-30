(function () {
    //Получаем объект который будем анимировать
    function findElement(params, el) {
        if (params['is_trigger'] === 'element') {
            return el.querySelector(".animate");
        }
        if (params['is_trigger'] === 'class') {
            return document.querySelectorAll(params['trigger_class']);
        }
        throw new Error('Element not found');
    }

    function getTweenParams(params, tween) {
        const filteredEntries = Object.entries(params)
            .filter(([key]) => key.startsWith(tween))
            .map(([key, value]) => [key.substr(tween.length + 1), value]);
        return Object.fromEntries(filteredEntries);
    }

    function makeMotionParams(params) {
//Конфигурируем TO задержку и продолжительность
        const motionParams = {
            delay: params['option_delay'] / 100,
            duration: params['option_duration'] / 100,
        };
//Добавляем изменеие по осям
        if (params['is_translate'] === 'xyz') {
            motionParams.x = params['option_x'];
            motionParams.y = params['option_y'];
            motionParams.z = params['option_z'];
        }
//Добавляем изменеие по осям в процентах
        if (params['is_translate'] === 'percent') {
            motionParams.xPercent = params['option_x_percent'];
            motionParams.yPercent = params['option_y_percent'];
        }
//Добавляем изменения в размере
        if (params['is_scale'] === 'all') {
            motionParams.scale = params['option_scale'] / 100;
        }
        if (params['is_scale'] === 'xy') {
            motionParams.scaleX = params['option_scale_x'] / 100;
            motionParams.scaleY = params['option_scale_y'] / 100;
        }
//Добавляем вращение
        if (params['is_rotate'] === 'z') {
            motionParams.rotation = params['option_rotation_z'];
        }
        if (params['is_rotate'] === 'xy') {
            motionParams.rotationX = params['option_rotation_x'];
            motionParams.rotationY = params['option_rotation_y'];
        }
        if (params['is_rotate'] === 'xyz') {
            motionParams.rotation = params['option_rotation_z'];
            motionParams.rotationX = params['option_rotation_x'];
            motionParams.rotationY = params['option_rotation_y'];
        }
//Добавляем искажение
        if (params['is_skew'] === 'xy') {
            motionParams.skewX = params['option_skew_x'];
            motionParams.skewY = params['option_skew_y'];
        }
//stagger
        if (params['is_stagger'] === 'on') {
            motionParams.stagger = params['option_stagger'];
        }
//ease
        if (params['is_ease'] === 'on') {
            motionParams.ease = params['option_ease'];
        }
//repeat
        if (params['is_repeat'] === 'on') {
            motionParams.repeat = params['option_repeat'];
            motionParams.repeatDelay = params['option_repeat_delay'];
        }
//yoyo
        if (params['is_yoyo'] === 'on') {
            motionParams.yoyo = params['option_yoyo'];
            motionParams.yoyoEase = params['option_yoyo_ease'];
        }
//more css
        if (params['is_more_css'] === 'on') {
            motionParams.backgroundColor = params['option_background_color'];
        }
//transformPerspective
        if (params['is_perspective'] === 'on') {
            motionParams.transformPerspective = params['option_transform_perspective'];
        }
        return motionParams;
    }

    function makeTimelineParams(params) {
        //Конфигурируем TO задержку и продолжительность
        const timelineParams = {
            delay: params['timeline_delay'] / 100
        };
        //ease
        if (params['is_timeline_defaults'] === 'on') {
            timelineParams.ease = params['timeline_ease'];
            timelineParams.duration = params['timeline_duration']/ 100;
        }
        //repeat
        if (params['is_timeline_repeat'] === 'on') {
            timelineParams.repeat = params['timeline_repeat'];
            timelineParams.repeatDelay = params['timeline_repeat_delay'];
        }
        //yoyo
        if (params['is_timeline_yoyo'] === 'on') {
            timelineParams.yoyo = true;
        }
        return timelineParams;
    }

    function addMotion(params, gsapObject, element) {
        if (params['type'] === "to") {
            gsapObject.to(element, makeMotionParams(getTweenParams(params, 'to')));
        }
        if (params['type'] === "from") {
            gsapObject.from(element, makeMotionParams(getTweenParams(params, 'from')));
        }
        if (params['type'] === "fromTo") {
            gsapObject.fromTo(element, makeMotionParams(getTweenParams(params, 'from')), makeMotionParams(getTweenParams(params, 'to')));
        }
    }

    function addAnimation(el, params) {
        const element = findElement(params, el);
        if (params['timeline_status'] === "on") {
            const timelines = window.crTimelines ||= {};
            const timelineName = params['timeline_name'] || 'cr_global_common';

            if (!timelines[timelineName]) {
                timelines[timelineName] = gsap.timeline(makeTimelineParams(params));
            }
            const timeline = timelines[timelineName];
            addMotion(params, timeline, element);
        } else {
            addMotion(params, gsap, element);
        }
    }

    window.crUplineAddGSAPAnimation = addAnimation;
})()