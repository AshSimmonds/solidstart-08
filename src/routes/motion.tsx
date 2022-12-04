import Layout from "~/components/Layout"
import PageTitle from "~/components/PageTitle"
import { Component, createSignal, mergeProps, Show } from "solid-js";
import { Motion, Presence } from "@motionone/solid";
import { Rerun } from "@solid-primitives/keyed"
import { Repeat } from "@solid-primitives/range"

export default function MotionPage() {

    return (
        <Layout>
            <PageTitle>Motion One / Dev</PageTitle>
            <h1>Motion One / Dev</h1>

            <h2>Default / basic</h2>
            <MotionDefault />

            <h2>Rotate 90, change yellow</h2>
            <MotionRotate90 />

            <h2>Rotate 90, change yellow, slowly</h2>
            <MotionRotate90Slow />

            <h2>Click to change background colour</h2>
            <MotionClickToChangeBackground />

            <h2>Keyframes something</h2>
            <MotionKeyframes />

            <h2>Exit animation</h2>
            <MotionExit />

            <h2>Animate between components</h2>
            <MotionAnimateBetween />

            <h2>SVG loading spinner - <code>OFFSET</code> unknown</h2>
            <MotionSVGLoadingSpinner offset={0} segments={8} />

            <h2>SVG path drawing (✓ in a circle)</h2>
            <MotionSVGPathDrawing />

            <h2>Hover</h2>
            <MotionHover />

            <h2>Press</h2>
            <MotionPress />

            <h2>Transition</h2>
            <MotionTransition />

            <h2>Events (check dev console log)</h2>
            <MotionEvents />
        </Layout>
    )
}


const MotionDefault: Component = () => {
    return (
        <Motion.div
            animate={{ opacity: [0, 1] }}
            transition={{ duration: 1, easing: "ease-in-out" }}
            class="bg-secondary p-4"
        >
            animate=opacity: [0, 1]
            transition=duration: 1, easing: "ease-in-out"
        </Motion.div>
    )
}


const MotionRotate90: Component = () => {
    return (
        <Motion.div
            animate={{ rotate: 90, backgroundColor: "yellow" }}
            transition={{ duration: 1, easing: "ease-in-out" }}
            class="bg-secondary p-4"
        >
            animate=rotate: 90, backgroundColor: "yellow"
            transition=duration: 1, easing: "ease-in-out"
        </Motion.div>
    )
}


const MotionRotate90Slow: Component = () => {
    return (
        <Motion.div
            animate={{ rotate: 90, backgroundColor: "yellow" }}
            transition={{
                duration: 1,
                rotate: { duration: 4 },
            }}
            class="bg-secondary p-4"
        >
            animate=rotate: 90, backgroundColor: "yellow"
            transition=duration: 1,
            rotate: duration: 4
        </Motion.div>
    )
}


const MotionClickToChangeBackground: Component = () => {
    const [bg, setBg] = createSignal("red")

    return (
        <Motion.button
            onClick={() => setBg("blue")}
            animate={{
                backgroundColor: bg(),
            }}
            transition={{
                duration: 3,
            }}
        >
            onClick=setBg("blue")
        </Motion.button>
    )
}


const MotionKeyframes: Component = () => {
    const [bg, setBg] = createSignal("red")

    return (
        <Motion animate={{ x: [0, 100, 50] }}
            transition={{ x: { offset: [0, .25, 1] } }}
            class="bg-secondary p-4"
        >
            animate=x: 0, 100, 50
            transition=x: offset: [0, 0.25, 1]
        </Motion>
    )
}



const MotionExit: Component = () => {
    const [toggle, setToggle] = createSignal(true)

    return (
        <div class="container">
            <button onClick={() => setToggle(!toggle())}>
                Show / Hide
            </button>
            <Presence exitBeforeEnter>
                <Show when={toggle()}>
                    <Motion.div
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.6 }}
                        transition={{ duration: 0.3 }}
                        class="bg-secondary p-4"
                    >
                        initial=opacity: 0, scale: 0.6
                        animate=opacity: 1, scale: 1
                        exit=opacity: 0, scale: 0.6
                        transition=duration: 0.3
                    </Motion.div>
                </Show>
            </Presence>
        </div>
    )
}



const MotionAnimateBetween: Component = () => {

    const [count, setCount] = createSignal(1)
    const increment = () => setCount((p) => ++p)

    return (
        <>
            <button onClick={increment}>Next</button>
            <Presence exitBeforeEnter>
                <Rerun on={count()}>
                    <Motion
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0, transition: { delay: 0.05 } }}
                        transition={{ duration: 0.1 }}
                        exit={{ opacity: 0, x: -50 }}
                        class="bg-secondary p-4"
                    >
                        {count()}
                    </Motion>
                </Rerun>
            </Presence>
        </>
    )
}


