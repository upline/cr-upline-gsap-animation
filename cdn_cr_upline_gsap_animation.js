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

    function makeMotionParams(params,scrollTrigger) {
//Конфигурируем TO задержку и продолжительность
        const motionParams = {
        };
        if (params['is_timing'] === 'on') {
            motionParams.delay = params['option_delay'] / 100;
            motionParams.duration = params['option_duration'] / 100;
        }
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
        if (params['is_background'] === 'on') {
            motionParams.backgroundColor = params['option_background_color'];
        }
        //more css
        if (params['is_is_opacity'] === 'on') {
            motionParams.backgroundColor = params['option_opacity'];
        }
//transformPerspective
        if (params['is_perspective'] === 'on') {
            motionParams.transformPerspective = params['option_transform_perspective'];
        }
        if (scrollTrigger) {
            motionParams.scrollTrigger = scrollTrigger;
        }
        return motionParams;
    }

    function makeScrollTrigger(element,params) {
        if (params['scrolltrigger_status'] === 'off') {
            return null;
        }
        const scrollTrigger = {};
        if (params['is_scrolltrigger_trigger'] === 'class') {
            scrollTrigger.trigger = params['scrolltrigger_trigger'];
        }else{
            scrollTrigger.trigger = element;
        }
        if (params['is_scrolltrigger_start'] === 'on') {
            scrollTrigger.start = params['scrolltrigger_trigger_start_text'];
        }
        if (params['is_scrolltrigger_end'] === 'on') {
            scrollTrigger.end = params['scrolltrigger_trigger_end_text'];
        }
        if (params['is_scrolltrigger_scrub'] === 'on') {
            scrollTrigger.scrub = true;
        }
        if (params['is_scrolltrigger_scrub'] === 'second') {
            scrollTrigger.scrub = params['scrolltrigger_scrub_second'];
        }
        if (params['is_scrolltrigger_pin'] === 'on') {
            scrollTrigger.pin = true;
        }
        if (params['is_scrolltrigger_pin'] === 'second') {
            scrollTrigger.pin = params['scrolltrigger_pin_second'];
        }
        if (params['is_scrolltrigger_markers'] === 'on') {
            scrollTrigger.markers = true;
        }
        if (params['is_scrolltrigger_toggle_actions'] === 'on') {
            scrollTrigger.toggleActions = params['scrolltrigger_toggle_actions_first_in'] + " " + params['scrolltrigger_toggle_actions_first_out'] + " " + params['scrolltrigger_toggle_actions_second_in'] + " " + params['scrolltrigger_toggle_actions_second_out'];
        }// other actions: play pause resume reset complete reverse none
        if (params['is_scrolltrigger_toggle_class'] === 'on') {
            scrollTrigger.toggleClass = params['scrolltrigger_toggle_class'];
        }
        if (params['is_scrolltrigger_fast_scroll_end'] === 'on') {
            scrollTrigger.fastScrollEnd = true;
        }
        if (params['is_scrolltrigger_fast_scroll_end'] === 'second') {
            scrollTrigger.fastScrollEnd = params['scrolltrigger_fast_scroll_end'];
        }
        return scrollTrigger;
    }

    function makeTimelineParams(params,scrollTrigger) {
        //Конфигурируем TO задержку и продолжительность
        const timelineParams = {
            delay: params['timeline_delay'] / 100
        };
        //ease
        if (params['is_timeline_defaults'] === 'on') {
            timelineParams.defaults = {};
            timelineParams.defaults.ease = params['timeline_ease'];
            timelineParams.defaults.duration = params['timeline_duration']/ 100;
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
        if (scrollTrigger) {
            timelineParams.scrollTrigger = scrollTrigger;
        }
        return timelineParams;
    }

    function addMotion(params, gsapObject, element, scrollTrigger) {
        if (params['type'] === "to") {
            gsapObject.to(element, makeMotionParams(getTweenParams(params, 'to'),scrollTrigger));
        }
        if (params['type'] === "from") {
            gsapObject.from(element, makeMotionParams(getTweenParams(params, 'from'),scrollTrigger));
        }
        if (params['type'] === "fromto") {
            gsapObject.fromTo(element, makeMotionParams(getTweenParams(params, 'from'),scrollTrigger), makeMotionParams(getTweenParams(params, 'to')));
        }
    }

    function addAnimation(el, params) {
        const element = findElement(params, el);
        const scrollTrigger = makeScrollTrigger(element,params);
        if (params['timeline_status'] === "on") {
            const timelines = window.crTimelines ||= {};
            const timelineName = params['timeline_name'] || 'cr_global_common';
            if (!timelines[timelineName]) {
                timelines[timelineName] = gsap.timeline(makeTimelineParams(params,scrollTrigger));
            }
            const timeline = timelines[timelineName];
            addMotion(params, timeline, element);
        } else {
            //Уточнить у Лехи нормальная ли идея прокидывать сюда скролтригер
            addMotion(params, gsap, element,scrollTrigger);
        }
    }

    window.crUplineAddGSAPAnimation = addAnimation;
})()