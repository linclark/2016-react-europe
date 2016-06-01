// Import React
import React from "react";

// Import Spectacle Core tags
import {
  Appear,
  BlockQuote,
  Cite,
  CodePane,
  Code,
  Deck,
  Fill,
  Heading,
  Image,
  Layout,
  Link,
  ListItem,
  List,
  Markdown,
  Quote,
  Slide,
  Spectacle,
  Text
} from "spectacle";

// Import image preloader util
import preloader from "spectacle/lib/utils/preloader";

// Import theme
import createTheme from "../assets/theme";

// Require CSS
require("normalize.css");
require("spectacle/lib/themes/default/index.css");


const imageSets = {
  mozilla: 2,
  performance: 2,
  calendar: 6,
  mainThread: 13,
  ui: 12,
  vdom: 35,
  notecard: 4,
  flatten: 3,
  ss: 15,
  flush: 5,
  keyWarning: 1,
  keys: 3,
  immutable: 6,
  immutableComp: 2,
  keyComparison: 6,
  scu: 6,
  lowerInTree: 3,
  connect: 12,
}

const images = {
  me: require("../assets/lores/me.png"),
  title: require("../assets/lores/title.png"),
};

let num;
let index;
for (var prefix in imageSets) {
  num = imageSets[prefix];
  for (let i = 1; i < num + 1; i++) {
    index = i < 10 ? `0${i}` : i;
    images[`${prefix}${index}`] = require(`../assets/lores/${prefix}${index}.png`);
  }
};

preloader(images);

const theme = createTheme({
  primary: "#ffffff"
},
{
  primary: "codecartoons"
});

const summaryStyle = {
  color: "#006dc0",
  fontSize: "80px",
  textAlign: "left"
};