const MotionSVGLoadingSpinner: Component<{ offset: number, segments: number }> = (props) => {
    props = mergeProps({ offset: 0.09, segments: 8 }, props)

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
            <Repeat times={props.segments}>
                {i => (
                    <g class="segment">
                        <Motion.path
                            d="M 94 25 C 94 21.686 96.686 19 100 19 L 100 19 C 103.314 19 106 21.686 106 25 L 106 50 C 106 53.314 103.314 56 100 56 L 100 56 C 96.686 56 94 53.314 94 50 Z"
                            style={{
                                transform: 'rotate(' + (360 / props.segments) * i + 'deg)'
                            }}
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{
                                offset: [0, 0.1, 1],
                                duration: props.offset * props.segments,
                                delay: i * props.offset,
                                repeat: Infinity,
                            }}
                            class="bg-secondary p-4"
                        />
                    </g>
                )}
            </Repeat>
        </svg>
    )
}



const MotionSVGPathDrawing: Component = (props) => {
    const draw = (progress: number) => ({
        // This property makes the line "draw" in when animated
        strokeDashoffset: 1 - progress,

        // Each line will be hidden until it starts drawing
        // to fix a bug in Safari where the line can be
        // partially visible even when progress is at 0
        visibility: "visible",
    })

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
            <Motion.circle
                cx="100"
                cy="100"
                r="80"
                pathLength="1"
                animate={draw(1)}
                transition={{ duration: 0.8, delay: 2 }}
                class="bg-secondary p-4"
            />
            <Motion.path
                d="M 54 107.5 L 88 138.5 L 144.5 67.5"
                pathLength="1"
                animate={draw(1)}
                transition={{ duration: 0.6, delay: 2.4 }}
                class="bg-secondary p-4"
            />
        </svg>
    )
}


const MotionHover: Component = () => {
    return (
        <Motion.div
            hover={{ scale: 1.2 }}
            class="bg-secondary p-4"
        >
            hover=scale: 1.2
        </Motion.div>
    )
}


const MotionPress: Component = () => {
    return (
        <Motion.div
            press={{ scale: 0.9 }}
            class="bg-secondary p-4"
        >
            press=scale: 0.9
        </Motion.div>
    )
}



const MotionTransition: Component = () => {
    const [toggle, setToggle] = createSignal(true)

    return (
        <>
            <button onClick={() => setToggle(!toggle())}>
                Show / Hide
            </button>
            <Presence exitBeforeEnter>
                <Show when={toggle()}>

                    <Motion.div
                        animate={{ x: 100, transition: { duration: 0.2 } }}
                        exit={{ x: 0, transition: { duration: 1 } }}
                        transition={{ duration: 0.5 }}
                        class="bg-secondary p-4"
                    >
                        animate=x: 100, transition:duration: 0.2
                        exit=x: 0, transition:duration: 1
                        transition=duration: 0.5
                    </Motion.div>
                </Show>
            </Presence>
        </>
    )
}


const MotionEvents: Component = () => {
    const [toggle, setToggle] = createSignal(true)

    return (
        <>
            <button onClick={() => setToggle(!toggle())}>
                Show / Hide
            </button>

            <Presence exitBeforeEnter>
                <Show when={toggle()}>
                    <Motion.div
                        class="bg-secondary p-4"
                        animate={{ opacity: [0, 1] }}
                        exit={{ x: 0, opacity: 0, scale: 0.6 }}
                        transition={{ duration: 0.5 }}
                        hover={{ scale: 1.2 }}
                        press={{ scale: 0.9 }}
                        inView={{ scale: 1.1, background: 'blue', transition: { duration: 3.5 } }}
                        inViewOptions={{ amount: 0.5 }}
                    
                        onMotionStart={({ detail }) => console.log("onMotionStart: ", detail)}
                        onMotionComplete={({ detail }) => console.log("onMotionComplete: ", detail)}
                        onHoverStart={({ detail }) => console.log("onHoverStart: ", detail)}
                        onHoverEnd={({ detail }) => console.log("onHoverEnd: ", detail)}
                        onPressStart={({ detail }) => console.log("onPressStart: ", detail)}
                        onPressEnd={({ detail }) => console.log("onPressEnd: ", detail)}
                        onViewEnter={({ detail }) => console.log("onViewEnter: ", detail)}
                        onViewLeave={({ detail }) => console.log("onViewLeave: ", detail)}
                    >
                        onMotionStart onMotionComplete onHoverStart onHoverEnd onPressStart onPressEnd onViewEnter onViewLeave
                    </Motion.div>
                </Show>
            </Presence>
        </>
    )
}