export default class Presentation extends React.Component {
  render() {
    return (
      <Spectacle theme={theme}>
        <Deck transition={["fade"]} transitionDuration={1000} progress={"none"} >
          <Slide bgColor="primary" notes="">
            <Image width="100%" src={images.title}/>
          </Slide>
          <Slide bgColor="primary" notes="Hi, I'm Lin Clark and I make code cartoons" bgImage={images.me}>
            <Heading size={2} padding="0 120px 0 0">
              Hi, I'm <Link href="https://twitter.com/linclark">@linclark</Link> and I make <Link href="https://twitter.com/codecartoons">@codecartoons</Link>.
            </Heading>
          </Slide>

          <Slide bgColor="primary" notes={`
            <ul>
            <li>work for mozilla</li>
            <li>on a browser, but not the one that you might think</li>
            </ul>
            `}>
            <Image width="100%" src={images.mozilla01}/>
          </Slide>
          <Slide bgColor="primary" notes={`
            <ul>
            <li>we're working on an experimental new browser</li>
            <li>called project tofino</li>
            <li>and it's built with React</li>
            <li>so if you want to hear more about that, ask me afterwards</li>
            <li>because I'm not here to talk about that</li>
            <li>here to talk about performance</li>
            </ul>
            `}>
            <Image width="100%" src={images.mozilla02}/>
          </Slide>
          <Slide bgColor="primary" notes="I should start by saying I'm not going to be telling you anything that you haven't already heard. I'm going to be talking about things like keys, and shouldComponentUpdate, and immutability. The reason I wanted to talk about them though...">
            <Image width="100%" src={images.performance01}/>
          </Slide>
          <Slide bgColor="primary" notes={`
            <ul>
            <li>fuzzy understanding of concepts around performance</li>
            <li>we don't take the time to bring it in to focus</li>
            <li>this means we treat the knowledge as received knowledge</li>
            <li>and just follow recommendations like shouldComponentUpdate because someone "smarter" than us told us to</li>
            <li>but not all recommendations work in all situations</li>
            <li>so I want to bring these concepts around performance into focus</li>
            </ul>
            `}>
            <Image width="100%" src={images.performance02}/>
          </Slide>
          <Slide bgColor="primary" notes={`
            <ul>
            <li>better understanding of when to use them</li>
            <li>...</li>
            <li>I'm focusing on specific part</li>
            <li>React render performance</li>
            </ul>
            `}>
            <Image width="100%" src={images.performance01}/>
          </Slide>
          <Slide bgColor="primary" notes={`
            <ul>
            <li>So the talk's going to go a little something like this</li>
            <li>The basics of rendering in the browser</li>
            <li>Minimizing and batching DOM changes with the virtual DOM</li>
            <li>What you can do to make it faster</li>
            </ul>
            `}>
            <ol style={summaryStyle}>
            <Appear><li>The basics of rendering in the browser</li></Appear>
            <Appear><li>Minimizing and batching DOM changes with the virtual DOM</li></Appear>
            <Appear><li>What you can do to make it faster</li></Appear>
            </ol>
          </Slide>
          <Slide bgColor="primary" notes={`
            <ul>
            <li>Let's start with 1</li>
            <li>...</li>
            <li>how the browser builds your web page</li>
            <li>you can think of it like how you build your web page</li>
            </ul>
            `}>
            <ol style={summaryStyle}>
            <li>The basics of rendering in the browser</li>
            </ol>
          </Slide>



          <Slide bgColor="primary" notes={`
            <ul>
            <li>The work takes place over time</li>
            </ul>
            `}>
            <Image width="100%" src={images.calendar01}/>
          </Slide>
          <Slide bgColor="primary" notes="The first, initial render is kind of like the launch of the site... ">
            <Image width="100%" src={images.calendar02}/>
          </Slide>
          <Slide bgColor="primary" notes="and then every interaction is like a new feature release to the site.">
            <Image width="100%" src={images.calendar03}/>
          </Slide>
          <Slide bgColor="primary" notes="">
            <Image width="100%" src={images.calendar04}/>
          </Slide>
          <Slide bgColor="primary" notes={`
            <ul>
            <li>To extend this metaphor</li>
            <li>your code is kind of like the project lead</li>
            <li>planning the project and telling folks what to do</li>
            <li>Unfortunately, your code only has one person doing the work on the project</li>
            <li>and that is the main thread</li>
            </ul>
            `}>
            <Image width="100%" src={images.calendar05}/>
          </Slide>
          <Slide bgColor="primary" notes={`
            <ul>
            <li>kind of like a full stack developer</li>
            <li>Javascript, DOM, layout</li>
            <li>Just as when you're working on a project in real life</li>
            <li>if you want to deliver quickly, you need to limit work</li>
            <li>And that's really what performance is about, reducing the amount of work you need to do.</li>
            <li>Before we know how to reduce the amount of work, we need to know more</li>
            </ul>
            `}>
            <Image width="100%" src={images.calendar06}/>
          </Slide>


          <Slide bgColor="primary" notes="As I mentioned before, the main thread is in charge of JavaScript, the DOM, and layout.">
            <Image width="100%" src={images.mainThread01}/>
          </Slide>
          <Slide bgColor="primary" notes="JavaScript you know. That's where your code lives. That's where you define functions and call them.">
            <Image width="100%" src={images.mainThread02}/>
          </Slide>
          <Slide bgColor="primary" notes="The DOM is the way the functions tell the page what to do. Basically the DOM gives you a set of objects that you can move around and manipulate in order to get the browser to change the page. The way this works is that there's something behind the scenes called the render tree.">
            <Image width="100%" src={images.mainThread03}/>
          </Slide>
          <Slide bgColor="primary" notes={`
            <ul>
            <li>the main thread combines the DOM with CSS to create the render tree</li>
            <li>figures out a thing called the box model from there</li>
            <li>That's what it passes off to the thing that paints pixels to the screen</li>
            <li>This is called a reflow, and that computation takes a bit of time</li>
            <li>so the main thread doesn't do it every time the DOM changes</li>
            <li>If it did, it would be spending most of it's time calculating what the browser should look like over and over again. Instead, what it tries to do is batch as many of these into the same group as possible.</li>
            </ul>
            `}>
            <Image width="100%" src={images.mainThread04}/>
          </Slide>
          <Slide bgColor="primary" notes="Let's say that our code wants to change a class name on a button. ">
            <Image width="100%" src={images.mainThread05}/>
          </Slide>
          <Slide bgColor="primary" notes="">
            <Image width="100%" src={images.mainThread06}/>
          </Slide>
          <Slide bgColor="primary" notes="...and then add a div">
            <Image width="100%" src={images.mainThread07}/>
          </Slide>
          <Slide bgColor="primary" notes="">
            <Image width="100%" src={images.mainThread08}/>
          </Slide>
          <Slide bgColor="primary" notes="... and then add another button.">
            <Image width="100%" src={images.mainThread09}/>
          </Slide>
          <Slide bgColor="primary" notes=" The main thread would keep making these changes to the DOM without recalulating the render tree. Then, once a recalcuation was scheduled....">
            <Image width="100%" src={images.mainThread10}/>
          </Slide>
          <Slide bgColor="primary" notes="it would go over to the render tree and recalculate everything together.">
            <Image width="100%" src={images.mainThread11}/>
          </Slide>
          <Slide bgColor="primary" notes="So we want to reduce the amount of work that the main thread has to do. Two good ways are 1. don't have your JS code make changes to the DOM unless they are necessary, and 2. if the JS code does have to make changes, be considerate to the main thread and how it works and group the requests for changes. That way the main thread can batch them.">
            <Image width="100%" src={images.mainThread12}/>
          </Slide>
          <Slide bgColor="primary" notes="And this is something that React helps you do. Now I want to be clear... React isn't the only way to do this. It's not actually a necessary part of doing this. These ideas have been around since well before React. These are already an accepted part of web development practice. So you can get as good or better performance with vanilla JS as you can React. It's not that React is necessarily faster than vanilla.">
            <Image width="100%" src={images.mainThread12}/>
          </Slide>
          <Slide bgColor="primary" notes="The thing is, though, in order to get that performance, your code has to be smart. Your code needs to know how to direct the main thread pretty precisely to do these things.">
            <Image width="100%" src={images.mainThread12}/>
          </Slide>
          <Slide bgColor="primary" notes={`
            <ul>
            <li>To go back to the metaphor, your code needs to be both a really really good product manager</li>
            <li>needs to know what your team should ship</li>
            <li>and it also needs to be a really really good tech lead</li>
            <li>it needs to know the most efficient way to direct the main thread in shipping</li>
            </ul>
            `}>
            <Image width="100%" src={images.mainThread12}/>
          </Slide>
          <Slide bgColor="primary" notes="Of course, your code is only as smart as you make it. So it means that all of the developers on your team have to have a really solid grasp of all of these concepts, and also not make mistakes. What React does for you is that it offloads that work. ">
            <Image width="100%" src={images.mainThread12}/>
          </Slide>
          <Slide bgColor="primary" notes={`
            <ul>
            <li>kind of like your code brings in a consultant to do the tech lead</li>
            <li>this frees up your code to just be a good product manager</li>
            <li>it can focus just on what needs to be displayed</li>
            <li>not on how the work happens</li>
            <li>...</li>
            <li>So let's take a look at how these two—React and your code—work together to direct the main thread.</li>
            <li>I won't be showing the main thread through the rest</li>
            </ul>
            `}>
            <Image width="100%" src={images.mainThread13}/>
          </Slide>
          <Slide bgColor="primary" notes={`
            <ul>
            <li>So this brings us to part two</li>
            <li>how React minimizes work using the virtual DOM</li>
            </ul>
            `}>
            <ol style={summaryStyle}>
            <li>The basics of rendering in the browser</li>
            <li>Minimizing and batching DOM changes with the virtual DOM</li>
            </ol>
          </Slide>
          <Slide bgColor="primary" notes="We'll start with the webpage that your team is going to be building... a button with a list.">
            <Image width="100%" src={images.ui01}/>
          </Slide>
          <Slide bgColor="primary" notes="When you click the button, it will multiply the value by itself">
            <Image width="100%" src={images.ui02}/>
          </Slide>
          <Slide bgColor="primary" notes=".... So let's walk through the initial render.">
            <Image width="100%" src={images.ui03}/>
          </Slide>


          <Slide bgColor="primary" notes="I'm going to start from the very beginning.">
            <Image width="100%" src={images.vdom01}/>
          </Slide>
          <Slide bgColor="primary" notes="The user has downloaded a page.">
            <Image width="100%" src={images.vdom02}/>
          </Slide>
          <Slide bgColor="primary" notes="That page has at least one HTML element. This will be the container for the React app">
            <Image width="100%" src={images.vdom03}/>
          </Slide>
          <Slide bgColor="primary" notes="At this point, React has been loaded and so has your code,">
            <Image width="100%" src={images.vdom04}/>
          </Slide>
          <Slide bgColor="primary" notes="including components... which are basically deputy product managers in charge of specific parts of the product.">
            <Image width="100%" src={images.vdom05}/>
          </Slide>
          <Slide bgColor="primary" notes={`
            <ul>
            <li>This is the code we're looking at</li>
            <li>in case it wasn't familiar</li>
            <li>it is ReactDOM.render()</li>
            <li>we pass in a React element, List in this case</li>
            <li>and the container that we want to render into... the HTML element</li>
            <li>...</li>
            <li>We already talked about the container.</li>
            <li>But what is this React element?</li>
            </ul>
            `}>
<pre style={{textAlign: "left"}}>{`
ReactDOM.render(<List />,
                document.getElementById("app"))
`}
</pre>
          </Slide>
          <Slide bgColor="primary" notes="It's a way for your code to hand off requirements to React... to tell React what needs to be displayed. Following the analogy... ">
            <Heading size={2}>What's an element?</Heading>
            <Image width="100%" src={images.notecard01}/>
          </Slide>
          <Slide bgColor="primary" notes="it's like a little notecard that has a few notes about what React needs to build.">
            <Heading size={2}>What's an element?</Heading>
            <Image width="100%" src={images.notecard02}/>
          </Slide>
          <Slide bgColor="primary" notes={`
            <ul>
            <li>It has the type, which is the component that's going to be used</li>
            <li>and it has the props and the children</li>
            <li>React will hold on to this element until it's ready to build the thing</li>
            <li>...</li>
            <li>and what it builds using this notecard, using these requirements, is an instance of the component</li>
            <li>the thing that holds on to the state and the refs and everything.</li>
            <li>when you call this.setState, it's the thing you're interacting with</li>
            <li>it's what React uses to see if it needs to change the DOM</li>
            </ul>
            `}>
            <Heading size={2}>What's an element?</Heading>
            <Image width="100%" src={images.notecard04}/>
          </Slide>
          <Slide bgColor="primary" notes="So your code asks for an element">
            <Image width="100%" src={images.vdom06}/>
          </Slide>
          <Slide bgColor="primary" notes="and React creates it">
            <Image width="100%" src={images.vdom07}/>
          </Slide>
          <Slide bgColor="primary" notes="Then your code tells React to start rendering that element into the container">
            <Image width="100%" src={images.vdom08}/>
          </Slide>
          <Slide bgColor="primary" notes={`
            <ul>
            <li>begins construction of React's render tree</li>
            <li>if you don't follow, being recorded</li>
            <li>has changed, will again</li>
            <li>...</li>
            <li>React starts by creating the TopLevelWrapper</li>
            </ul>
            `}>
            <Image width="100%" src={images.vdom08}/>
          </Slide>
          <Slide bgColor="primary" notes="TopLevelWrapper is just an implementation detail, it is one of the things that is almost definitely going to change soon">
            <Image width="100%" src={images.vdom09}/>
          </Slide>
          <Slide bgColor="primary" notes="React creates an instance for the TopLevelWrapper,">
            <Image width="100%" src={images.vdom10}/>
          </Slide>
          <Slide bgColor="primary" notes="which it has wired up to render to the List element that we passed in.">
            <Image width="100%" src={images.vdom11}/>
          </Slide>
          <Slide bgColor="primary" notes="so it creates an instance for that List element.">
            <Image width="100%" src={images.vdom12}/>
          </Slide>
          <Slide bgColor="primary" notes={`
            <ul>
            <li>sets props and state</li>
            <li>then it wants to create corresponding DOM</li>
            <li>doesn't know how</li>
            <li>if it were an internal component that React defined, it would know</li>
            <li>has to ask</li>
            </ul>
            `}>
            <Image width="100%" src={images.vdom13}/>
          </Slide>
          <Slide bgColor="primary" notes={`
            <ul>
            <li>List responds with the elements</li>
            <li>button</li>
            <li>take the this.state.items array and create an Item for each</li>
            <li>wrap all of that with a div element</li>
            </ul>
            `}>
            <Image width="100%" src={images.vdom14}/>
          </Slide>
          <Slide bgColor="primary" notes={`
            <ul>
            <li>React creates those elements</li>
            <li>Doesn't care that it doesn't know what DOM interactions it needs for Item</li>
            <li>...</li>
            <li>it pulls out the div element</li>
            <li>because that's going to be the parent... the one that contains the others</li>
            </ul>
            `}>
            <Image width="100%" src={images.vdom19}/>
          </Slide>
          <Slide bgColor="primary" notes={`
            <ul>
            <li>and creates an instance for it</li>
            </ul>
            `}>
            <Image width="100%" src={images.vdom21}/>
          </Slide>
          <Slide bgColor="primary" notes={`
            <ul>
            <li>it knows what DOM it needs to create for a div</li>
            </ul>
            `}>
            <Image width="100%" src={images.vdom22}/>
          </Slide>
          <Slide bgColor="primary" notes={`
            <ul>
            <li>crosses over to DOM and creates div</li>
            <li>Note! it didn't make div a child</li>
            <li>would have caused reflow</li>
            <li>....</li>
            <li>so now it needs to create instances for all those children</li>
            <li>complex to simple structure</li>
            </ul>
            `}>
            <Image width="100%" src={images.vdom23}/>
          </Slide>
          <Slide bgColor="primary" notes={`
            <ul>
            <li>element starts with this</li>
            <li>theres an array with a nested array</li>
            <li>React flattens this structure.</li>
            </ul>
            `}>
            <Image width="100%" src={images.flatten01}/>
          </Slide>
          <Slide bgColor="primary" notes={`
            <ul>
            <li>creates an object</li>
            <li>And it builds up these property names from the original structure</li>
            <li>So button is .0 because it's the zero-ith item</li>
            </ul>
            `}>
            <Image width="100%" src={images.flatten02}/>
          </Slide>
          <Slide bgColor="primary" notes={`
            <ul>
            <li>the items have more complex names that reflect their nested structure</li>
            <li>so the first item is .1.0, the next is .1.1, and so on</li>
            </ul>
            `}>
            <Image width="100%" src={images.flatten03}/>
          </Slide>
          <Slide bgColor="primary" notes={`
            <ul>
            <li>React takes this flattened list</li>
            <li>creates the instances</li>
            </ul>
            `}>
            <Image width="100%" src={images.vdom23}/>
          </Slide>
          <Slide bgColor="primary" notes="Now time to make DOM elements">
            <Image width="100%" src={images.vdom24}/>
          </Slide>
          <Slide bgColor="primary" notes="React knows how to create the button DOM node, so it does">
            <Image width="100%" src={images.vdom25}/>
          </Slide>
          <Slide bgColor="primary" notes="It doesn't know what DOM to create for Item, so it asks">
            <Image width="100%" src={images.vdom26}/>
          </Slide>
          <Slide bgColor="primary" notes={`
            <ul>
            <li>Item says:</li>
            <li>create a div element</li>
            <li>use the prop that was passed in as text content</li>
            </ul>
            `}>
            <Image width="100%" src={images.vdom27}/>
          </Slide>
          <Slide bgColor="primary" notes="React creates the div element">
            <Image width="100%" src={images.vdom28}/>
          </Slide>
          <Slide bgColor="primary" notes="and the instance for it">
            <Image width="100%" src={images.vdom29}/>
          </Slide>
          <Slide bgColor="primary" notes="and the DOM node too">
            <Image width="100%" src={images.vdom30}/>
          </Slide>
         <Slide bgColor="primary" notes="and it does this two more times to create the full set of DOM nodes">
            <Image width="100%" src={images.vdom31}/>
          </Slide>
         <Slide bgColor="primary" notes="then it goes over to the DOM and wires the children up to the parent.">
            <Image width="100%" src={images.vdom32}/>
          </Slide>
          <Slide bgColor="primary" notes="And then it hooks up the wrapper div to the container div.">
            <Image width="100%" src={images.vdom33}/>
          </Slide>
          <Slide bgColor="primary" notes={`
            <ul>
            <li>this is when you get that reflow</li>
            <li>but you notice that it waited til the end to trigger that reflow.</li>
            <li>That way the main thread can handle the changes together</li>
            <li></li>
            </ul>
            `}>
            <Image width="100%" src={images.vdom34}/>
          </Slide>
          <Slide bgColor="primary" notes={`
            <ul>
            <li>so we get our UI</li>
            <li>and that's initial render</li>
            <li>The UI is ready for the user</li>
            <li>now, let's see how the virtual DOM handles a user interaction</li>
            </ul>
            `}>
            <Image width="100%" src={images.vdom35}/>
          </Slide>




          <Slide bgColor="primary" notes="The user clicks the button.">
            <Image width="100%" src={images.ui01}/>
          </Slide>
          <Slide bgColor="primary" notes="What happens here?">
            <Image width="100%" src={images.ui02}/>
          </Slide>
          <Slide bgColor="primary" notes="React figures out the onClick handler for the click. ">
            <Image width="100%" src={images.vdom35}/>
          </Slide>
          <Slide bgColor="primary" notes={`
            <ul>
            <li>uses event delegation for this</li>
            <li>I'm not going to explain event delegation, but you can find an explanation in the docs</li>
            <li>so it calls the handler</li>
            </ul>
            `}>
            <Image width="100%" src={images.ss01}/>
          </Slide>
          <Slide notes={`
            <ul>
            <li>the handler would be code like this</li>
            <li>you get the list of items from the state</li>
            <li>perform operations on the items</li>
            <li>then call setState() with the items</li>
            <li>and if you think you see a possible bug, we'll get to that later</li>
            <li> . . . .</li>
            <li>handler would have been defined on the list instance which created the button element</li>
            <li>bound to the list instance</li>
            <li>so when it calls this.setState()...</li>
            </ul>
            `}>
            <pre style={{textAlign: "left"}}>{`
            handleClick = () => {
              let nextItems = this.state.items;

              // Calculate new values

              this.setState({
                items: nextItems
              })
            }
            `}</pre>
          </Slide>
          <Slide bgColor="primary" notes={`
            <ul>
            <li>it calls setState on the List instance</li>
            </ul>
            `}>
            <Image width="100%" src={images.ss01}/>
          </Slide>
          <Slide bgColor="primary" notes={`
            <ul>
            <li>so what happens when setState is called?</li>
            </ul>
            `}>
            <Image width="100%" src={images.ss02}/>
          </Slide>
          <Slide bgColor="primary" notes={`
            <ul>
            <li>doesn't immediately handle the state change</li>
            <li>it takes the partial state that was passed in</li>
            <li>adds it to a list for this instance of state that needs to be changed</li>
            </ul>
            `}>
            <Image width="100%" src={images.flush01}/>
          </Slide>
          <Slide bgColor="primary" notes={`
            <ul>
            <li>then it takes this instance</li>
            <li>and adds it to an array called dirty components array</li>
            <li>it's just going to let that array wait there for a while</li>
            <li>...</li>
            <li>it's going to see if this click might have had other affects</li>
            <li>if it might have caused other changes</li>
            <li>If the click has caused other changes, those will also be queued up</li>
            <li>...</li>
            <li>Then once it's checked and queued up all changes...</li>
            </ul>
            `}>
            <Image width="100%" src={images.flush02}/>
          </Slide>
          <Slide bgColor="primary" notes={`
            <ul>
            <li>React comes back to queue and flushes it</li>
            <li>so we start processing the changes in the queue</li>
            </ul>
            `}>
            <Image width="100%" src={images.flush03}/>
          </Slide>
          <Slide bgColor="primary" notes="">
            <Image width="100%" src={images.flush04}/>
          </Slide>
          <Slide bgColor="primary" notes="We only have one instance in the queue, so that is the only one instance process.">
            <Image width="100%" src={images.flush05}/>
          </Slide>



          <Slide bgColor="primary" notes="We start with the instance that had setState() called and work down from there.">
            <Image width="100%" src={images.ss02}/>
          </Slide>
          <Slide bgColor="primary" notes={`
            <ul>
            <li>going to grey out everything</li>
            <li>all the work we did in the initial render</li>
            <li>just to make it clearer</li>
            <li>React is going to hold on to all of those and use them for comparisons</li>
            </ul>
            `}>
            <Image width="100%" src={images.ss03}/>
          </Slide>
          <Slide bgColor="primary" notes={`
            <ul>
            <li>React calculates the next state and props</li>
            <li>sets them on the instance</li>
            </ul>
            `}>
            <Image width="100%" src={images.ss04}/>
          </Slide>
          <Slide bgColor="primary" notes={`
            <ul>
            <li>Asks the List instance what it should render to</li>
            <li>this is with the new state and props</li>
            <li>creates the elements</li>
            </ul>
            `}>
            <Image width="100%" src={images.ss06}/>
          </Slide>
          <Slide bgColor="primary" notes={`
            <ul>
            <li>updates the children instances</li>
            <li>compares the previous instances to the new ones</li>
            <li>and figures out whether it needs to make DOM changes</li>
            <li>...</li>
            <li>the button item didn't change, so it doesn't do anything to the DOM</li>
            </ul>
            `}>
            <Image width="100%" src={images.ss07}/>
          </Slide>
          <Slide bgColor="primary" notes={`
            <ul>
            <li>It gets to the first item</li>
            <li>Needs to ask again what it renders to</li>
            </ul>
            `}>
            <Image width="100%" src={images.ss08}/>
          </Slide>
          <Slide bgColor="primary" notes={`
            <ul>
            <li>updates the div instance for Item #1</li>
            <li>Since that didn't change, it figures it can save a little work. It doesn't do anything to the DOM</li>
            </ul>
            `}>
            <Image width="100%" src={images.ss09}/>
          </Slide>
          <Slide bgColor="primary" notes="Now we get to the second item.">
            <Image width="100%" src={images.ss10}/>
          </Slide>
          <Slide bgColor="primary" notes={`
            <ul>
            <li>React updates the instance and realizes they are different</li>
            </ul>
            `}>
            <Image width="100%" src={images.ss11}/>
          </Slide>
          <Slide bgColor="primary" notes={`
            <ul>
            <li>so it goes to the DOM and makes that change</li>
            <li>Then it goes through that process again for the third.</li>
            </ul>
            `}>
            <Image width="100%" src={images.ss12}/>
          </Slide>
          <Slide bgColor="primary" notes="">
            <Image width="100%" src={images.ss13}/>
          </Slide>
          <Slide bgColor="primary" notes="Because these happened in quick succession, they probably were handled in the same reflow">
            <Image width="100%" src={images.ss14}/>
          </Slide>
          <Slide bgColor="primary" notes="So that's how React makes things faster. It figures out the smallest number of changes that it needs to make to the DOM and batches them all together so the browser can do a smaller number of reflows. But there's still a good amount of work happening here. how can we reduce this?">
            <Image width="100%" src={images.ss15}/>
          </Slide>




          <Slide bgColor="primary" notes={`
            <ul>
            <li>This brings us to the third part of the talk...</li>
            <li>about what techniques you can use to make React even faster</li>
            <li>And the first technique is probably one that you already know...</li>
            </ul>
            `}>
            <ol style={summaryStyle}>
            <li>The basics of rendering in the browser</li>
            <li>Minimizing and batching DOM changes with the virtual DOM</li>
            <li>What you can do to make it faster</li>
            </ol>
          </Slide>
          <Slide bgColor="primary" notes="because React tells you. Whenever you're creating an array of children using map, it's going to tell you that you should be using keys. So I want to show you why this helps.">
            <Image width="100%" src={images.keyWarning01}/>
          </Slide>
          <Slide bgColor="primary" notes="Let's change up our example to one that will really highlight this. This time we're going to have a sortable List.">
            <Image width="100%" src={images.ui04}/>
          </Slide>
          <Slide bgColor="primary" notes="When you click the button, it's going to reverse order">
            <Image width="100%" src={images.ui05}/>
          </Slide>
          <Slide bgColor="primary" notes="">
            <Image width="100%" src={images.ui06}/>
          </Slide>
          <Slide bgColor="primary" notes={`
            <ul>
            <li>So we're in the setState process</li>
            <li>And this is the part where it gets interesting, where React is dealing with the children</li>
            <li>So if you remember, where it was flattening them</li>
            </ul>
            `}>
            <Image width="100%" src={images.ss06}/>
          </Slide>
          <Slide bgColor="primary" notes={`
            <ul>
            <li>Turning that nested array into a flat object<li>
            <li>and giving names to each of the children<li>
            </ul>
            `}>
            <Image width="100%" src={images.flatten03}/>
          </Slide>
          <Slide bgColor="primary" notes={`
            <ul>
            <li>From that it updates the instances of the children</li>
            </ul>
            `}>
            <Image width="100%" src={images.ss06}/>
          </Slide>
          <Slide bgColor="primary" notes={`
            <ul>
            <li>And then compares the old instances and the new instances to see if changes need to be made to the DOM</li>
            </ul>
            `}>
            <Image width="100%" src={images.ss07}/>
          </Slide>
          <Slide bgColor="primary" notes="Let's take a closer look at how it does this comparison.">
            <Image width="100%" src={images.keyComparison03}/>
          </Slide>
          <Slide bgColor="primary" notes="It's going to compare these items based on the name. But the name is just the index of the array. And we've reversed the order. That means its comparing apples to oranges... apple was at position 0 before and now orange is.">
            <Image width="100%" src={images.keyComparison04}/>
          </Slide>
          <Slide bgColor="primary" notes="So when it compares these two lists, it thinks it needs to update the values of all of the items except the middle one, because they all look different than they used to.">
            <Image width="100%" src={images.keys02}/>
          </Slide>
          <Slide bgColor="primary" notes="Now let's say we had given React meaningful keys...">
            <Image width="100%" src={images.keyComparison04}/>
          </Slide>
          <Slide bgColor="primary" notes="say, the name of the fruit. The key would be used in the name.">
            <Image width="100%" src={images.keyComparison05}/>
          </Slide>
          <Slide bgColor="primary" notes={`
            <ul>
            <li>Then React can tell which of the previous instance corresponds to each next instance</li>
            <li>and it can see that nothing has changed but the order</li>
            </ul>
            `}>
            <Image width="100%" src={images.keyComparison06}/>
          </Slide>
          <Slide bgColor="primary" notes={`
            <ul>
            <li>So it would know that it could just reorder the DOM elements.</li>
            <li>In this case it's not a huge difference</li>
            <li>But just imagine if each of these items in the list was a complex DOM structure with lots of nodes.</li>
            <li>That could be a real time savings.</li>
            <li>But it's only really a time savings if your list is going to be reordered... for example, if you are reversing the order or shifting items off of the top.</li>
            <li>If you aren't changing the order, then there's no performance impact.</li>
            <li>This is one of the reasons that it's important to understand the why behind the recommendation... because recommendations don't always have the same impact across different use cases.</li>
            </ul>
            `}>
            <Image width="100%" src={images.keys03}/>
          </Slide>


          <Slide bgColor="primary" notes="Let's look at a use case where keys wouldn't have as much of an impact, but where another trick would. It's a list where new items are being fetched from a server and added to the end of the list.">
            <Image width="100%" src={images.ui07}/>
          </Slide>
          <Slide bgColor="primary" notes="And lets say the user pushes the button....">
            <Image width="100%" src={images.ui08}/>
          </Slide>
          <Slide bgColor="primary" notes="but there are no new messages.">
            <Image width="100%" src={images.ui07}/>
          </Slide>
          <Slide bgColor="primary" notes="React is going to go through the process of building out the render tree—creating the elements and updating the instances—even though nothing needs to change in the DOM. This is called wasted time. You can see it in React perf tools. So how can you avoid wasting time like this? I'm sure you've heard of one way...">
            <Image width="100%" src={images.scu01}/>
          </Slide>
          <Slide bgColor="primary" notes="that's shouldComponentUpdate.">
            <pre style={{textAlign: "left"}}>
{`shouldComponentUpdate(nextProps, nextState) {
  if (this.state.items === nextState.items) {
    return false
  }
  return true
}`}
              </pre>
          </Slide>
          <Slide bgColor="primary" notes="The way this works is when the user click and this.setState is called`">
            <Image width="100%" src={images.scu02}/>
          </Slide>
          <Slide bgColor="primary" notes="before building up the render tree below the list, React will ask the component a question.">
            <Image width="100%" src={images.scu03}/>
          </Slide>
          <Slide bgColor="primary" notes="It will say, if I give you these next props and next state, do you need to update?">
            <Image width="100%" src={images.scu04}/>
          </Slide>
          <Slide bgColor="primary" notes="If the component says no, then React doesn't call render and doesn't do anything else to that component or its children.">
            <Image width="100%" src={images.scu05}/>
          </Slide>
          <Slide bgColor="primary" notes="This is great, because we can skip computing the list and everything under it... ">
            <Image width="100%" src={images.scu03}/>
          </Slide>
          <Slide bgColor="primary" notes="so we save a good amount of work">
            <Image width="100%" src={images.scu06}/>
          </Slide>
          <Slide bgColor="primary" notes="If you were looking closely at that shouldComponentUpdate, though, you might have noticed a potential bug. And this ties into that other potential bug that I mentioned earlier, when we were looking at the click handler. It depends on how you're updating the state.">
            <pre style={{textAlign: "left"}}>
{`shouldComponentUpdate(nextProps, nextState) {
  if (this.state.items === nextState.items) {
    return false
  }
  return true
}`}
              </pre>
          </Slide>
          <Slide bgColor="primary" notes={`
            <ul>
            <li>So let's say you're updating it this way</li>
            <li>you set a new variable, nextItems, to this.state.items</li>
            <li>you push the item on the array</li>
            <li>and then call setState with the new variable</li>
            <li>...</li>
            <li>what would happen here is that you'd never see new items</li>
            <li>Your shouldComponentUpdate would always return false. Why is this?</li>
            </ul>
            `}>
            <pre style={{textAlign: "left"}}>{`
            handleClick = () => {
              let nextItems = this.state.items;

              nextItems.push(msg)

              this.setState({
                items: nextItems
              })
            }
            `}</pre>
          </Slide>
          <Slide bgColor="primary" notes="It's because even though you have two names for this thing">
            <Image width="100%" src={images.immutable01}/>
          </Slide>
          <Slide bgColor="primary" notes="both names still point to the same thing. So they are equal, because they are just different names for the same exact thing. When you do an equals check on object variables in JavaScript, it just checks that the two variables point to the same object. So even if you make a change...">
            <Image width="100%" src={images.immutable02}/>
          </Slide>
          <Slide bgColor="primary" notes="the should component update is going to think the old state and the new state is the same. So it's not going to see this change.">
            <Image width="100%" src={images.immutable03}/>
          </Slide>
          <Slide bgColor="primary" notes={`
            <ul>
            <li>You could make it so that nextState is its own object.</li>
            <li>Then your shouldComponentUpdate would see that the previous items variable points to a different object from the next.</li>
            <li>the problem is, it would always think that something had changed</li>
            <li>even if it hadn't.</li>
            <li>It would never return false, so the shouldComponentUpdate wouldn't save us any time</li>
            <li>...</li>
            <li>we coudl do a deepEquality check, where we compare the actual values</li>
            <li>but depending on how heavy that is, it might actually take us more time</li>
            </ul>
            `}>
            <Image width="100%" src={images.immutable04}/>
          </Slide>
          <Slide bgColor="primary" notes="It would be nice to have that simple, quick equals check...">
            <Image width="100%" src={images.immutableComp01}/>
          </Slide>
          <Slide bgColor="primary" notes="but still catch changes to the data... and this is what immutability gives you.">
            <Image width="100%" src={images.immutableComp02}/>
          </Slide>
          <Slide bgColor="primary" notes="With immutable data, if two variables are pointing to the same object, you know that the data hasn't changed.">
            <Image width="100%" src={images.immutable02}/>
          </Slide>
          <Slide bgColor="primary" notes="If it does need to change, you create a new object. So if you're using immutable data, then you can do these quick equality checks, which are fast, in shouldComponentUpdate">
            <Image width="100%" src={images.immutable06}/>
          </Slide>




          <Slide bgColor="primary" notes="with shouldComponentUpdate, you can short circuit work lower in the tree. You can short circuit the work for anything below where this.setState is called. But what if the change heppens in one of the children? do you still need to compute the whole thing? Let's walk through that case">
            <Image width="100%" src={images.imageName}/>
          </Slide>
          <Slide bgColor="primary" notes="We have a todo list">
            <Image width="100%" src={images.ui10}/>
          </Slide>
          <Slide bgColor="primary" notes="and we check off one of the items">
            <Image width="100%" src={images.ui11}/>
          </Slide>
          <Slide bgColor="primary" notes="so the item changes, but the other items don't, and the list itself doesn't really. How can we avoid doing all the work for the whole list and all of the items that aren't changing? When you're just using vanilla react with local component state, it's pretty easy. ">
            <Image width="100%" src={images.ui12}/>
          </Slide>
          <Slide bgColor="primary" notes="Just restructure your state so you can call setState lower in the tree. But when you're using something like Redux, this can be harder to do.">
            <Image width="100%" src={images.lowerInTree01}/>
          </Slide>
          <Slide bgColor="primary" notes="That's because you're firing off actions, and then the state is coming in through connect(), which is usually at the top of the tree.  However, there is a way to do it.">
            <Image width="100%" src={images.lowerInTree02}/>
          </Slide>
          <Slide bgColor="primary" notes="and that's to use connect() at a lower level in the tree. You'll probably need to rethink how you're handling your data for this to work">
            <Image width="100%" src={images.lowerInTree03}/>
          </Slide>
          <Slide bgColor="primary" notes="Because you'd have a component structure like this">
            <Image width="100%" src={images.connect01}/>
          </Slide>
          <Slide bgColor="primary" notes="And most people would pass the array of items">
            <Image width="100%" src={images.connect02}/>
          </Slide>
          <Slide bgColor="primary" notes="The list would pass those down to each item element.">
            <Image width="100%" src={images.connect03}/>
          </Slide>
          <Slide bgColor="primary" notes="">
            <Image width="100%" src={images.connect04}/>
          </Slide>
          <Slide bgColor="primary" notes="So then when you need to change an item,">
            <Image width="100%" src={images.connect05}/>
          </Slide>
          <Slide bgColor="primary" notes="since you're changing things immutably, this array has to be handled as a new array. So that's triggering an update at the List level. But we can reduce the work here.">
            <Image width="100%" src={images.connect06}/>
          </Slide>
          <Slide bgColor="primary" notes="If we just pass in IDs">
            <Image width="100%" src={images.connect07}/>
          </Slide>
          <Slide bgColor="primary" notes="and pass those IDs down">
            <Image width="100%" src={images.connect08}/>
          </Slide>
          <Slide bgColor="primary" notes="and then have somthing in the mapStateToProps that converts that id into the item">
            <Image width="100%" src={images.connect09}/>
          </Slide>
          <Slide bgColor="primary" notes="">
            <Image width="100%" src={images.connect10}/>
          </Slide>
          <Slide bgColor="primary" notes="Then, when that item changes">
            <Image width="100%" src={images.connect11}/>
          </Slide>
          <Slide bgColor="primary" notes="We only see a new object in the affected item. We only trigger rerender for that item">
            <Image width="100%" src={images.connect12}/>
          </Slide>
          <Slide bgColor="primary" notes={`
            <ul>
            <li>This is how you can save on work at higher levels, and sibling levels, of the tree</li>
            `}>
            <Image width="100%" src={images.imageName}/>
          </Slide>
          <Slide bgColor="primary" notes={`
            <ul>
            <li>wish I had time to cover other performnace tricks</li>
            <li>memoization</li>
            <li>virtualization</li>
            <li>incremental rendering</li>
            <li>how you can use observables, which things like MobX and Relay use to notify components of changes</li>
            <li>but this will have to be it for now.</li>
            </ul>
            `}>
            <Image width="100%" src={images.imageName}/>
          </Slide>





          <Slide bgColor="primary" notes={`
            <ul>
            <li>So here are the techniques we covered</li>
            <li>using keys to help React match previous instances to new ones</li>
            <li>using shouldComponentUpdate to short circuit work lower in the tree</li>
            <li>and how immutability factors into that</li>
            <li>and structuring your data handling so that you can reduce work higher in the tree</li>
            </ul>
            `}>
            <ul style={summaryStyle}>
              <li>keys</li>
              <li>shouldComponentUpdate</li>
              <li>immutability</li>
              <li>restructuring your state and connection points</li>
            </ul>
          </Slide>
          <Slide bgColor="primary" notes="I hope this has given you a good overview of a few starting points. As you can see, there are lots of tweaks you can make. Some of them are right for certain cases, some for others. Some will actually have negative impacts if used for the wrong use cases. This is why people say to measure, and hopefully this talk has given you a good framework for understanding what you're measuring.">
            <ul style={summaryStyle}>
              <li>keys</li>
              <li>shouldComponentUpdate</li>
              <li>immutability</li>
              <li>restructuring your state and connection points</li>
            </ul>
          </Slide>

          <Slide bgColor="primary" notes="Thank you" bgImage={images.me}>
            <Heading size={2} padding="0 120px 0 0">
              Thanks!
            </Heading>
            <Heading size={3} padding="0 120px 0 0">
              <Link href="https://code-cartoons.com">code-cartoons.com</Link><br />
              <Link href="https://twitter.com/codecartoons">@codecartoons</Link><br />
          </Heading>
          </Slide>
        </Deck>
      </Spectacle>
    );
  }
}
